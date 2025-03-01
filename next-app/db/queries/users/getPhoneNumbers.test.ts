import { getPhoneNumbersWherePostcodeBoston } from "./getPhoneNumbers";

describe.skip("getPhoneNumbers", () => {
  it("only gets numbers that are active", async () => {
    expect(await getPhoneNumbersWherePostcodeBoston()).toStrictEqual([]);
  });
});
