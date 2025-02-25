import { constructMessage } from "./constructMessage";

describe("constructMessage", () => {
  it("works with valid details", () => {
    expect(
  constructMessage([
  {
    inline: false,
    name: "Blue Recycling Bin",
    value: "day xth Month"
  },
  {
    inline: false,
    name: "Green Refuse Bin",
    value: "day xth Month"
  },
  {
    inline: false,
    name: "Purple/Purple-lidded Paper/Card Bin",
    value: "day xth Month"
  }]
  )
).toMatchInlineSnapshot(`
"Blue Recycling Bin: day xth Month
Green Refuse Bin: day xth Month
Purple/Purple-lidded Paper/Card Bin: day xth Month
"
`);
  });
});
