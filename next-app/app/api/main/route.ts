import { main } from "@/main";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: Request) {
  try {
    await main();
  } catch (error) {
    throw error;
  } finally {
    return new Response("Main Cron Ran");
  }
}
