---
title: NAVFarm
description: A multi-tenant farm ERP and operations platform where every tenant is provisioned with its own isolated data.
order: 2
role: Software Engineer
context: Prudence Consulting / Navfarm
year: 2026–present
status: Ongoing
stack: [NestJS, Next.js, Nx, MySQL]
diagram: navfarm-tenancy
---

## Context

NAVFarm is an ERP and operations platform for farm businesses. A single customer is not
a single farm: it is a company, or several companies, running different kinds of
operation — piggery, hatchery, shrimp — each with its own way of recording what happened
today. The platform has to hold all of that under one roof without the roof deciding what
kind of farm you are allowed to be.

The work is a redevelopment of an existing product rather than a greenfield build, which
shapes almost everything below. There is a system already in use, with data in it and
people depending on it.

## The multi-tenant model

The structural decision the whole platform rests on is that a tenant is not a row.

A tenant is provisioned — it gets its own isolated data rather than sharing tables with
every other customer behind a `tenant_id` column. Beneath the tenant sit companies and
operational areas, and beneath those sit the lines of business.

Platform → tenant → companies and operational areas → piggery, hatchery, shrimp.

That hierarchy is load-bearing. Almost every question the product has to answer —
who can see this record, which company does this animal belong to, what does "this
month" mean for a hatchery versus a shrimp pond — is answered by walking it.

## Why isolation is worth the cost

Row-level tenancy is cheaper to build and cheaper to operate. You run one database,
one migration, one connection pool, and you add a `tenant_id` predicate to every query.
It is also one forgotten `WHERE` clause away from showing one customer another
customer's records.

Provisioned isolation moves that risk out of application code and into infrastructure.
The cost is real and lands in three places:

- **Provisioning** becomes a first-class operation. Creating a customer is no longer an
  `INSERT`; it is a process that has to succeed or roll back cleanly.
- **Migrations** fan out. A schema change is not one migration, it is N, and they can
  partially fail.
- **Cross-tenant questions** get harder by construction, which is the point, but it
  means anything platform-wide needs a deliberate answer rather than a `GROUP BY`.

This is the trade-off I spend the most time inside. It is a good trade for a product
whose customers are separate businesses, and it is not free.

## Lines of business under one platform

Piggery, hatchery and shrimp are not three copies of the same module with different
labels. They count different things, on different cycles, with different events worth
recording. The pressure is always toward one of two failure modes: a generic
"operations" abstraction so loose it records nothing useful, or three parallel
implementations that drift apart.

The useful middle is a shared spine — tenancy, companies, operational areas, identity,
reporting surfaces — with the domain-specific parts kept genuinely separate rather than
forced into a shared shape. An Nx monorepo is what makes that practical to work in: the
shared spine is a library, the lines of business are consumers of it, and the boundaries
are visible in the dependency graph instead of living in someone's head.

## Deployment constraints

The platform is deployed on Windows and IIS. That is a constraint inherited from where
the product runs, not a preference, and it is the kind of constraint worth naming
because it changes decisions upstream of it: what the build output has to look like,
how processes are supervised, how a release is actually applied.

Most of what I have learned on this project has come from following a change all the
way to the environment it runs in rather than stopping at "it works locally".

## What I work on

Backend services in NestJS, web interfaces in Next.js, the MySQL schema underneath,
and the deployment path. In practice a task rarely stays in one of those: a change to
how an operational area is scoped shows up in the API, in the query, in the interface
and in what has to be migrated.

## What this page does not show

There are no product screenshots here. NAVFarm is client software and its interface
shows customer data; I would rather publish the structure, which is mine to explain,
than a sanitised screenshot that says less. The diagram above is the honest version
of the thing a screenshot would have gestured at.
