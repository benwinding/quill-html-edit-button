#!/usr/bin/env sh

rm -rf ./dist
mkdir dist

# Common Header
cp ./header-text.js ./dist
# Demo list
cp ./demos-index.html ./dist/index.html

# Build typescript
rm -rf ./typescript/dist
yarn build:typescript
cp -r ./typescript/dist ./dist/typescript

# Build javascript
rm -rf ./javascript/dist
yarn build:javascript
cp -r ./javascript/dist ./dist/javascript

# Copy script tags
mkdir ./dist/script-tags
cp ./script-tags/* ./dist/script-tags

# Build vue
rm -rf ./vue/dist
yarn build:vue
cp -r ./vue/dist ./dist/vue

# Build react
rm -rf ./react/dist
yarn build:react
cp -r ./react/dist ./dist/react
