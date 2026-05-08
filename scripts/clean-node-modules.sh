#!/usr/bin/env bash

# Delete node_modules and optional lock files
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [ -d node_modules ]; then
  echo "Removing node_modules..."
  rm -rf node_modules
  echo "node_modules removed"
else
  echo "node_modules not found"
fi

# Optionally remove lockfiles (uncomment if desired)
# rm -f package-lock.json yarn.lock pnpm-lock.yaml

exit 0
