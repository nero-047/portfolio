---
title: NavCRM
description: A multi-tenant CRM platform — completed, and now maintained across backend APIs, web interfaces and a React Native application.
order: 1
role: Software Engineer
context: Prudence Technology
year: 2026–present
status: Ongoing
stack: [Backend APIs, Web, React Native]
diagram: navcrm-surfaces
---

## Context

NavCRM is a multi-tenant CRM platform. It was already part-built when I picked it up —
during what was nominally a mobile internship — and the work grew from there: I took it
to completion across web and mobile, and I maintain it now.

Finishing someone else's system is a different job from starting your own, and it is
the job most software actually is.

## The problem with inherited systems

The hard part of an existing system is not writing the next feature. It is knowing what
the next feature will break.

A CRM spans three surfaces — a React Native application, a web interface, and the HTTP
API both of them talk to — and a change rarely stays on the surface where it starts.
Adding a field is an API change, a validation change, a web form change, a mobile form
change, a migration, and a question about every client running an older build. None of
that is visible from the ticket.

So most of the work is reading before writing: following a value from the screen it is
typed on, through the request, into the service that handles it, into the shape it is
stored in, and back out to every other place that reads it. The diagram above is that
path, drawn once.

## My contribution

I built out the core multi-tenant web and backend capabilities and the APIs behind the
React Native application — well past the original scope of a mobile internship — carried
the system to completion, and now maintain it across both surfaces.

That covers the working parts of a CRM: leads, opportunities, tasks, meetings, notes,
contacts, clients and complaint tickets, plus metadata-driven fields, SSO, two-factor
authentication, JWT auth and a platform admin portal.

I did not start it, and I am not going to claim I did. What I can say is that it is
finished, it runs, and when something is wrong with it the person who fixes it is me.

Practically, that means a change usually lands in several places at once, and the useful
skill is holding all of them in view rather than fixing the symptom nearest to the bug
report.

## What working across three surfaces teaches you

Two things, repeatedly.

The first is that the API is the real product. The web interface can be reloaded; a
mobile build cannot. Anything the API does loosely — an optional field that is actually
required, an error shape that varies by endpoint — becomes a permanent tax paid by every
client, and the mobile client pays it longest.

The second is that "it works" is not a property of a feature, it is a property of a
feature on a specific client version talking to a specific API version. Existing systems
are mostly a negotiation with their own history.

## Constraints

This is client software with real customer data in it, so this page has no screenshots
and no figures about how much of it there is. Those exist, and I will share them in a
conversation; publishing a client system's internals on a public page is a different
thing. What belongs here is the shape of the system and the reasoning I apply inside it,
which is the part that actually transfers.
