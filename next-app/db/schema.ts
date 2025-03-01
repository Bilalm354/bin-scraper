import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  phone: varchar("phone", { length: 256 }).notNull(),
  houseNumber: integer().notNull().default(1),
  postcode: varchar("postcode", { length: 256 }).notNull().default("TODO"),
  emailAddress: text("email_address"),
  isActive: boolean("is_active").default(false),
});
