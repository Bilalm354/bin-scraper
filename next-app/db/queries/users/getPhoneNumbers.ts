import { client, db } from "../../index";
import { usersTable } from "../../schema";
import { eq, and } from "drizzle-orm";

export async function getPhoneNumbersWherePostcodeBoston() {
  const activeUsersInPE219QY = await db
    .select({ phone: usersTable.phone })
    .from(usersTable)
    .where(
      and(eq(usersTable.isActive, true), eq(usersTable.postcode, "PE219QY"))
    )
    .finally(() => client.end());
  const phoneNumbers = activeUsersInPE219QY.map((user) => user.phone);
  return phoneNumbers;
}
