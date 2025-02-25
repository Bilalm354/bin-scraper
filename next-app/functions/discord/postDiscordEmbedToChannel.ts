"use server";

import { Client, EmbedBuilder, GatewayIntentBits } from "discord.js";
import { env } from "../../env";

export async function postDiscordEmbedToChannel({
  channelId,
  embed,
}: {
  channelId: string;
  embed: EmbedBuilder;
}) {
  const { DISCORD_TOKEN } = env;
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });
  client.once("ready", async () => {
    try {
      console.log("Bot is online!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const channel = (await client.channels.fetch(channelId)) as any;
      if (channel && channel.isTextBased()) {
        await channel.send({ embeds: [embed] });
        console.log("Embed sent to Discord.");
      } else {
        console.error("Channel not found or not text-based.");
      }
    } catch (error) {
      console.error("Error sending embed to Discord:", error);
    } finally {
      await client.destroy(); // Stop the bot after sending the embed
    }
  });

  await client.login(DISCORD_TOKEN);
}
