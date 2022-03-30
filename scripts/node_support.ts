#!/usr/bin/env -S deno run --allow-env --allow-read --allow-write --allow-run

import { buildPackage } from "https://deno.land/x/ultirequiem@0.0.12/node_support.ts";

buildPackage({
  repoName: "random_item",
  name: "@ultirequiem/random-item",
  description: "Get a random item from an array.",
  homepage: "https://random-item.js.org",
  keywords: ["array", "random"],
  version: "1.1.0",
});
