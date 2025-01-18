import { fetchBinCollectionScheduleAndSendDiscordMessage } from "../../main";

export const handler = async () => {
  console.log("lambda function execution started");
  await fetchBinCollectionScheduleAndSendDiscordMessage();
  console.log("Lambda function executed successfully!");
};
