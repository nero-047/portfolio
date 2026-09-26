---
title: NavCRM
description: A multi-tenant CRM platform, maintained and extended across backend APIs, web interfaces and React Native applications.
order: 1
role: Software Engineer
context: Prudence Consulting
status: Ongoing
stack: [Backend APIs, Web, React Native]
diagram: navcrm-surfaces
---

## Context

NavCRM is a multi-tenant CRM platform that was already built, already deployed and
already in use when I started working on it. My work is maintaining and extending it,
which is a different job from building something new and, honestly, the job most
software actually is.

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

Maintaining and extending the platform across backend APIs, web interfaces and the
React Native applications. Not architecting it, not owning it — working inside a system
other people built and continuing to build it with them.

Concretely, that means the same change usually lands in several places at once, and the
useful skill is holding all of them in view rather than fixing the symptom nearest to
the bug report.

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
and no numbers. I am not going to publish an interface I do not own, and I am not going
to invent metrics to fill the gap. What I can describe is the shape of the system and
the reasoning I apply inside it, which is the part that actually transfers.
