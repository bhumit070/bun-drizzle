#!/bin/bash
rm -rf ./dist
bun build ./src/index.ts
bun run ./dist/index.js