# quill-html-edit-button

<!-- [START badges] -->

[![NPM Version](https://img.shields.io/npm/v/quill-html-edit-button.svg)](https://www.npmjs.com/package/quill-html-edit-button)
[![License](https://img.shields.io/npm/l/quill-html-edit-button.svg)](https://github.com/benwinding/quill-html-edit-button/blob/master/LICENSE)
[![Downloads/week](https://img.shields.io/npm/dm/quill-html-edit-button.svg)](https://www.npmjs.com/package/quill-html-edit-button)
[![Github Issues](https://img.shields.io/github/issues/benwinding/quill-html-edit-button.svg)](https://github.com/benwinding/quill-html-edit-button)

<!-- [END badges] -->

Quill.js Module which allows you to quickly view/edit the HTML in the editor

![Demo](https://user-images.githubusercontent.com/664714/93285035-f7f44e80-f7a1-11ea-83c7-59e151c53c06.gif)

- [Live Demo](https://benwinding.github.io/quill-html-edit-button/src/demo.html)
- [Live Demo (using script tags)](https://benwinding.github.io/quill-html-edit-button/src/demo-script-tag.html)
- [Live Demo With Tables! (quill-2.x)](https://benwinding.github.io/quill-html-edit-button/src/demo-script-tag-2.x.html)

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

## Options

``` js
modules: {
  // ...
  htmlEditButton: {
    debug: true, // logging, default:false
    msg: "Edit the content in HTML format", //Custom message to display in the editor, default: Edit HTML here, when you click "OK" the quill editor's contents will be replaced
    okText: "Ok", // Text to display in the OK button, default: Ok,
    cancelText: "Cancel", // Text to display in the cancel button, default: Cancel
    buttonHTML: "&lt;&gt;", // Text to display in the toolbar button, default: <>
    buttonTitle: "Show HTML source", // Text to display as the tooltip for the toolbar button, default: Show HTML source
    syntax: false, // Show the HTML with syntax highlighting. Requires highlightjs on window.hljs (similar to Quill itself), default: false
    prependSelector: 'div#myelement', // a string used to select where you want to insert the overlayContainer, default: null (appends to body),
    editorModules: {} // The default mod
  }
}
```

### Syntax Highlighting

By default syntax highlighting is off, if you want to enable it use `syntax: true` in the options (as shown above) and make sure you add the following script tags:

``` html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/github.min.css"
/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/highlight.min.js"></script>
<script
  charset="UTF-8"
  src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/languages/xml.min.js"
></script>
```

Alternatively, include these scripts in your package bundler, as long as highlightjs is available in the global space at `window.hljs`.

## Customising The Editor
The editor itself is actually a Quill Editor instance too! So you can pass in custom modules like this:

``` js
  // options
  htmlEditButton: {
    debug: true,
    syntax: true,
    editorModules: {
      // Any modules here will be declared in HTML quill editor instance
      keyboard: {
        bindings: {
          custom: {
            key: 'a',
            handler: function(range, context) {
              console.log('A KEY PRESSED!');
            }
          },
        },
      },
    },
  },
```

## Thanks

This project is based on [quill-image-uploader](https://github.com/NoelOConnell/quill-image-uploader), thanks mate!
