import { resolve } from "node:path";
import { config } from "dotenv";

const result = config({
  path: resolve(".env.development")
});

console.log("DOTENV RESULT:", result);
console.log("DB_URI AFTER DOTENV:", process.env.DB_URI);

export const PORT = parseInt(process.env.PORT ?? "9000");
export const DB_URI = process.env.DB_URI;