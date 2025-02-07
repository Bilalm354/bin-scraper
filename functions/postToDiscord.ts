import { EmbedBuilder, Client, GatewayIntentBits } from "discord.js";
import { env } from "../env";
import { BinCollectionDetails } from "../main";

// Function to send a message to Discord as an embed
export async function postToDiscord(
  binCollectionDetails: BinCollectionDetails[]
) {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });
  const { CHANNEL_ID, DISCORD_TOKEN } = env;

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .addFields(binCollectionDetails)
    .setURL("https://www.boston.gov.uk/article/27449/Your-Waste-Collections");

  console.log("Formatted embed for Discord:\n", embed);

  client.once("ready", async () => {
    try {
      console.log("Bot is online!");
      const channel = (await client.channels.fetch(CHANNEL_ID)) as any;
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
