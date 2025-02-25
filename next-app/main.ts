import { sendSms } from "./functions/sendSms";
import { fetchBinCollectionSchedule } from "./functions/fetchBinCollectionSchedule";
import { constructMessage } from "./functions/constructMessage";
import { getPhoneNumbers } from "../db/queries/users/getPhoneNumbers";
import { postBinCollectionDetailsToDiscordBinChannel } from "./functions/discord/postBinCollectionDetailsToDiscordBinChannel";

async function main() {
  const binCollectionDetails = await fetchBinCollectionSchedule();

  if (!binCollectionDetails) {
    return;
  }

  await postBinCollectionDetailsToDiscordBinChannel(binCollectionDetails);

  const phoneNumbers: string[] = await getPhoneNumbers();
  for (const phoneNumber of phoneNumbers) {
    await sendSms({
      to: phoneNumber,
      message: constructMessage(binCollectionDetails),
    });
  }
  return;
}

main();
