import "./styles.css";
import Quill from "quill";
import { QuillHtmlEditButtonOptions } from "./options";

function $create(elName: string) {
  return document.createElement(elName);
}
function $setAttr(el: HTMLElement, key: string, value: string) {
  return el.setAttribute(key, value);
}

let debug = false;
const Logger = {
  prefixString() {
    return `</> quill-html-edit-button: `;
  },
  get log() {
    if (!debug) {
      return (...args: any) => {};
    }
    const boundLogFn = console.log.bind(console, this.prefixString());
    return boundLogFn;
  },
};

class htmlEditButton {
  constructor(quill: Quill, optionsInput: QuillHtmlEditButtonOptions) {
    const options = optionsInput || {};
    debug = !!(options && options.debug);
    Logger.log("logging enabled");
    // Add button to all quill toolbar instances
    const toolbarModule = quill.getModule("toolbar");
    if (!toolbarModule) {
      throw new Error(
        'quill.htmlEditButton requires the "toolbar" module to be included too'
      );
    }
    this.registerDivModule();
    let toolbarEl = toolbarModule.container;
    const buttonContainer = $create("span");
    $setAttr(buttonContainer, "class", "ql-formats");
    const button = $create("button") as HTMLButtonElement;
    button.innerHTML = options.buttonHTML || "&lt;&gt;";
    button.title = options.buttonTitle || "Show HTML source";
    button.type = "button";
    const onSave = (html: string) => {
      quill.clipboard.dangerouslyPasteHTML(html);
    };
    button.onclick = function (e) {
      e.preventDefault();
      launchPopupEditor(quill, options, onSave);
    };
    buttonContainer.appendChild(button);
    toolbarEl.appendChild(buttonContainer);
  }

  registerDivModule() {
    // To allow divs to be inserted into html editor
    // obtained from issue: https://github.com/quilljs/quill/issues/2040
    const Block = Quill.import("blots/block");
    class Div extends Block {}
    Div.tagName = "div";
    Div.blotName = "div";
    Div.allowedChildren = Block.allowedChildren;
    Div.allowedChildren.push(Block);
    Quill.register(Div);
  }
}

