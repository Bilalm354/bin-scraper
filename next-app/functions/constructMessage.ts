import { BinCollectionDetails } from "@/BinCollectionDetails";

export function constructMessage(
  binCollectionDetailsArray: BinCollectionDetails[]
) {
  let message = "";
  for (const bin of binCollectionDetailsArray) {
    message = message += bin.name + ": " + bin.value + "\n";
  }
  return message;
}
