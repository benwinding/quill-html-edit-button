#!/usr/bin/env sh


# Build typescript
mkdir dist
pushd typescript
yarn && yarn build
cp -r ./dist ../dist/typescript
popd 

# Build javascript
pushd javascript
yarn && yarn build
cp -r ./dist ../dist/javascript
popd

# Build script tags
pushd script-tags
mkdir ../dist/script-tags
cp -r ./* ../dist/script-tags
popd
