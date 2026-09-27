---
title: NotionLite
description: A Notion-style collaborative workspace — nested pages, block-based editing, sharing and comments — built to understand how editors work.
order: 4
context: Personal project
stack: [Next.js, Block editor, Auth]
---

## Context

NotionLite is an independent build: a Notion-style collaborative workspace. It exists
because I wanted to understand how block-based editors actually work, and the only
reliable way to understand something like that is to build one.

What it ended up covering: nested pages, block-based editing with drag-and-drop,
authentication, public and private sharing, collaboration, per-block comments, and a
small amount of AI writing assistance.

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

## Sharing is where it got interesting

Nested pages plus public and private sharing is a permission problem wearing a
document's clothes. A page inherits from its parent until someone overrides it, which
means every read has to answer "who is asking, and what did the nearest ancestor with
an opinion say?" Comments make it worse: a comment belongs to a block, the block belongs
to a page, and the page's visibility can change after the comment exists.

None of that is visible in the interface, which is the point. It is also most of the work.

## Scope

This is a personal project, not a product. There are no usage numbers to report and I
am not going to invent any — it is here because the editor, the permission model and
the collaboration work all show up in the systems that do have users.
