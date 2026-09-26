---
title: NotionLite
description: A small personal build — a minimal Notion-inspired workspace focused on calm interaction and editor-style UI.
order: 3
role: Personal project
context: Personal
status: Personal project
---

## Context

NotionLite is a small independent build: a minimal, Notion-inspired workspace. It exists
because I wanted to understand how block-based editors actually work, and the fastest way
to understand something is to try to build the smallest honest version of it.

## Why an editor

Editors are a good thing to build badly at least once. They look simple and are not.
The interesting parts show up immediately:

- A document is a tree of blocks, not a string, and every interaction is a tree edit.
- Keyboard behaviour is the product. Enter, Backspace at the start of a block, and
  arrow keys across block boundaries are where an editor either feels right or feels
  broken, and none of it is free.
- State has to be authoritative somewhere, and the browser's own editing model will
  fight you for that authority if you let it.

## The thing I was actually after

Calm interaction. Most tools of this kind are loud — they animate, they pop, they
confirm things at you. I wanted to see how much could be removed before the interface
stopped being usable, and where the line actually sits.

The answer, mostly, is that structure does the work that decoration is usually asked to
do. Spacing and alignment tell you what a block is. You do not need a border for that.

## Scope

This is a personal project, not a product. There are no users, no uptime, and no
numbers to report — it is here because what it taught me shows up in the work that
does have users.
