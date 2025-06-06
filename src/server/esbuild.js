#!/usr/bin/env node

import esbuild from "esbuild";
import { clean } from "esbuild-plugin-clean";

// Shared options -------------------------------------------------------------
const options = {
  entryPoints: ["index.ts"],
  bundle: true,
  splitting: true,
  treeShaking: true,
  outdir: "dist",
  platform: "node",
  target: "node22",
  format: "esm",
  sourcemap: true,
  plugins: [
    // Removes everything to make sure no weird artifacts or out
    // of date fixtures are hanging around
    clean({
      patterns: ["./dist/**/*"],
    }),
  ],
};

// Detect "watch" (or "w") --------------------------------------------------
const isWatch = process.argv.includes("--watch") || process.argv.includes("-w");

// Helper plugin to print rebuild status -------------------------------------
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
      // In watch mode we need to use the Context API (watch has been removed from build())
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
