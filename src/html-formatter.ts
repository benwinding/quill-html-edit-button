import { QuillHtmlLogger } from './logger';

// Adapted FROM jsfiddle here: https://jsfiddle.net/buksy/rxucg1gd/
export function FormatHTMLStringIndentation(code: string, logger: QuillHtmlLogger) {
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
  logger.log("formatHTML", {
    before: code,
    after: result,
  });
  return result;
}

