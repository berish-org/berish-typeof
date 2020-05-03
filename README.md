# @berish/typeof

Library for information about the type of any object or primitive

## Installation

```
$ npm install @berish/typeof --save
```

or

```
$ yarn add @berish/typeof
```

**Supports typescript**

### Before use

```
import type, { ITypeofHandler, TypeofResult } from '../';
```

## Check Types (Default)

### string

```
console.log(type('')); // === 'string'
console.log(type('hello')); // === 'string'
console.log(type(new String('helloo'))); // === 'string'
```

### number

```
console.log(type(0)); // === 'number'
console.log(type(-0)); // === 'number'
console.log(type(0xff)); // === 'number'
console.log(type(-3.142)); // === 'number'
console.log(type(Infinity)); // === 'number'
console.log(type(-Infinity)); // === 'number'
console.log(type(NaN)); // === 'number'
console.log(type(Number(53))); // === 'number'
console.log(type(new Number(53))); // === 'number'
```

### boolean

```
console.log(type(true)); // === 'boolean'
console.log(type(false)); // === 'boolean'
console.log(type(new Boolean(true))); // === 'boolean'
```

### undefined

```
console.log(type(undefined)); // === 'undefined'
```

### null

```
console.log(type(null)); // === 'null'
```

### symbol

```
console.log(type(Symbol())); // === 'symbol'
console.log(type(Symbol.species)); // === 'symbol'
```

### arguments

```
console.log(
  (function() {
    return type(arguments);
  })(),
); // === 'arguments'
```

### function

```
console.log(type(function() {})); // === 'function'
console.log(type(new Function())); // === 'function'
console.log(type(class {})); // === 'function'
```

### regexp

```
console.log(type(/^(.+)$/)); // === 'regexp'
console.log(type(new RegExp('^(.+)$'))); // === 'regexp'
```

### date

```
console.log(type(new Date())); // === 'date'
```

### set

```
console.log(type(new Set())); // === 'set'
```

### map

```
console.log(type(new Map())); // === 'map'
```

### weakset

```
console.log(type(new WeakSet())); // === 'weakset'
```

### weakmap

```
console.log(type(new WeakMap())); // === 'weakmap'
```

### array

```
console.log(type([])); // === 'array'
console.log(type(Array(5))); // === 'array'
```

### object

```
console.log(type({})); // === 'object'
console.log(type(new Object())); // === 'object'
console.log(type(Object())); // === 'object'
console.log(type(new (class A {})())); // === 'object'
```

## Custom check type (with handler)

```

class A {
  constructor() {
    this.name = 'Hello';
  }
}
console.log(type(new A())); // === 'object';


type MyType = TypeofResult | 'classAInstance';

const handlerBefore: ITypeofHandler<MyType> = {
  before: true,
  handler: (value, preview) => {
    console.log(value); // === { name: 'Hello' } (as instance of A class);
    console.log(preview); // === 'undefined'
    return value instanceof A;
  },
  typeName: 'classAInstance',
};

console.log(type<MyType>(new A(), [handlerBefore])); // === 'classAInstance'

const handlerAfter: ITypeofHandler<MyType> = {
  handler: (value, preview) => {
    console.log(value); // === { name: 'Hello' } (as instance of A class);
    console.log(preview); // === 'object'
    return value instanceof A;
  },
  typeName: 'classAInstance',
};

console.log(type<MyType>(new A(), [handlerAfter])); // === 'classAInstance'

```

### The difference between handlers before and after

The handler with `before: true` is executed before the function logic passes, so in the field `preview` we see the value `undefined`.
But the handler with `before: false` or `before: undefined` is executed after the logic of the function passes, so in the field `preview` we see the value that would be received by default (as if without a handler)
