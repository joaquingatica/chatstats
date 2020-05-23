#!/usr/bin/env bash
deno test \
    --unstable \
    --importmap=import_map.json \
    ./test/mod.ts
