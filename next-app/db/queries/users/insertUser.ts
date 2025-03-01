import { db } from "../../index";
import { usersTable } from "../../schema";

export async function insertUser({
  fullName,
  phone,
  emailAddress,
  houseNumber,
  isActive,
  postcode,
}: typeof usersTable.$inferInsert) {
  await db.insert(usersTable).values({
    fullName,
    phone,
    emailAddress,
    houseNumber,
    isActive,
    postcode,
  });
}
