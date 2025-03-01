"use server";

import { EmbedBuilder } from "discord.js";
import { env } from "../../env";
import { postDiscordEmbedToChannel } from "./postDiscordEmbedToChannel";

export async function postToDiscordSignUpChannel({
  name,
  email,
  phone,
  houseNumber,
  postcode,
}: {
  name: string;
  email: string;
  phone: string;
  houseNumber: number;
  postcode: string;
}) {
  const { DISCORD_NEW_SIGN_UP_CHANNEL_ID } = env;
  console.log("in function");

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("New Sign-Up")
    .addFields(
      { name: "Name", value: name, inline: true },
      { name: "Email", value: email, inline: true },
      { name: "Phone", value: phone, inline: true },
      { name: "House Number", value: String(houseNumber), inline: true },
      { name: "Postcode", value: postcode, inline: true }
    );
  console.log("Generated Embed");

  await postDiscordEmbedToChannel({
    channelId: DISCORD_NEW_SIGN_UP_CHANNEL_ID,
    embed,
  });
}
