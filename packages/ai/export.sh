#!/bin/bash

# Remove old model from server
if [ -f ../server/ml/model.json ]; then
    rm ../server/ml/model.json
fi

# Export model
cp ./out/brain.json ../server/ml/model.json

# Remove old categories from server
if [ -f ../server/src/utils/category.ts ]; then
    rm ../server/src/utils/category.ts
fi

# Export categories
cp ./src/category.ts ../server/src/utils/category.ts