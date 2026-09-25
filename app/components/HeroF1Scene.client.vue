<script setup lang="ts">
// Decorative WebGL layer over the SSR poster. Loads Three.js + the GLB only on
// capable desktop clients, after the page is idle and the hero is near the viewport.
// On any failure the canvas is removed and the poster stays.
import type { WebGLRenderer, PerspectiveCamera, Scene, Group, Object3D, Texture, Material, BufferGeometry } from 'three'

const emit = defineEmits<{ ready: []; fail: [] }>()

const MODEL_URL = '/models/f1-75/f1-75-portfolio.55dc5862.glb'
const host = ref<HTMLDivElement>()

let disposed = false
let started = false
let visible = false
let idleDone = false
let io: IntersectionObserver | undefined
let ro: ResizeObserver | undefined
let idleHandle: number | undefined
let idleIsRic = false
let rafId = 0
let cleanupScene: (() => void) | undefined

function eligible(): boolean {
  if (!window.matchMedia('(min-width: 960px)').matches) return false
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
  if (conn?.saveData) return false
  if (conn?.effectiveType && ['slow-2g', '2g'].includes(conn.effectiveType)) return false
  try {
    const c = document.createElement('canvas')
    const gl = c.getContext('webgl2')
    if (!gl) return false
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    return false
  }
  return true
}

function maybeStart() {
  if (started || disposed || !visible || !idleDone) return
  started = true
  init().catch(() => {
    cleanupScene?.()
    emit('fail')
  })
}

