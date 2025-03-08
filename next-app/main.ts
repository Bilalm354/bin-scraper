import { sendSms } from "./functions/sendSms";
import { fetchBostonBinCollectionSchedule } from "./functions/fetchBostonBinCollectionSchedule";
import { constructMessage } from "./functions/constructMessage";
import { getPhoneNumbersWherePostcodeBoston as getPhoneNumbersWherePostcodeBostonAndUserIsActive } from "./db/queries/users/getPhoneNumbers";
import { postBinCollectionDetailsToDiscordBinChannel as postBinCollectionDetailsToBostonDiscordBinChannel } from "./functions/discord/postBinCollectionDetailsToDiscordBinChannel";
import { client } from "./db";

export async function main() {
  const binCollectionDetails = await fetchBostonBinCollectionSchedule();

  if (!binCollectionDetails) {
    return;
  }

  await postBinCollectionDetailsToBostonDiscordBinChannel(binCollectionDetails);

  const phoneNumbers: string[] =
    await getPhoneNumbersWherePostcodeBostonAndUserIsActive();
  for (const phoneNumber of phoneNumbers) {
    await sendSms({
      to: phoneNumber,
      message: constructMessage(binCollectionDetails),
    });
  }
  if (client) {
    client.end();
  }
  return;
}

main();
