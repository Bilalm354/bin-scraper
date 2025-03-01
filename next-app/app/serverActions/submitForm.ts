"use server";

import { formSchema } from "@/components/AddressForm";
import { insertUser } from "@/db/queries/users/insertUser";
import { postToDiscordSignUpChannel } from "@/functions/discord/postToDiscordSignUpChannel";
import { z } from "zod";

export async function submitForm({
  name,
  email,
  phone,
  houseNumber,
  postcode,
}: z.infer<typeof formSchema>) {
  console.log({ name, email, phone, houseNumber });

  await insertUser({
    fullName: name,
    phone,
    houseNumber: Number(houseNumber),
    postcode,
  });

  await postToDiscordSignUpChannel({
    name,
    email,
    phone,
    houseNumber: Number(houseNumber),
    postcode,
  });
}
