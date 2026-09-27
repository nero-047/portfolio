---
title: ZRM
description: A personal CRM where the modules are data rather than code — industry-specific templates and workflow automation on top of a metadata-driven core.
order: 3
context: Personal project
status: In progress
stack: [Nx, Nuxt, Hono, Drizzle, Neon, Upstash Redis, Clerk]
---

## Context

I have now worked on two multi-tenant business systems — a CRM and a farm ERP — and both
ran into the same wall from opposite directions.

A CRM that ships one fixed idea of what a "lead" is will be wrong for the second customer
who uses it. An ERP that tries to cover piggery, hatchery and shrimp with one generic
"operation" record ends up describing none of them well. In both cases the pressure is to
either fork the code per customer or bolt on a custom-fields feature and hope.

NavCRM already has metadata-driven fields, and working on them is what started this.
ZRM is me taking that idea much further, on my own time, to find out where it breaks.

## The bet: modules as data

The premise is that a module — its entities, its fields, its relationships — should be a
row in a database rather than a folder of code.

If that holds, adding a new kind of record to the system is a write, not a deploy. An
industry-specific template becomes a seed of that data rather than a branch of the app.
Two businesses in different industries run the same binary and see different products.

That is the pitch. The cost is real and lands in familiar places:

- **Queries get indirect.** You are no longer selecting from a table you wrote by hand;
  you are assembling a query from a definition. Everything that was free — types,
  autocomplete, a migration that tells you when you broke something — you now have to
  build.
- **Validation moves to runtime.** The schema is not known at compile time, so nothing
  the compiler does for you protects a field definition.
- **The escape hatch matters more than the abstraction.** Every system like this
  eventually meets a requirement the metadata cannot express. What happens then decides
  whether it survives.

Finding out whether the trade is worth it is the point of building it.

## Why this stack

Nx because it is a monorepo problem: a metadata-driven system has a schema layer that
both the frontend and the backend must agree on exactly, and a shared library with a
visible dependency graph is a better home for that than a published package I would
have to version against myself.

Nuxt and Hono because the frontend is static-first and the backend wants to be small.
Drizzle over Neon because the schema is the interesting part and I want it in TypeScript
where the metadata layer can reach it. Redis for the things that should not touch
Postgres on every request. Clerk because authentication is a solved problem and solving
it again is not what I am trying to learn.

## Deployment shape

The frontend is on Cloudflare Pages; the backend is on a VPS.

That split is deliberate, and it is the opposite of how I would have done it a year ago.
The frontend is static output with no runtime, so a CDN is exactly the right host for it
and costs nothing. The backend is a long-lived process with a database connection pool
and background work, which is precisely the shape that serverless makes awkward and a
plain server makes boring. Picking the right host per half beats picking one host and
bending both halves to fit it.

## Status

In progress, and I am not going to dress that up. There are no users, no uptime and no
numbers, because it does not have any yet.

It is on this page because the question it is asking — how much of a business system can
be data instead of code, and what that costs you — is the same question sitting
underneath the work I do during the day.
