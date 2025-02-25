"use server";

import { formSchema } from "@/components/AddressForm";
import { postToDiscordSignUpChannel } from "@/functions/discord/postToDiscordSignUpChannel";
import { z } from "zod";

export async function submitForm({
  name,
  email,
  phone,
  address,
}: z.infer<typeof formSchema>) {
  console.log({ name, email, phone, address });

  // Post the user's information to the Discord channel
  await postToDiscordSignUpChannel({
    name,
    email,
    phone,
    address,
  });

  // You can also handle other actions after posting to Discord (e.g., saving data, sending a confirmation message, etc.)
}
