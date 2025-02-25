import dotenv from "dotenv";
import { envSchema } from "./envSchema";
dotenv.config();

export const env = envSchema.parse(process.env);
