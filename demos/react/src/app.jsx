import React, { useState } from "react";

import htmlEditButton from "../../../src/quill.htmlEditButton";
// import htmlEditButton from "quill-html-edit-button";
//     ^ In production use this
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

import Toolbar from "quill/modules/toolbar";
import Snow from "quill/themes/snow";

Quill.register({
  "modules/toolbar": Toolbar,
  "themes/snow": Snow,
  "modules/htmlEditButton": htmlEditButton,
});

const modules = {
  htmlEditButton: {
    debug: true,
  },
};

export function MyApp() {
  const [value, setValue] = useState("Here is some text!");

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      modules={modules}
    />
  );
}
