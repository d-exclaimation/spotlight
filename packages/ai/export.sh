#!/bin/bash

# Remove old model from server
if [ -f ../server/classifier-model.json ]; then
    rm ../server/classifier-model.json
fi

cp ./out/brain.json ../server/classifier-model.json

# Remove old categories from server
if [ -f ../server/src/utils/category.ts ]; then
    rm ../server/src/utils/category.ts
fi

# Export categories
cp ./src/category.ts ../server/src/utils/category.ts