import { chromium } from "playwright";
import { Client, GatewayIntentBits } from "discord.js";
import { z } from "zod";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Define Zod schema for validation
const envSchema = z.object({
  DISCORD_TOKEN: z.string().nonempty("DISCORD_TOKEN is required"),
  CHANNEL_ID: z.string().nonempty("CHANNEL_ID is required"),
  HOUSE_NUMBER: z.string().nonempty("HOUSE_NUMBER is required"),
  POSTCODE: z.string().nonempty("POSTCODE is required"),
});

// Parse and validate environment variables
const env = envSchema.parse(process.env);
const { DISCORD_TOKEN, CHANNEL_ID, HOUSE_NUMBER, POSTCODE } = env;

// Function to send a message to Discord
async function postToDiscord(message: string) {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.once("ready", async () => {
    try {
      console.log("Bot is online!");
      const channel = (await client.channels.fetch(CHANNEL_ID)) as any;
      if (channel && channel.isTextBased()) {
        await channel.send(message);
        console.log("Message sent to Discord:", message);
      } else {
        console.error("Channel not found or not text-based.");
      }
    } catch (error) {
      console.error("Error sending message to Discord:", error);
    } finally {
      await client.destroy(); // Stop the bot after sending the message
    }
  });

  await client.login(DISCORD_TOKEN);
}

async function fetchBinCollectionSchedule() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(
      "https://www.boston.gov.uk/article/27449/Your-Waste-Collections"
    );
    await page.getByLabel("Property name or number (").click();
    await page.getByLabel("Property name or number (").fill(HOUSE_NUMBER);
    await page.getByLabel("Property name or number (").press("Tab");
    await page.getByLabel("Postcode:*").fill(POSTCODE);
    await page.getByLabel("Postcode:*").press("Tab");
    await page.getByRole("button", { name: "Next " }).press("Enter");
    await page.getByRole("button", { name: "Next " }).click();

    // Wait for the elements containing bin collection info
    const binElements = await page.locator(
      "#BBCWASTECOLLECTIONS_SERVICE_JOBSDISPLAY .grid__cell .item__content"
    );

    const binCount = await binElements.count();
    const binCollectionDetails: string[] = [];

    for (let i = 0; i < binCount; i++) {
      const binType = await binElements
        .nth(i)
        .locator(".item__title a")
        .textContent();
      const binNextDate = await binElements
        .nth(i)
        .locator('div:has-text("Next:")')
        .textContent();

      if (binType && binNextDate) {
        // Extract the bin type and date properly
        const date = binNextDate.split("Next:")[1]?.trim(); // Extract the date part only
        binCollectionDetails.push(
          `${binType.trim()}: ${date || "No date available"}`
        );
      }
    }

    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const todayDateFormatted = today
      .toLocaleDateString("en-GB", options)
      .replace(",", "");

    // Create the message for Discord with improved formatting
    const message =
      `**Next Bin Collection Dates as of ${todayDateFormatted}**:\n\n` +
      binCollectionDetails
        .map((detail) => `${detail.split(":")[0]}: ${detail.split(":")[1]}`)
        .join("\n") +
      `\n\n<https://www.boston.gov.uk/article/27449/Your-Waste-Collections>\n\n`;

    console.log("Formatted message for Discord:\n", message);

    // Send the formatted message to Discord
    await postToDiscord(message);
  } catch (error) {
    console.error("Error fetching bin collection schedule:", error);
  } finally {
    await browser.close();
  }
}

// Execute the script
fetchBinCollectionSchedule();
