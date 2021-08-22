#!/usr/bin/env bash

rm -rf flat
ROOT=contracts/

TOKEN_REGISTRY=tokens/
TOKEN_REGISTRY_FULLPATH="$ROOT""$POSDAO"

FLAT=flat/

iterate_sources() {
  files=$(ls "$1"*.sol)
  for file in $files; do
    file_name=$(basename "$file")
    hardhat flatten "$file" > "$2""$file_name"
  done
}

mkdir -p "$FLAT""$TOKEN_REGISTRY";

iterate_sources "$TOKEN_REGISTRY_FULLPATH" "$FLAT""$TOKEN_REGISTRY"