# nested_error

[![npm](https://img.shields.io/npm/v/@ultirequiem/nested-error?logo=npm&color=cb3837)](https://www.npmjs.com/package/@ultirequiem/nested-error)
[![npm downloads](https://img.shields.io/npm/dm/@ultirequiem/nested-error?color=cb3837)](https://www.npmjs.com/package/@ultirequiem/nested-error)
[![CI](https://github.com/UltiRequiem/nested_error/actions/workflows/ci.yaml/badge.svg)](https://github.com/UltiRequiem/nested_error/actions/workflows/ci.yaml)
[![codecov](https://codecov.io/gh/UltiRequiem/nested_error/graph/badge.svg)](https://codecov.io/gh/UltiRequiem/nested_error)

Error objects with nested Errors in stacktraces.

## Install

```sh
npm install @ultirequiem/nested-error
```

## Usage

### [Node.js 🐢🚀](https://npmjs.com/package/@ultirequiem/nested-error)

```typescript
import { NestedError } from "@ultirequiem/nested-error";

function sum(a: number, b: number) {
  if (a === 4 || b === 4) {
    throw new Error("The number 4 gives bad luck.");
  }

  return a + b;
}

try {
  sum(1, 4);
} catch (error) {
  const newError = new NestedError("Error while summing 1 and 4", error);
  console.log(newError.stack);
}
```

Will cause

```
error: Uncaught (in promise) Error: Error: There was an error while summing 1 and 4
    at nestError (file:///home/ulti/repos/packages/nested-error/mod.js:53:18)
    at file:///home/ulti/repos/packages/nested-error/example.ts:14:5
Caused By: Error: The number 4 gives bad luck.
    at sum (file:///home/ulti/repos/packages/nested-error/example.ts:5:11)
    at file:///home/ulti/repos/packages/nested-error/example.ts:11:1
  throw new Error(nested.stack);
        ^
    at nestError (file:///home/ulti/repos/packages/nested-error/mod.js:54:9)
    at file:///home/ulti/repos/packages/nested-error/example.ts:14:5
```

### Browser

You can use any [CDN](https://en.wikipedia.org/wiki/Content_delivery_network) 🔥

Eg. [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
▶ [SkyPack](https://cdn.skypack.dev/@ultirequiem/nested-error) _/_
[script tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) ▶
[JSDelivr](https://cdn.jsdelivr.net/npm/@ultirequiem/nested-error).

_The API is the same on all these platforms._

## Support

Open an Issue, I will check it as soon as possible 👀

If you want to hurry me up a bit
[send me a tweet](https://twitter.com/intent/tweet?text=%40UltiRequiem%20) 😆

Don't forget to star the repo ⭐

## Versioning

We use [SemVer](http://semver.org) for versioning. For the versions available,
see the [tags](https://github.com/UltiRequiem/nested_error/tags).

## Authors

[Eliaz Bobadilla (a.k.a UltiRequiem)](https://ultirequiem.com) - Creator and
Maintainer 💪

See also the full list of
[contributors](https://github.com/UltiRequiem/nested_error/contributors) who
participated in this project.

## Licence

Licensed under the MIT License.
