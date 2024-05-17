---
title: Installation
description: A guide in how to install and setup Poly
---

All Poly applications are created and managed through the [`poly` CLI](https://www.github.com/poly-gui/cli).

## Pre-requisites

- [Xcodegen](https://github.com/yonaskolb/XcodeGen) for generating xcode projects on macOS
- [pnpm](https://pnpm.io/) for installing node dependencies. in the future the CLI will be able to detect the correct package manager to use for isntalling dependencies

## Download

Pre-built binaries of the CLI are published as [GitHub releases](https://github.com/poly-gui/cli/releases).
Put the binary in a directory that is in PATH, or add the directory it is in to PATH, then it is ready to go.

### Building the CLI

The CLI can also be built from the source code, which requires:

- [Go 1.20 or higher](https://go.dev/dl/)

First, clone this repo:

```
git clone https://github.com/poly-gui/cli.git
```

This clones the repo into a directory called "cli". If the name is too generic, feel free to clone the repo into a
directory with a different name.

Change into the repo, and install the required dependencies:

```
go mod download
```

Finally, build and install the binary:

```
go install poly-cli/cmd/poly
```

The `poly` command should now be installed and ready to use. Make sure `GOBIN`
is in PATH, which defaults to `$(go env GOPATH)/bin`. If not, add:

```
export PATH="$PATH:$(go env GOPATH)/bin"
```

or if `GOBIN` is set:

```
export PATH="$PATH:$(go env GOBIN)/bin"
```

to your path.

:::note
For more information on `GOPATH` and `GOBIN`, please consult
the [official documentation](https://go.dev/doc/install/source#gopath).
:::
