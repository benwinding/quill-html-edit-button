/* 
  Currently there's no types for quill modules, 
  so you need to either make types, or use a js
  file to import them (which is what setup.js is).
*/
import Quill from "./setup";

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
