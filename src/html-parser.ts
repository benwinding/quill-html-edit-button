/* 
  Formats the the output from the popup so that the quill editor can properly display it
*/

export function OutputHTMLParser(inputHtmlFromQuillPopup: string): string {
  return Compose(
    [
      ConvertMultipleSpacesToSingle,
      FixTagSpaceOpenTag,
      FixTagSpaceCloseTag,
      PreserveNewlinesBr,
      PreserveNewlinesPTags,
    ],
    inputHtmlFromQuillPopup
  );
}

export function ConvertMultipleSpacesToSingle(input: string): string {
  return input.replace(/\s+/g, " ").trim();
}

export function PreserveNewlinesBr(input: string): string {
  return input.replace(/<br([\s]*[\/]?>)/g, "<p> </p>");
}

export function PreserveNewlinesPTags(input: string): string {
  return input.replace(/<p><\/p>/g, "<p> </p>");
}

export function FixTagSpaceOpenTag(input: string): string {
  // Open tag remove space on inside
  return input.replace(/(<(?!\/)[\w=\."'\s]*>) /g, "$1"); 
}

export function FixTagSpaceCloseTag(input: string): string {
  // Close tag remove space on inside
  return input.replace(/ (<\/[\w]+>)/g, "$1"); 
}

export function Compose<T>(functions: Array<(input: T) => T>, input: T): T {
  return functions.reduce((acc, cur) => cur(acc), input);
}
