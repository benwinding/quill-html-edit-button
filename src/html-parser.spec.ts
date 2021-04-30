import {
  ConvertMultipleSpacesToSingle,
  FixTagSpaceOpenTag,
  FixTagSpaceCloseTag,
  PreserveNewlinesBr,
  PreserveNewlinesPTags,
} from "./html-parser";

describe("html parser multiple spaces converted to single", () => {
  test("space on right of tag", () => {
    expect(ConvertMultipleSpacesToSingle("<a>OKAY</a>    ")).toBe(
      "<a>OKAY</a>"
    );
  });
  test("new lines on right", () => {
    expect(
      ConvertMultipleSpacesToSingle(`<a>OKAY</a>   
    `)
    ).toBe("<a>OKAY</a>");
  });
  test("<a> spaces between", () => {
    expect(ConvertMultipleSpacesToSingle("<a>11</a>    <a>22</a>")).toBe(
      "<a>11</a> <a>22</a>"
    );
  });
});

describe("html parser convert br tags", () => {
  test("<br> is converted to <p> </p>", () => {
    expect(PreserveNewlinesBr("<br>")).toBe("<p> </p>");
  });
  test("<br/> is converted to <p> </p>", () => {
    expect(PreserveNewlinesBr("<br/>")).toBe("<p> </p>");
  });
  test("<br /> is converted to <p> </p>", () => {
    expect(PreserveNewlinesBr("<br />")).toBe("<p> </p>");
  });
});

describe("html parser convert p tags", () => {
  test("<p></p> is converted to <p> </p>", () => {
    expect(PreserveNewlinesPTags("<p></p>")).toBe("<p> </p>");
  });
});

describe("html parser spacing around open tags", () => {
  test("<> space right of > stripped", () => {
    expect(FixTagSpaceOpenTag("<a> test")).toBe("<a>test");
  });
  test("<> spaces between left NOT stripped", () => {
    expect(FixTagSpaceOpenTag(" <a>")).toBe(" <a>");
  });
});

describe("html parser spacing around close tags", () => {
  test("<> space left of < stripped", () => {
    expect(FixTagSpaceCloseTag("test </a> ")).toBe("test</a> ");
  });
});
