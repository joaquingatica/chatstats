#!/usr/bin/env bash
deno run \
    --unstable \
    --importmap=import_map.json \
    --allow-net \
    ./src/mod.ts
