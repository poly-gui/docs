---
title: What is NanoPack?
description: An introduction to the NanoPack serialization format.
---

NanoPack is a binary serialization format created for Poly.
Messages exchanged between the portable layer and the native layer are serialized with NanoPack.
Because of the large amount of messages exchanged between the two sides,
NanoPack is designed to be easy to pack and parse.

NanoPack is currently being implemented in C++, TypeScript, and Swift.

## Inspirations

NanoPack is heavily inspired by [Protocol Buffer (protobuf)](https://protobuf.dev),
also a binary serialization format.

## Why Not _x_?

Poly requires that the serialization format has the following features:

- lightweight and minimal runtime
- supports polymorphism to describe widget relations (array of widgets which can be texts, buttons, etc.)

Protobuf produces a large binary, so it is out of the question.
[Flatbuffer](https://flatbuffers.dev) looks promising, but its type system is not very expressive.
The closest thing to polymorphism, union vectors, are experimental and only supported by C++.
Both JSON and YAML are inefficient when paired with statically-typed languages such as C++ and Swift.

## Benchmark

I intend to benchmark NanoPack against other popular serialization formats when it is stable and more optimized.
Currently, the primary goal is to build out Poly to a usable stage.

## Glossaries

Below are terminologies that will be used throughout this documentation:

| Glossary | Definition                                                                                                  |
|:---------|:------------------------------------------------------------------------------------------------------------|
| Message  | A piece of structured data that contains _fields_ that store different types of data. Think structs/classes |
| Buffer   | A piece of contagious memory that stores raw bytes. Think bytes/byte array                                  |
| Schema   | A file that describes the shape/structure of a message or an enum.                                          |
