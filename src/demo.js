import Quill from "quill";
import { htmlEditButton } from "./quill.htmlEditButton";

Quill.register("modules/htmlEditButton", htmlEditButton);

const fullToolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic"],
  ["clean"],
  ["image"]
];

console.log("Demo loaded...");

var quill = new Quill("#editor", {
  theme: "snow",
  modules: {
    toolbar: {
      container: fullToolbarOptions
    },
    htmlEditButton: {}
  }
});
