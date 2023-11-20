#!/bin/bash

# Replace the old path with the new path
find ./controllers -type f -name '*.js' -exec sed -i 's|require(\x27\.\./db\x27)|require(\x27../../db/database.js\x27)|g' {} \;

