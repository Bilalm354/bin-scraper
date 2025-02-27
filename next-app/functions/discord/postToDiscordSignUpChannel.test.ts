import { postToDiscordSignUpChannel } from "./postToDiscordSignUpChannel";

describe.skip("postToDiscordSignUpChannel", () => {
  it("sends it", async () => {
    await postToDiscordSignUpChannel({
      name: "test",
      email: "test@test.com",
      address: "test address",
      phone: "testphone",
      postcode: "test postcode",
    });
  });
});
