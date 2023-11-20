#!/bin/bash

# Set the old and new require statements
OLD_REQUIRE='./db'
NEW_REQUIRE='../db'

# List of JavaScript files to update
FILES=(
  'authController.js'
  'fieldsController.js'
  'serController.js'
  'usersController.js'
  'alldataController.js'
  'commonController.js'
  'topicsController.js'
  'wordsController.js'
)

# Iterate over each file and update the require statement
for FILE in "${FILES[@]}"; do
  sed -i "s|$OLD_REQUIRE|$NEW_REQUIRE|g" "$FILE"
  echo "Updated $FILE"
done

echo "Script execution completed."

