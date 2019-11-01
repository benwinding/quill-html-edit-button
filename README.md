# quill-html-edit-button

<!-- [START badges] -->

[![NPM Version](https://img.shields.io/npm/v/quill-html-edit-button.svg)](https://www.npmjs.com/package/quill-html-edit-button)
[![License](https://img.shields.io/npm/l/quill-html-edit-button.svg)](https://github.com/benwinding/quill-html-edit-button/blob/master/LICENSE)
[![Downloads/week](https://img.shields.io/npm/dm/quill-html-edit-button.svg)](https://www.npmjs.com/package/quill-html-edit-button)
[![Github Issues](https://img.shields.io/github/issues/benwinding/quill-html-edit-button.svg)](https://github.com/benwinding/quill-html-edit-button)

<!-- [END badges] -->

Quill.js Module which allows you to quickly view/edit the HTML in the editor

![Demo](https://i.imgur.com/Gd5Pc6U.gif)

## Install

`yarn add quill-html-edit-button`

## Quickstart

``` js
import { htmlEditButton } from "./quill.htmlEditButton.js";

Quill.register("modules/htmlEditButton", htmlEditButton);

const quill = new Quill(editor, {
  // ...
  modules: {
    // ...
    htmlEditButton: {}
  }
});
```

## Quickstart (script tag)

``` html
    <script src="/dist/quill.htmlEditButton.min.js"></script>
    <script>
      Quill.register("modules/htmlEditButton", htmlEditButton);
      const quill = new Quill(editor, {
        // ...
        modules: {
          // ...
          htmlEditButton: {}
        }
      });
    </script>
```
## Thanks

This project is based on [quill-image-uploader](https://github.com/NoelOConnell/quill-image-uploader), thanks mate!