function launchPopupEditor(
  quill: Quill & any,
  options: QuillHtmlEditButtonOptions,
  saveCallback: (html: string) => void
) {
  const htmlFromEditor = quill.container.querySelector(".ql-editor").innerHTML;
  const popupContainer = $create("div");
  const overlayContainer = $create("div");
  const msg =
    options.msg ||
    'Edit HTML here, when you click "OK" the quill editor\'s contents will be replaced';
  const cancelText = options.cancelText || "Cancel";
  const okText = options.okText || "Ok";
  const closeOnClickOverlay = options.closeOnClickOverlay !== false;

  $setAttr(overlayContainer, "class", "ql-html-overlayContainer");
  $setAttr(popupContainer, "class", "ql-html-popupContainer");
  const popupTitle = $create("span");
  $setAttr(popupTitle, "class", "ql-html-popupTitle");
  popupTitle.innerText = msg;
  const textContainer = $create("div");
  textContainer.appendChild(popupTitle);
  $setAttr(textContainer, "class", "ql-html-textContainer");
  const codeBlock = $create("pre");
  $setAttr(codeBlock, "data-language", "xml");
  codeBlock.innerText = formatHTML(htmlFromEditor);
  const htmlEditor = $create("div");
  $setAttr(htmlEditor, "class", "ql-html-textArea");
  const buttonCancel = $create("button");
  buttonCancel.innerHTML = cancelText;
  $setAttr(buttonCancel, "class", "ql-html-buttonCancel");
  const buttonOk = $create("button");
  buttonOk.innerHTML = okText;
  $setAttr(buttonOk, "class", "ql-html-buttonOk");
  const buttonGroup = $create("div");
  $setAttr(buttonGroup, "class", "ql-html-buttonGroup");
  const prependSelector = document.querySelector(options.prependSelector);

  buttonGroup.appendChild(buttonCancel);
  buttonGroup.appendChild(buttonOk);
  htmlEditor.appendChild(codeBlock);
  textContainer.appendChild(htmlEditor);
  textContainer.appendChild(buttonGroup);
  popupContainer.appendChild(textContainer);
  overlayContainer.appendChild(popupContainer);

  if (prependSelector) {
    prependSelector.prepend(overlayContainer);
  } else {
    document.body.appendChild(overlayContainer);
  }

  const modules = options && options.editorModules;
  const hasModules = !!modules && !!Object.keys(modules).length;
  const modulesSafe = hasModules ? modules : {};
  // console.time('new Quill')
  const editor = new Quill(htmlEditor, {
    modules: {
      syntax: options.syntax,
      ...modulesSafe,
    },
  });
  // console.timeEnd('new Quill')

  buttonCancel.onclick = function () {
    if (prependSelector) {
      prependSelector.removeChild(overlayContainer);
    } else {
      document.body.removeChild(overlayContainer);
    }
  };

  if (closeOnClickOverlay) {
    overlayContainer.onclick = buttonCancel.onclick;
  }

  popupContainer.onclick = function (e) {
    e.preventDefault();
    e.stopPropagation();
  };
  buttonOk.onclick = function () {
    const container = (editor as any).container as HTMLElement;
    const qlElement = container.querySelector(".ql-editor") as HTMLDivElement;
    const output = qlElement.innerText;
    const noNewlines = output
      .replace(/\s+/g, " ") // convert multiple spaces to a single space. This is how HTML treats them
      .replace(/(<[^\/<>]+>)\s+/g, "$1") // remove spaces after the start of a new tag
      .replace(/>\s+|\s+</g, (m) => m.trim()) // remove spaces between starting and ending tags
      .replace(/<\/(p|ol|ul)>\s/g, "</$1>") // remove spaces after the end of lists and paragraphs, they tend to break quill
      .replace(/\s<(p|ol|ul)>/g, "<$1>") // remove spaces before the start of lists and paragraphs, they tend to break quill
      .replace(/<\/li>\s<li>/g, "</li><li>") // remove spaces between list items, they tend to break quill
      .replace(/\s<\//g, "</") // remove spaces before the end of tags
      .replace(/(<[^\/<>]+>)\s(<[^\/<>]+>)/g, "$1$2") // remove space between multiple starting tags
      .trim();
    saveCallback(noNewlines);
    if (prependSelector) {
      prependSelector.removeChild(overlayContainer);
    } else {
      document.body.removeChild(overlayContainer);
    }
  };
}

// Adapted FROM jsfiddle here: https://jsfiddle.net/buksy/rxucg1gd/
function formatHTML(code: string) {
  "use strict";
  let stripWhiteSpaces = true;
  let stripEmptyLines = true;
  const whitespace = " ".repeat(2); // Default indenting 4 whitespaces
  let currentIndent = 0;
  const newlineChar = "\n";
  let prevChar = null;
  let char = null;
  let nextChar = null;

  let result = "";
  for (let pos = 0; pos <= code.length; pos++) {
    prevChar = char;
    char = code.substr(pos, 1);
    nextChar = code.substr(pos + 1, 1);

    const isBrTag = code.substr(pos, 4) === "<br>";
    const isOpeningTag = char === "<" && nextChar !== "/" && !isBrTag;
    const isClosingTag = char === "<" && nextChar === "/" && !isBrTag;
    const isTagEnd = prevChar === ">" && char !== "<" && currentIndent > 0;
    const isTagNext =
      !isBrTag &&
      !isOpeningTag &&
      !isClosingTag &&
      isTagEnd &&
      code.substr(pos, code.substr(pos).indexOf("<")).trim() === "";
    if (isBrTag) {
      // If opening tag, add newline character and indention
      result += newlineChar;
      currentIndent--;
      pos += 4;
    }
    if (isOpeningTag) {
      // If opening tag, add newline character and indention
      result += newlineChar + whitespace.repeat(currentIndent);
      currentIndent++;
    }
    // if Closing tag, add newline and indention
    else if (isClosingTag) {
      // If there're more closing tags than opening
      if (--currentIndent < 0) currentIndent = 0;
      result += newlineChar + whitespace.repeat(currentIndent);
    }
    // remove multiple whitespaces
    else if (stripWhiteSpaces === true && char === " " && nextChar === " ")
      char = "";
    // remove empty lines
    else if (stripEmptyLines === true && char === newlineChar) {
      //debugger;
      if (code.substr(pos, code.substr(pos).indexOf("<")).trim() === "")
        char = "";
    }
    if (isTagEnd && !isTagNext) {
      result += newlineChar + whitespace.repeat(currentIndent);
    }

    result += char;
  }
  Logger.log("formatHTML", {
    before: code,
    after: result,
  });
  return result;
}

(window as any)["htmlEditButton"] = htmlEditButton;
export default htmlEditButton;
export { htmlEditButton };
