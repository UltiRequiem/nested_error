import {
  assert,
  assertEquals,
  assertInstanceOf,
} from "https://deno.land/std@0.150.0/testing/asserts.ts";
import { NestedError } from "./mod.ts";

Deno.test("Main", async (t) => {
  const message = "Hello World";

  await t.step("Is instance of Error.", () => {
    const error = new NestedError(message, new Error(message));

    assertInstanceOf(error, Error);
    assertInstanceOf(error, NestedError);
  });

  await t.step("The message remains the same.", () => {
    const error = new NestedError(message, new Error("inner"));

    assertEquals(error.message, message);
  });

  await t.step("Includes the message in the strack trace", () => {
    const nested = new NestedError(message);

    assert(nested.stack?.includes(message));
  });

  await t.step("Includes child stack in the strack trace", () => {
    const inner = new Error(message);

    const nested = new NestedError("Different", inner);

    assert(nested.stack?.includes(inner.stack!));
  });

  await t.step("Can accept only error parameter", () => {
    const newError = new NestedError(new Error("error"));

    assertInstanceOf(newError, Error);
  });
});
