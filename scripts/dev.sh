#!/usr/bin/env bash

set -euo pipefail

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
unset npm_config_prefix

if [[ ! -s "$NVM_DIR/nvm.sh" ]]; then
  echo "nvm was not found at $NVM_DIR/nvm.sh"
  exit 1
fi

source "$NVM_DIR/nvm.sh"
nvm use 20.9.0 >/dev/null

rm -rf .next

echo "Starting Asset Management System with $(node -v) ($(node -p 'process.arch'))"
exec npm run dev
