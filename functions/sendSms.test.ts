import { envSchema } from "../envSchema";
import { sendSms } from "./sendSms";
import dotenv from "dotenv";

dotenv.config();

const env = envSchema.parse(process.env);

describe("sendSms", () => {
  // Skipped because I do not want to waste texts
  it.skip("sends an sms to me", async () => {
    const data = await sendSms({
      from: "Which Bin",
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
