"use server";

import { EmbedBuilder } from "discord.js";
import { env } from "../../env";
import { postDiscordEmbedToChannel } from "./postDiscordEmbedToChannel";

export async function postToDiscordSignUpChannel({
  name,
  email,
  phone,
  address,
}: {
  name: string;
  email: string;
  phone: string;
  address: string;
}) {
  const { DISCORD_NEW_SIGN_UP_CHANNEL_ID } = env;

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("New Bin Day Sign-Up")
    .addFields(
      { name: "Name", value: name, inline: true },
      { name: "Email", value: email, inline: true },
      { name: "Phone", value: phone, inline: true },
      { name: "Address", value: address, inline: false }
    );

  await postDiscordEmbedToChannel({
    channelId: DISCORD_NEW_SIGN_UP_CHANNEL_ID,
    embed,
  });
}
