import React, { useState } from 'react';

// import htmlEditButton from "../../../src/quill.htmlEditButton";
// import htmlEditButton from "quill-html-edit-button";
//     ^ In production use this
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// const modules = {
//   ['name']: 'htmlEditButton',
//   ['module']: htmlEditButton,
//   ['options']: {
//     debug: true
//   },
// };

export function MyApp() {
  const [value, setValue] = useState('');

  return <ReactQuill theme="snow" value={value} onChange={setValue} 
  // modules={modules} 
  />;
}
