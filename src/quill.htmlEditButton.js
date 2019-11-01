class htmlEditButton {
  constructor(quill, options) {
    // Add button to all quill toolbar instances
    document.querySelectorAll(".ql-toolbar").forEach(toolbarEl => {
      const buttonContainer = document.createElement("span");
      buttonContainer.setAttribute("class", "ql-formats");
      const button = document.createElement("button");
      button.innerHTML = "<strong>HTML</strong>";
      button.onclick = function() {
        launchPopupEditor(quill);
      };
      buttonContainer.appendChild(button);
      toolbarEl.appendChild(buttonContainer);
    });
  }
}

function launchPopupEditor(quill) {
  const htmlFromEditor = quill.container.querySelector(".ql-editor").innerHTML;
  const popupContainer = document.createElement("div");
  const overlayContainer = document.createElement("div");
  overlayContainer.setAttribute(
    "style",
    "background: #0000007d; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 9999;"
  );
  popupContainer.setAttribute(
    "style",
    "background: #ddd; position: absolute; top: 5%; left: 5%; right: 5%; bottom: 5%; border-radius: 10px;"
  );
  const title = document.createElement("i");
  title.setAttribute("style", "margin: 0; display: block;");
  title.innerText =
    'Edit HTML here, when you click "OK" the quill editor\'s contents will be replaced';
  const textContainer = document.createElement("div");
  textContainer.appendChild(title);
  textContainer.setAttribute(
    "style",
    "position: relative; width: calc(100% - 40px); height: calc(100% - 40px); padding: 20px;"
  );
  const textArea = document.createElement("textarea");
  textArea.setAttribute(
    "style",
    "position: absolute; width: calc(100% - 45px); height: calc(100% - 116px);"
  );
  textArea.innerText = htmlFromEditor;
  const buttonCancel = document.createElement("button");
  buttonCancel.innerHTML = "Cancel";
  buttonCancel.setAttribute("style", "margin-right: 20px;");
  const buttonOk = document.createElement("button");
  buttonOk.innerHTML = "Ok";
  const buttonGroup = document.createElement("div");
  buttonGroup.setAttribute(
    "style",
    "position: absolute; bottom: 20px; transform: scale(1.5); left: calc(50% - 60px)"
  );
  buttonGroup.appendChild(buttonCancel);
  buttonGroup.appendChild(buttonOk);
  textContainer.appendChild(textArea);
  textContainer.appendChild(buttonGroup);
  popupContainer.appendChild(textContainer);
  overlayContainer.appendChild(popupContainer);
  document.body.appendChild(overlayContainer);

  buttonCancel.onclick = function() {
    document.body.removeChild(overlayContainer);
  };
  overlayContainer.onclick = buttonCancel.onclick;
  popupContainer.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
  };
  buttonOk.onclick = function() {
    quill.container.querySelector(".ql-editor").innerHTML = textArea.value;
    document.body.removeChild(overlayContainer);
  };
}

window.htmlEditButton = htmlEditButton;
export default htmlEditButton;
export { htmlEditButton };
