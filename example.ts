import { nestError } from "./mod.js";

async function sum(a: number, b: number) {
  if (a === 4 || b === 4) {
    throw new Error("The number 4 gives bad luck.");
  }

  return a + b;
}

sum(1, 4)
  .then(console.log)
  .catch((error) => {
    nestError("There was an error while summing 1 and 4", error);
  });
