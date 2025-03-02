import { z } from "zod";

// Define Zod schema for validation
export const envSchema = z.object({
  DISCORD_TOKEN: z.string().nonempty("DISCORD_TOKEN is required"),
  CHANNEL_ID: z.string().nonempty("CHANNEL_ID is required"),
  HOUSE_NUMBER: z.string().nonempty("HOUSE_NUMBER is required"),
  POSTCODE: z.string().nonempty("POSTCODE is required"),
  VOODOO_SMS_API_KEY: z.string().nonempty(),
  DATABASE_URL: z.string(),
  DISCORD_NEW_SIGN_UP_CHANNEL_ID: z.string(),
  PHONE_NUMBER: z.string().optional(),
});
