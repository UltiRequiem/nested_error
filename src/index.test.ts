import { describe, expect, it } from "vitest";
import { NestedError } from "./index.js";

describe("Main", () => {
  const message = "Hello World";

  it("Is instance of Error.", () => {
    const error = new NestedError(message, new Error(message));

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(NestedError);
  });

  it("The message remains the same.", () => {
    const error = new NestedError(message, new Error("inner"));

    expect(error.message).toEqual(message);
  });

  it("Includes the message in the strack trace", () => {
    const nested = new NestedError(message);

    expect(nested.stack?.includes(message)).toBeTruthy();
  });

  it("Includes child stack in the strack trace", () => {
    const inner = new Error(message);

    const nested = new NestedError("Different", inner);

    expect(nested.stack?.includes(inner.stack!)).toBeTruthy();
  });

  it("Can accept only error parameter", () => {
    const newError = new NestedError(new Error("error"));

    expect(newError).toBeInstanceOf(Error);
  });
});