async function init() {
  const [THREE, { GLTFLoader }, { RoomEnvironment }] = await Promise.all([
    import('three'),
    import('three/addons/loaders/GLTFLoader.js'),
    import('three/addons/environments/RoomEnvironment.js')
  ])
  if (disposed || !host.value) return
  const el = host.value
  const heroEl = el.closest('.hero') as HTMLElement | null

  const renderer: WebGLRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1
  renderer.shadowMap.enabled = false
  const canvas = renderer.domElement
  canvas.setAttribute('aria-hidden', 'true')
  canvas.style.cssText = 'display:block;width:100%;height:100%'
  el.appendChild(canvas)

  const scene: Scene = new THREE.Scene()
  const pmrem = new THREE.PMREMGenerator(renderer)
  const envTarget = pmrem.fromScene(new RoomEnvironment(), 0.04)
  scene.environment = envTarget.texture
  scene.environmentIntensity = 0.9

  const camera: PerspectiveCamera = new THREE.PerspectiveCamera(28, 16 / 9, 0.1, 100)
  const pivot: Group = new THREE.Group()
  scene.add(pivot)

  let model: Object3D | undefined
  let box = new THREE.Box3()
  const dir = new THREE.Vector3(0.85, 0.42, 0.95).normalize() // three-quarter front, slightly above
  // Fraction of the canvas the projected car fills. The stage box in CSS is the car
  // frame, and the poster is offset to the same fraction, so poster→live cannot jump.
  const CAR_FILL = 0.94
  /** Sub-sampled mesh points (pivot space) — fitting the real silhouette, not the AABB. */
  const points: import('three').Vector3[] = []
  const tmpV = new THREE.Vector3()

  function collectPoints(root: Object3D) {
    root.updateMatrixWorld(true)
    let total = 0
    root.traverse((o) => {
      const g = (o as Object3D & { geometry?: BufferGeometry }).geometry
      if (g?.attributes?.position) total += g.attributes.position.count
    })
    // ~4k samples is plenty to bound a silhouette and keeps fit() well under a frame.
    const stride = Math.max(1, Math.floor(total / 4000))
    let seen = 0
    root.traverse((o) => {
      const g = (o as Object3D & { geometry?: BufferGeometry }).geometry
      const pos = g?.attributes?.position
      if (!pos) return
      for (let i = 0; i < pos.count; i++, seen++) {
        if (seen % stride) continue
        points.push(o.localToWorld(new THREE.Vector3().fromBufferAttribute(pos, i)))
      }
    })
  }

  function fit() {
    const w = el.clientWidth, h = el.clientHeight
    if (!w || !h || !model || !points.length) return
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.clearViewOffset()

    let dist = box.getSize(new THREE.Vector3()).length() * 1.2
    let cx = 0, cy = 0
    for (let i = 0; i < 8; i++) {
      camera.position.copy(dir).multiplyScalar(dist)
      camera.lookAt(0, 0, 0)
      camera.updateMatrixWorld(true)
      camera.updateProjectionMatrix()
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
      for (const p of points) {
        const v = tmpV.copy(p).project(camera)
        if (v.x < minX) minX = v.x
        if (v.x > maxX) maxX = v.x
        if (v.y < minY) minY = v.y
        if (v.y > maxY) maxY = v.y
      }
      cx = (minX + maxX) / 2
      cy = (minY + maxY) / 2
      // NDC half-extents: 1 === half the canvas on that axis.
      const k = Math.max((maxX - minX) / 2, (maxY - minY) / 2) / CAR_FILL
      if (Math.abs(k - 1) < 0.002) break
      dist *= k
    }
    camera.position.copy(dir).multiplyScalar(dist)
    camera.lookAt(0, 0, 0)
    camera.updateMatrixWorld(true)
    camera.updateProjectionMatrix()
    // Shift the render window so the silhouette's centre sits at the canvas centre.
    camera.setViewOffset(w, h, cx * w / 2, -cy * h / 2, w, h)
    renderer.render(scene, camera)
  }

  const loader = new GLTFLoader() // GLB uses KHR_mesh_quantization + EXT_texture_webp; no Draco/Meshopt
  const gltf = await loader.loadAsync(MODEL_URL)
  model = gltf.scene

  const disposeAll = () => {
    cancelAnimationFrame(rafId)
    ro?.disconnect()
    window.removeEventListener('pointermove', onPointer)
    document.removeEventListener('visibilitychange', onVis)
    canvas.removeEventListener('webglcontextlost', onLost)
    const seen = new Set<unknown>()
    scene.traverse((o) => {
      const m = o as Object3D & { geometry?: BufferGeometry; material?: Material | Material[] }
      m.geometry?.dispose()
      for (const mat of ([] as Material[]).concat(m.material ?? [])) {
        for (const v of Object.values(mat)) {
          if (v && (v as Texture).isTexture && !seen.has(v)) { seen.add(v); (v as Texture).dispose() }
        }
        mat.dispose()
      }
    })
    envTarget.dispose()
    pmrem.dispose()
    renderer.dispose()
    canvas.remove()
    cleanupScene = undefined
  }
  cleanupScene = disposeAll
  if (disposed) return disposeAll()

  box = new THREE.Box3().setFromObject(model)
  model.position.sub(box.getCenter(new THREE.Vector3()))
  pivot.add(model)
  box = new THREE.Box3().setFromObject(pivot)
  collectPoints(pivot)
  const light = new THREE.DirectionalLight(0xffffff, 0.8)
  light.position.set(-3, 5, 4)
  scene.add(light)

  // Pointer parallax + slow drift; ~30fps, only while visible and the tab is shown.
  const target = { x: 0, y: 0 }
  const cur = { x: 0, y: 0 }
  function onPointer(e: PointerEvent) {
    target.x = (e.clientX / window.innerWidth - 0.5) * 2
    target.y = (e.clientY / window.innerHeight - 0.5) * 2
  }
  function onLost(e: Event) { e.preventDefault(); disposeAll(); emit('fail') }
  let last = 0
  function frame(t: number) {
    rafId = requestAnimationFrame(frame)
    if (t - last < 33) return
    last = t
    cur.x += (target.x - cur.x) * 0.06
    cur.y += (target.y - cur.y) * 0.06
    const sp = heroEl ? Math.min(1, Math.max(0, window.scrollY / Math.max(1, heroEl.offsetHeight))) : 0
    // Deliberately small: a slight pointer response, a near-static idle drift, a restrained
    // scroll relationship. This is a signature visual, not a configurator — never a spin.
    pivot.rotation.y = cur.x * 0.06 + Math.sin(t / 4200) * 0.015 + sp * 0.06
    pivot.rotation.x = cur.y * 0.015
    renderer.render(scene, camera)
  }
  const running = () => visible && !document.hidden && !disposed
  function sync() {
    if (running() && !rafId) rafId = requestAnimationFrame(frame)
    else if (!running() && rafId) { cancelAnimationFrame(rafId); rafId = 0 }
  }
  function onVis() { sync() }
  syncLoop = sync

  fit()
  renderer.render(scene, camera)
  ro = new ResizeObserver(() => fit())
  ro.observe(el)
  window.addEventListener('pointermove', onPointer, { passive: true })
  document.addEventListener('visibilitychange', onVis)
  canvas.addEventListener('webglcontextlost', onLost)
  sync()
  requestAnimationFrame(() => { if (!disposed) emit('ready') }) // first frame has been presented
}
let syncLoop: (() => void) | undefined

onMounted(async () => {
  await nextTick()
  if (disposed || !host.value || !eligible()) return
  io = new IntersectionObserver((entries) => {
    visible = entries.some((e) => e.isIntersecting)
    maybeStart()
    syncLoop?.()
  }, { rootMargin: '200px' })
  io.observe(host.value)

  const onIdle = () => { idleDone = true; maybeStart() }
  const schedule = () => {
    if (typeof window.requestIdleCallback === 'function') { idleIsRic = true; idleHandle = window.requestIdleCallback(onIdle, { timeout: 3000 }) }
    else idleHandle = window.setTimeout(onIdle, 1500)
  }
  if (document.readyState === 'complete') schedule()
  else window.addEventListener('load', schedule, { once: true })
})

onBeforeUnmount(() => {
  disposed = true
  io?.disconnect()
  if (idleHandle !== undefined) idleIsRic ? window.cancelIdleCallback(idleHandle) : clearTimeout(idleHandle)
  cancelAnimationFrame(rafId)
  cleanupScene?.()
})
</script>

<template>
  <div ref="host" aria-hidden="true" />
</template>
