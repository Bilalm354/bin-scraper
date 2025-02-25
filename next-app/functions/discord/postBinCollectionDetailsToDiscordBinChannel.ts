"use server";

import { EmbedBuilder } from "discord.js";
import { postDiscordEmbedToChannel } from "./postDiscordEmbedToChannel";
import { BinCollectionDetails } from "@/BinCollectionDetails";
import { env } from "@/env";

// Function to send a message to Discord as an embed
export async function postBinCollectionDetailsToDiscordBinChannel(
  binCollectionDetails: BinCollectionDetails[]
) {
  const { CHANNEL_ID } = env;

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .addFields(binCollectionDetails)
    .setURL("https://www.boston.gov.uk/article/27449/Your-Waste-Collections");

  console.log("Formatted embed for Discord:\n", embed);

  await postDiscordEmbedToChannel({ channelId: CHANNEL_ID, embed });
}
