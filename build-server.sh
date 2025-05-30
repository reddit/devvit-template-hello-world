#!/usr/bin/env bash

set -euo pipefail

OUTPUT_FILE=bin/index.cjs

# Build the server bundle using esbuild
./esbuild.mjs

# Create a temporary directory
TEMP_DIR=$(mktemp -d)
trap 'rm -rf "$TEMP_DIR"' EXIT

jq --rawfile code "$OUTPUT_FILE" \
   --rawfile sourcemap "${OUTPUT_FILE}.map" \
   '.code = $code | .sourceMap = $sourcemap' \
   bundle.server.template.json > bin/bundle.server.json

echo "Bundle created at bin/bundle.server.json"

