import { sendSms } from "./functions/sendSms";
import { env } from "./env";
import { postToDiscord } from "./functions/postToDiscord";
import { fetchBinCollectionSchedule } from "./functions/fetchBinCollectionSchedule";
import { constructMessage } from "./functions/constructMessage";
export interface BinCollectionDetails {
  name: string; // bin type
  value: string; // date
  inline: boolean;
}
[];

async function main() {
  const binCollectionDetails = await fetchBinCollectionSchedule();

  if (!binCollectionDetails) {
    return;
  }

  await postToDiscord(binCollectionDetails);

  const phoneNumbers = [env.PHONE_NUMBER];
  for (const phoneNumber of phoneNumbers) {
    if (phoneNumber) {
      await sendSms({
        to: phoneNumber,
        message: constructMessage(binCollectionDetails),
      });
    }
  }
}

main();
