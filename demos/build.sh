#!/usr/bin/env sh

rm -rf ./dist
mkdir dist

# Build typescript
pushd typescript
rm -rf ./dist
yarn && yarn build
cp -r ./dist ../dist/typescript
popd 

# Build javascript
pushd javascript
rm -rf ./dist
yarn && yarn build
cp -r ./dist ../dist/javascript
popd

# Build script tags
pushd script-tags
rm -rf ./dist
mkdir ../dist/script-tags
cp -r ./* ../dist/script-tags
popd
