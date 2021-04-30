export class QuillHtmlLogger {
  private debug = false;

  setDebug(debug: boolean) {
    this.debug = debug;
  }  

  prefixString() {
    return `</> quill-html-edit-button: `;
  }
  get log() {
    if (!this.debug) {
      return (...args: any) => {};
    }
    const boundLogFn = console.log.bind(console, this.prefixString());
    return boundLogFn;
  }
}

