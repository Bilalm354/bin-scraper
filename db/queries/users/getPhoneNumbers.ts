import { db } from "../../index";
import { usersTable } from "../../schema";

export async function getPhoneNumbers() {
  return (await db.select({ phone: usersTable.phone }).from(usersTable)).map(
    (user) => user.phone
  );
}
