import { NestedError } from "./mod.ts";

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
