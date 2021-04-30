import htmlEditButton from "../../quill.htmlEditButton";

import Quill from 'quill/core';

import Toolbar from 'quill/modules/toolbar';
import Snow from 'quill/themes/snow';

Quill.register({
  'modules/toolbar': Toolbar,
  'themes/snow': Snow,
  "modules/htmlEditButton": htmlEditButton
})

const fullToolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic"],
  ["clean"],
  ["image"],
  [{ list: "ordered" }, { list: "bullet" }],
];

console.log("Demo loaded...");

var quill = new Quill("#editor", {
  theme: "snow",
  modules: {
    toolbar: {
      container: fullToolbarOptions,
    },
    htmlEditButton: { debug: true, syntax: true },
  },
});
