# quill-html-edit-button

<!-- [START badges] -->

[![NPM Version](https://img.shields.io/npm/v/quill-html-edit-button.svg)](https://www.npmjs.com/package/quill-html-edit-button)
[![License](https://img.shields.io/npm/l/quill-html-edit-button.svg)](https://github.com/benwinding/quill-html-edit-button/blob/master/LICENSE)
[![Downloads/week](https://img.shields.io/npm/dm/quill-html-edit-button.svg)](https://www.npmjs.com/package/quill-html-edit-button)
[![Github Issues](https://img.shields.io/github/issues/benwinding/quill-html-edit-button.svg)](https://github.com/benwinding/quill-html-edit-button)

<!-- [END badges] -->

Quill.js Module which compresses images that are uploaded to the editor

## Install

`yarn add quill-html-edit-button`

## Quickstart

```js
import ImageCompress from "quill-html-edit-button";

Quill.register("modules/imageCompress", ImageCompress);

const quill = new Quill(editor, {
  // ...
  modules: {
    // ...
    imageCompress: {
      quality: 0.7, // default
      maxWidth: 1000, // default
      imageType: "image/jpeg", // default
      debug: true // default
    }
  }
});
```

## Options

- **maxWidth**
  - Maximum width of images (in pixels)
- **quality**
  - Image quality range: 0.0 - 1.0
- **imageType**
  - Values: 'image/jpeg' , 'image/png' ... etc
- **debug**
  - Displays console logs: true/false

## Thanks

This project is based on [quill-image-uploader](https://github.com/NoelOConnell/quill-image-uploader), thanks mate!
