# functional-match-case

Use lazy, functional programming friendly hash maps instead of `switch` statements.

## Getting Started

**Install**

```bash
npm install functional-match-case --save
# or
yarn add functional-match-case
```

**Use it!**
```javascript
import matchCase from 'functional-match-case';
const match = matchCase({
  cars: 1,
  trucks: 2,
  other: getOtherCode, // a function to call in case of “other” case
})(defaultValue); // defaultValue could be anything, even a ref to a function that should be called!
```

## Example:

Now for some more detailed examples and use cases:

Turn:
```javascript
switch(someValue) {
  case A:
  case B:
    return resultA;
  case C:
    return resultB;
  case D:
    return functionC();
  default:
    return defaultValue;
}
```

Into:

```javascript
import matchCase from 'functional-match-case';

const match = matchCase({
  [A]: resultA,
  [B]: resultA,
  [C]: resultB,
  [D]: functionC, // just the ref, will be called when needed
})(defaultValue);

// Then whenever needed:

match(someValue);
```

## Extra Benefits:

**Reusable cases. For example:**

```javascript
// fileA.js
export const someMatchCase = {
  [A]: resultA,
  [B]: resultB,
};
```

```javascript
// fileB.js
export const anotherMatchCase = {
  [C]: resultC,
  [D]: functionD,
}
```

```javascript
// fileC.js
export const yetAnotherMatchCase = {
   ...someMatchCase,
   ...anotherMatchCase,
   [F]: resultF,
};

```

**Lazy**

You could use a simple hash map instead of a `switch`. (Assuming no need for a `default` case.)

But, if you added functions like this:
```javascript
const hash = {
  keyA: functionA(),
  keyB: 401,
  keyC: functionC(),
  keyD: 200,
}
```

Then those functions would be executed and evaluated right away.

With `functional-match-case` you just pass a reference and it will be executed when needed.
