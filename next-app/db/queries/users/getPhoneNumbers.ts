import { db } from "../../index";
import { usersTable } from "../../schema";
import { eq, and } from "drizzle-orm";

export async function getPhoneNumbersWherePostcodeBoston() {
  return (
    await db
      .select({ phone: usersTable.phone })
      .from(usersTable)
      .where(
        and(eq(usersTable.isActive, true), eq(usersTable.postcode, "PE219QY"))
      )
  ).map((user) => user.phone);
}
