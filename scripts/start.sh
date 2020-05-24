#!/usr/bin/env bash
deno run \
    --unstable \
    --importmap=import_map.json \
    --allow-net \
    --allow-read \
    --allow-write \
    ./src/mod.ts
