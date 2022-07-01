#!/usr/bin/env -S deno run --allow-env --allow-read --allow-write --allow-run

import { buildPackage } from "https://deno.land/x/ultirequiem@0.0.17/node_support.ts";

buildPackage({
  repoName: "nested_error",
  name: "@ultirequiem/nested-error",
  description: "Nest Errors in the stack trace.",
  homepage: "https://nested-error.js.org",
  keywords: ["nested", "stack", "error"],
  version: "1.0.0",
});
