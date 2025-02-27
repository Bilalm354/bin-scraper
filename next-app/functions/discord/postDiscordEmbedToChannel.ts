import { env } from "@/env";
import { EmbedBuilder, REST, Routes } from "discord.js";

export async function postDiscordEmbedToChannel({
  channelId,
  embed,
}: {
  channelId: string;
  embed: EmbedBuilder;
}) {
  const { DISCORD_TOKEN } = env;
  const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

  try {
    await rest.post(Routes.channelMessages(channelId), {
      body: { embeds: [embed] },
    });
    console.log("Embed sent via REST API.");
  } catch (error) {
    console.error("Error sending embed via REST API:", error);
  }
}
