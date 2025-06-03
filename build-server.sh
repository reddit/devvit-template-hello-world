#!/usr/bin/env bash

set -euo pipefail

SERVER_JS_OUTPUT=bin/index.cjs
OUTPUT_BUNDLE=dist/main.bundle.json

# This should spit out a bundle using the classic bundler approach
npx devvit bundle actor main

# Build the server bundle using esbuild
./esbuild.mjs

# Create a temporary directory
TEMP_DIR=$(mktemp -d)
trap 'rm -rf "$TEMP_DIR"' EXIT

jq --rawfile code "$SERVER_JS_OUTPUT" \
   --rawfile sourcemap "${SERVER_JS_OUTPUT}.map" \
   '.standaloneServerCode = $code | .standaloneServerSourceMap = $sourcemap | .actor.name = "main" | .actor.version = "0.0.0"' \
   ${OUTPUT_BUNDLE} > bin/bundle.combined.json

echo "Bundle created at bin/bundle.combined.json"

