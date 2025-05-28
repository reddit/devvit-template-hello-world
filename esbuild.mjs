#!/usr/bin/env node

/* eslint-disable no-console */
import * as esbuild from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

import path from "path";

/**
 * @param {boolean} watch
 * @returns {Promise<esbuild.BuildResult<esbuild.BuildOptions>> | undefined}
 */
async function build(watch) {
  /** @type {esbuild.BuildOptions} */
  const opts = {
    entryPoints: ["src/server/index.ts"],
    outdir: "bin",
    format: "cjs",
    entryNames: "[name]",
    outExtension: { ".js": ".cjs" },
    plugins: [
      nodeExternalsPlugin({
        packagePath: path.resolve("./package.json"),
        allowList: [
          'express',
          /^@devvit\//
        ],
      }),
    ],
    sourcemap: true,
    bundle: true,
    platform: "node",
  };

  if (!watch) {
    await esbuild.build(opts);
    console.log(
      `[esbuild/server] Build finished. Output is in ${path.resolve("bin")}`
    );
    return;
  }

  console.log("[esbuild/server] Starting watch mode...");
  const ctx = await esbuild.context(opts);
  await ctx.watch();
}

async function main() {
  const enableWatchMode = process.argv.includes("--watch");
  await build(enableWatchMode);
}

await main();
