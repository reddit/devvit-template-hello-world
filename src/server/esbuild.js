#!/usr/bin/env node

import * as esbuild from "esbuild";
import { clean } from "esbuild-plugin-clean";

/**
 * @type {import("esbuild").BuildOptions}
 */
const options = {
  entryPoints: ["index.ts"],
  bundle: true,
  splitting: false,
  treeShaking: true,
  outdir: "dist",
  platform: "node",
  target: "node22",
  format: "cjs",
  sourcemap: true,
  plugins: [
    // Removes everything to make sure no weird artifacts are hanging around
    clean({
      patterns: ["./dist/**/*"],
    }),
  ],
};

const isWatch = process.argv.includes("--watch") || process.argv.includes("-w");

const loggerPlugin = {
  name: "rebuild-logger",
  setup(build) {
    build.onEnd((result) => {
      const t = new Date().toLocaleTimeString();
      if (result.errors.length) {
        console.error(`[${t}] rebuild failed`, result.errors);
      } else {
        console.log(
          `[${t}] rebuild complete${
            result.warnings.length ? " with warnings" : ""
          }`
        );
      }
    });
  },
};

(async () => {
  try {
    if (isWatch) {
      const ctx = await esbuild.context({
        ...options,
        plugins: [...options.plugins, loggerPlugin],
      });

      await ctx.watch();
      console.log("Watching for changes…");
    } else {
      await esbuild.build(options);
      console.log("Build complete!");
    }
  } catch (err) {
    console.error("Build failed:", err);
    process.exit(1);
  }
})();
