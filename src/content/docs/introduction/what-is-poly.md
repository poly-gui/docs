---
title: What is Poly?
description: Introduction to the Poly framework
---

Poly is a cross-platform framework for developing OS-native applications using a single codebase.
Poly adapts to the host operating system using a message-passing architecture to achieve portability, without the need of a custom renderer or WebViews.

## Native-ness

Poly supports the following operating systems and the corresponding GUI toolkit:

- macOS >= 10.15 via [AppKit](https://developer.apple.com/documentation/appkit/)
- Linux via [Gtk](https://www.gtk.org)

Poly will support Windows, Android, and iOS in the future.

## Language Agnostic

Poly is language-agnostic. As long as an implementation is provided for the message protocol for a language, it can be used to build Poly applications.

Currently, official implementations in the following languages are available:

- TypeScript
