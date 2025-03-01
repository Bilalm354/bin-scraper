import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

// on prod database url is the prod url but on local databaseurl is the local database url so this file is for pushing db changes to prod

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL_PROD!,
  },
});
