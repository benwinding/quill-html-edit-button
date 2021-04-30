/* 
  Formats the the output from the popup so that the quill editor can properly display it
*/

export function OutputHTMLParser(inputHtmlFromQuillPopup: string): string {
  const parsedHtmlString = inputHtmlFromQuillPopup
    .replace(/\s+/g, " ")                            // convert multiple spaces to a single space. This is how HTML treats them
    .replace(/(<[^\/<>]+>)\s+/g, "$1")               // remove spaces after the start of a new tag
    .replace(/>\s+|\s+</g, (m) => m.trim())          // remove spaces between starting and ending tags
    .replace(/<\/(p|ol|ul)>\s/g, "</$1>")            // remove spaces after the end of lists and paragraphs, they tend to break quill
    .replace(/\s<(p|ol|ul)>/g, "<$1>")               // remove spaces before the start of lists and paragraphs, they tend to break quill
    .replace(/<\/li>\s<li>/g, "</li><li>")           // remove spaces between list items, they tend to break quill
    .replace(/\s<\//g, "</")                         // remove spaces before the end of tags
    .replace(/(<[^\/<>]+>)\s(<[^\/<>]+>)/g, "$1$2")  // remove space between multiple starting tags
    .trim();
  return parsedHtmlString;
}