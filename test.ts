import {
  assert,
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.130.0/testing/asserts.ts";

import { NestedError } from "./mod.js";

const newError = new NestedError("foo", new NestedError("bar", new Error("baz")));
