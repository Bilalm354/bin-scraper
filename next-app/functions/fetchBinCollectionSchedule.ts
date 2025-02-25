import { chromium } from "@playwright/test";
import { env } from "../env";
import { BinCollectionDetails } from "@/BinCollectionDetails";

export async function fetchBinCollectionSchedule() {
  const { HOUSE_NUMBER, POSTCODE } = env;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(
      "https://www.boston.gov.uk/article/27449/Your-Waste-Collections",
      { timeout: 60000 }
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
    const binCollectionDetails: BinCollectionDetails[] = [];

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
        binCollectionDetails.push({
          name: `${binType.trim()}`,
          value: `${date || "No date available"}`,
          inline: false,
        });
      }
    }

    return binCollectionDetails;
  } catch (error) {
    console.error("Error fetching bin collection schedule:", error);
    throw error;
  } finally {
    await browser.close();
  }
}
