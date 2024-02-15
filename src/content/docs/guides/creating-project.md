---
title: Creating a New Project
description: A guide in how to create a new Poly project.
---

After [installing the Poly CLI](/guides/installation/), you can now create a new Poly project:

```
poly generate --name=MyNewApp --package=org.my
```

this generates a new Poly application called "MyNewApp" under the package identifier "org.my".
The package identifier corresponds to:

- the [organization identifier in Xcode](https://developer.apple.com/documentation/xcode/creating-an-xcode-project-for-an-app) when creating a new app; and
- the [application ID in GTK](https://docs.gtk.org/gtk4/ctor.Application.new.html) when creating a new GTK application, minus the application name.

### Creating the Project In a Separate Directory

You can pass the `--output` flag to generate the project in a different directory:

```
poly generate --name=MyNewApp --package=org.my --output=../project
```

This outputs the `MyNewApp` directory in the `project` directory that is in the parent directory of the current working directory.

## Project Structure

The command generates a directory named `MyNewApp` in the current working directory that has the following structure:

```
MyNewApp/
├── gtk/
│   ├── packaging/
│   │   ├── rpm/
│   │   │   └── app.spec
│   │   └── launch.sh
│   ├── src/
│   │   └── main.cxx
│   └── CMakeLists.txt
├── macOS/
│   ├── MyNewApp/
│   │   ├── AppDelegate.swift
│   │   └── main.swift
│   └── project.yml
└── app/
    ├── src/
    │   └── main.ts
    ├── package.json
    └── tsconfig.json
```

- `gtk`: the entry point to the GTK layer of the application. It contains all the necessary components to build the application as a GTK application that can run on Linux.
  - `packaging`: this directory contains files that is required when packaging the GTK application.
    - `launch.sh`: this is the launch script for the application when it is installed. It sets up the correct environment for the application. When running the installed application, `launch.sh` will be invoked.
    - `rpm`: this directory contains files that are required to [package the application as a `.rpm` package](https://rpm-packaging-guide.github.io).
- `macOS`: the entry point to the AppKit layer of the application. It contains all the necessary components to build the application as an AppKit application that can run on macOS.
  - `project.yml`: The [`xcodegen`](https://github.com/yonaskolb/XcodeGen) spec for the XCode project. When the project is created in macOS, `xcodegen generate` will be run automatically, which will generate `MyNewApp.xcodeproj`. The AppKit project can then be opened in XCode.
- `app`: the directory that contains code for the portable layer. Poly only supports TypeScript for now, so `app` will contain a TypeScript project. All application logic will go in this directory.

## Running the Project

In order to run the project, change into the `app` directory, and then run the `build` NPM script:

```
npm run build
```

:::note
You can also use your preferred package manager of choice, such as [Yarn](https://yarnpkg.com) or [pnpm](https://pnpm.io), to run the script.
:::

### MacOS

If the `.xcodeproj` file is not present, generate it by changing into the `macOS` directory and running [xcodegen](https://github.com/yonaskolb/XcodeGen):

```
xcodegen generate
```

Open the `.xcodeproj` in XCode, and then run the project.
