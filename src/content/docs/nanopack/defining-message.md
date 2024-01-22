---
title: Defining a Message
description: A guide in how to define a NanoPack message
---

A message in NanoPack is similar to a struct or a class in programming languages.
Every NanoPack message is defined in a NanoPack schema,
which is just a YAML config file describing the shape of the message.

## Syntax Overview

Below is an overview of the syntax of defining a NanoPack message.

```yaml
<MessageNameInPascalCase>:
  typeid: 1 # required
  <my_field>: <data-type>:<field-number>
  <my_second_field>: <data-type>:<field-number>
  # ...
  <my_last_field>: <array-data-type>[]:<field-number>
```

:::note
Angle bracket denotes a placeholder, and is not part of the syntax.
:::

### Type ID

The reserved `typeid` field specifies the [type ID](../binary-format/) of the message.
It has to be an integer from 1 to 4,294,967,296. **Every message is required to have a type ID.**

### Field Number

Each field must have an assigned number, similar to Protocol Buffer.
The number of a field is specified by the `:<number>` syntax, after the type of the field.

Different fields cannot share the same field number.

:::note
Although not required, it is recommended that the fields are ordered by their field number, in ascending order.
:::

### Data types

NanoPack supports various data types. Other messages can also be used as the message type, without any special import
syntax,
but schema of the message type used must be compiled together with the schema it is used in.
For example, if `MessageA` in `MessageA.yaml` uses `MessageB` in `MessageB.yaml` as a type for one of `MessageA`'s
field,
`MessageA.yaml` and `MessageB.yaml` must be compiled together in one go.

## Example schema

Below is a simple NanoPack schema that defines a message called `Person`:

```yaml
# Person.yml
Person:
  typeid: 1
  first_name: string:0
  last_name: string:1
  age: int8:2
  friends: Person[]:3
```

`Person` has the following properties:

| Field        | Description                                                            |
|:-------------|:-----------------------------------------------------------------------|
| `typeid`     | Person has a type ID of 1                                              |
| `first_name` | A string field with a field number of 0                                |
| `last_name`  | A string field with a field number of 1                                |
| `age`        | A field that stores an 8-bit integer and has a field number of 2       |
| `friends`    | A field that stores an array of `Person`s and has a field number of 3. |

## Message Inheritance

A message can inherit from another message, called the *parent message*.
By inheriting a message, all the fields of the parent message will be available in the message (child message) that
inherits the parent message.

### Syntax

To inherit from a message, simply add `::<ParentMessageName>` after the name of the child message.

### Example

Let's create a simple message called `GameObject` that represents an object in a hypothetical game:

```yaml
# GameObject.yml
GameObject:
  typeid: 1
  id: number:0
  position: number[]:1
```

A special type of `GameObject` can be created by inheriting `GameObject`:

```yaml
# Block.yml
Block::GameObject:
  typeid: 2
  durability: number:0
  material: string:1
```

Now, all the fields defined in `GameObject` are accessible in `Block` as well.

### Polymorphism

One of the primary benefits of inheritance is being able to group related types and store it in a field or a container.
Consider the following example:

```yaml
Box::GameObject:
  typeid: 3
  content: GameObject[]:0
```

The `content` field stores all `GameObject`s into an array, which can be `GameObject` itself
and also any message that inherits `GameObject`, such as `Block` or `Box`.

#### Generated Code

The generated code will correctly describe the inheritance describe in the schemas. For example, in Swift,
`GameObject` will be a class that inherits `NanoPackMessage`:

```swift
class GameObject: NanoPackMessage {
  // ...
}
```

and both `Block` and `Box` will be classes that extend `GameObject`:

```swift
class Block: GameObject {
  // ...
}

class Box: GameObject {
  // ...
  let content: [GameObject]
  // ...
}
```

How the inheritance behavior is generated for each language is described in details in their corresponding guides. 
