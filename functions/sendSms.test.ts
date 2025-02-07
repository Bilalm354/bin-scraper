import { env } from "./../env";
import { sendSms } from "./sendSms";
import dotenv from "dotenv";

dotenv.config();

describe("sendSms", () => {
  // Skipped because I do not want to waste texts
  it.skip("sends an sms to me", async () => {
    const data = await sendSms({
      to: env.PHONE_NUMBER!,
      message: "Your mum",
    });

    expect(data).toEqual({
      count: expect.any(Number),
      originator: "Which Bin",
      body: expect.any(String),
      scheduledDateTime: null,
      credits: 1,
      balance: 22,
      messages: [[Object]],
    });
  });
});
