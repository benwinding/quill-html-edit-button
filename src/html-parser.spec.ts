import { OutputHTMLParser } from "./html-parser";

describe("html parser spacing tests", () => {
  test("<a> right trim", () => {
    const res = OutputHTMLParser("<a>OKAY</a>    ");
    expect(res).toBe("<a>OKAY</a>");
  })
});
