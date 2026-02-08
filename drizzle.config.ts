import { defineConfig } from "drizzle-kit";

const dbURl =
  process.env.DATABASE_URL ||
  "postgresql://postgres:password@localhost:5432/lensdb";
export default defineConfig({
  dialect: "postgresql",
  out: "./src/lib/db/migrations",
  schema: "./src/lib/db/schemas.ts",

  dbCredentials: {
    url: dbURl,
    ssl: true,
  },
  verbose: true,
  strict: true,
});
