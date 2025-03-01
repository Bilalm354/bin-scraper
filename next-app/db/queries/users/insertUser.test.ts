import { env } from "@/env";
import { insertUser } from "./insertUser";

describe.skip("insertUser", () => {
  it("inserts user", async () => {
    await insertUser({
      fullName: "full name",
      phone: env.PHONE_NUMBER,
      emailAddress: "fake@email.com",
      houseNumber: 1,
      isActive: false,
      postcode: env.POSTCODE,
    });
  });
});
