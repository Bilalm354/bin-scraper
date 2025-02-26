"use server";

import { formSchema } from "@/components/AddressForm";
import { postToDiscordSignUpChannel } from "@/functions/discord/postToDiscordSignUpChannel";
import { z } from "zod";

export async function submitForm({
  name,
  email,
  phone,
  address,
  postcode,
}: z.infer<typeof formSchema>) {
  console.log({ name, email, phone, address });

  await postToDiscordSignUpChannel({
    name,
    email,
    phone,
    address,
    postcode,
  });
}
