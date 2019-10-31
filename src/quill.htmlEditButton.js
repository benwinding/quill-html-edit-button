class htmlEditButton {
  constructor(quill, options) {
    this.quill = quill;
    this.options = options;
    this.range = null;
    this.debug = options.debug == null || options.debug == true;

    warnAboutOptions(options);

    var toolbar = this.quill.getModule("toolbar");
    toolbar.addHandler("image", this.selectLocalImage.bind(this));
  }

  selectLocalImage() {
    this.range = this.quill.getSelection();
    this.fileHolder = document.createElement("input");
    this.fileHolder.setAttribute("type", "file");
    this.fileHolder.setAttribute("accept", "image/*");
    this.fileHolder.setAttribute("style", "visibility:hidden");

    this.fileHolder.onchange = this.fileChanged.bind(this);

    document.body.appendChild(this.fileHolder);

    this.fileHolder.click();

    window.requestAnimationFrame(() => {
      document.body.removeChild(this.fileHolder);
    });
  }

  fileChanged() {
    const file = this.fileHolder.files[0];
    if (!file) {
      return;
    }

    const fileReader = new FileReader();

    fileReader.addEventListener(
      "load",
      async () => {
        const base64ImageSrc = fileReader.result;
        const base64ImageSrcNew = await downscaleImage(
          base64ImageSrc,
          this.options.maxWidth,
          this.options.imageType,
          this.options.quality,
          this.debug
        );
        this.insertToEditor(base64ImageSrcNew);
      },
      false
    );
    fileReader.readAsDataURL(file);
  }

  insertToEditor(url) {
    const range = this.range;
    // Insert the compressed image
    this.logFileSize(url);
    this.quill.insertEmbed(range.index, "image", `${url}`);
    // Move cursor to next position
    range.index++;
    this.quill.setSelection(range, "api");
  }

  logFileSize(dataUrl) {
    const head = "data:image/png;base64,";
    const fileSizeBytes = Math.round(((dataUrl.length - head.length) * 3) / 4);
    const fileSizeKiloBytes = (fileSizeBytes / 1024).toFixed(0);
    if (this.debug) {
      console.log(
        "quill.htmlEditButton: estimated img size: " + fileSizeKiloBytes + " kb"
      );
    }
  }
}

export default htmlEditButton;
