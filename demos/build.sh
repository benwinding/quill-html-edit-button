#!/usr/bin/env sh

rm -rf ./dist
mkdir dist

# Common Header
cp ./header-text.js ./dist
# Demo list
cp ./demos-index.html ./dist/index.html

# Build typescript
cd typescript
rm -rf ./dist
yarn && yarn build
cp -r ./dist ../dist/typescript
cd .. 

# Build javascript
cd javascript
rm -rf ./dist
yarn && yarn build
cp -r ./dist ../dist/javascript
cd ..

# Build script tags
cd script-tags
rm -rf ./dist
mkdir ../dist/script-tags
cp -r ./* ../dist/script-tags
cd ..

# Build vue
cd vue
rm -rf ./dist
yarn && yarn build
cp -r ./dist ../dist/vue
cd ..

# Build vue
cd react
rm -rf ./dist
yarn && yarn build
cp -r ./dist ../dist/react
cd ..
