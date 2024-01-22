---
title: Code Generation
description: A guide in how to run code generation in NanoPack
---

In order for the messages to be usable in code,
the schemas must be first compiled to the desired programming languages via `nanoc` (pronounced _**na**-nock_),
a compiler provided by NanoPack.

## Installation

Currently, `nanoc` is not available as a pre-compiled binary, so it must be built and installed manually.

### Pre-requisites

To build, install, and use `nanoc`, the following requirements must be met:

- Go 1.20 or higher ([install link](https://go.dev/dl/))
- Code formatter for the corresponding programming language installed because `nanoc` will use it to format the
  generated code
    - C++: `clang-format`: available as part of Clang.
    - Swift: `swift-format`: [available here](https://github.com/apple/swift-format)
    - TypeScript: `prettier` will be used via `npx`.

:::note
Make sure the installed binaries are added to PATH so that `nanoc` can find it.
:::

### Steps

Clone the `nanoc` repository [here](https://github.com/poly-gui/nanoc):

```bash title="Cloning nanoc..."
git clone https://github.com/poly-gui/nanoc.git
```

Change into the `nanoc` directory:

```bash
cd nanoc
```

Then run the installation command:

```bash
go install nanoc/cmd/nanoc
```

This tells Go to compile the project, then move the output binary to a directory where all the Go binaries are installed
in.

The `nanoc` command should now be available. If not, make sure the directory to where Go installs binaries is in PATH.
To add it to PATH:

```bash frame="none"
export PATH="$PATH:$(go env GOPATH)/bin"
```

:::note
If `GOBIN` is set manually, make sure `GOBIN` is in PATH also.

For non-Go developers, this is probably not applicable.
:::

## Usage

This is an overview of the `nanoc` command:

```
nanoc --language=[ts|swift|c++] [--factory-out=path] [...input-files]
```

|   Argument    |                                                Description                                                |
|:-------------:|:---------------------------------------------------------------------------------------------------------:|
|  `language`   |                    (Required) The programming language the generated code should be in                    |
| `factory-out` |               (Optional) The directory where the message factory code file should be put in               |
| `input-files` | (Required) A space-delimited list of relative/absolute paths to the schema files that should be processed |

:::note[What is the message factory?]
The message factory file contains a factory function that creates the correct type of message
given a NanoPack-formatted buffer and the type ID of the message.
Its usage is described in detail in the language guides
:::

### Output

`nanoc` will put the generated files next to each schema file.
For example, `nanoc` will put the TypeScript code for `src/MySchema.yml` in `src/my-schema.ts`

Every `nanoc` generated file will have an extension `.np` right before the real file
extension: `.np.ts`, `.np.swift`, `.np.cxx`, etc.

### Example

Consider the following files in a hypothetical `src` directory,
and suppose the current working directory is where the `src` directory resides.

- `MessageA.yml`
- `MessageB.yml`

To compile the two schemas to TypeScript:

```bash
nanoc --language=ts ./src/MessageA.yml ./src/MessageB.yml
```

`nanoc` will produce two files, `message-a.np.ts` and `message-b.np.ts`.
Now, the `src` directory will contain the following files:

- `MessageA.yml`
- `message-a.np.ts`
- `MessageB.yml`
- `message-b.np.ts`

## Casing

`nanoc` will convert the casing of field names and file names to what the convention is
for the output language. For example, if the field names in the schema files are in `snake_case`,
`nanoc` will convert them to `camelCase` when compiling to Swift or TypeScript.
In general, `nanoc` follows the following table when it comes to casing:

| Name\Language | TypeScript   | Swift        | C++          |
|:--------------|:-------------|:-------------|:-------------|
| Field names   | `camelCase`  | `camelCase`  | `snake_case` |
| File names    | `kebab-case` | `PascalCase` | `snake_case` |

## Support Library

The generated code assumes that the support library for that language is installed and reachable from the source code.
Below is the list of support libraries for each programming language:

- C++: [`nanopack`](https://github.com/poly-gui/nanopack)
- Swift: [`swift-nanopack`](https://github.com/poly-gui/swift-nanopack)
- TypeScript: [`ts-nanopack`](https://github.com/poly-gui/ts-nanopack)
