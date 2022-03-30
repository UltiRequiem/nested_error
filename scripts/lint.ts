#!/usr/bin/env -S deno run --allow-run

import { denoRun } from "https://gist.githubusercontent.com/UltiRequiem/831223ad27577d4551d842370b793dab/raw/a35215c9f9b72459f46ec8b2ce6bd2cc8d0c91ff/denoRun.ts";

const ignoreNode = "--ignore=node";

let [{ code: checkFormatCode }, { code: lintCode }] = await Promise.all([
  denoRun(["fmt", "--check", ignoreNode]).status(),
  denoRun(["lint", ignoreNode]).status(),
]);

if (checkFormatCode !== 0) {
  console.log("You have some formatting errors...");

  if (prompt("You want to fix them?")) {
    const { code: formatCode } = await denoRun(["fmt", ignoreNode]).status();

    if (formatCode === 0) {
      checkFormatCode--;
      console.log("Formatting successful!");
    } else {
      console.log("Formatting failed!");
    }
  }
}

if (lintCode + checkFormatCode !== 0) {
  console.log(
    "You have linting errors, this cannot be fixed automatically., please fix them manually.",
    "This will not pass the continuous integration...",
  );

  Deno.exit(1);
}

console.log("All good!");
