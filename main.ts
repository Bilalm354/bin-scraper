import { sendSms } from "./functions/sendSms";
import { postToDiscord } from "./functions/postToDiscord";
import { fetchBinCollectionSchedule } from "./functions/fetchBinCollectionSchedule";
import { constructMessage } from "./functions/constructMessage";
import { getPhoneNumbers } from "./db/queries/users/getPhoneNumbers";
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

  const phoneNumbers: string[] = await getPhoneNumbers();
  for (const phoneNumber of phoneNumbers) {
    await sendSms({
      to: phoneNumber,
      message: constructMessage(binCollectionDetails),
    });
  }
}

main();
