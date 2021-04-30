import { QuillHtmlLogger } from './logger';
import "./styles.css";
import Quill from "quill";
import { QuillHtmlEditButtonOptions } from "./options";
import { OutputHTMLParser } from "./html-parser";
import { FormatHTMLStringIndentation } from "./html-formatter";

function $create(elName: string) {
  return document.createElement(elName);
}
function $setAttr(el: HTMLElement, key: string, value: string) {
  return el.setAttribute(key, value);
}

const Logger = new QuillHtmlLogger();

class htmlEditButton {
  constructor(quill: Quill, optionsInput: QuillHtmlEditButtonOptions) {
    const options = optionsInput || {};
    const debug = !!(options && options.debug);
    Logger.setDebug(debug);
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
  codeBlock.innerText = FormatHTMLStringIndentation(htmlFromEditor, Logger);
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
    const htmlInputFromPopup = qlElement.innerText;
    const htmlOutputFormatted = OutputHTMLParser(htmlInputFromPopup);
    console.log('OutputHTMLParser', { htmlInputFromPopup, htmlOutputFormatted })
    saveCallback(htmlOutputFormatted);
    if (prependSelector) {
      prependSelector.removeChild(overlayContainer);
    } else {
      document.body.removeChild(overlayContainer);
    }
  };
}

(window as any)["htmlEditButton"] = htmlEditButton;
export default htmlEditButton;
export { htmlEditButton };
