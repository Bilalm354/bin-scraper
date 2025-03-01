"use server";

import { formSchema } from "@/components/SignUpForm";
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
  await insertUser({
    fullName: name,
    phone,
    postcode,
    houseNumber: isNaN(Number(houseNumber)) ? 1 : Number(houseNumber),
  });

  await postToDiscordSignUpChannel({
    name,
    email,
    phone,
    houseNumber,
    postcode,
  });
}
