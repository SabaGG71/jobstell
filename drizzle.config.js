import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://jobstell-data_owner:SGb5QFiouy4x@ep-wandering-queen-a2w7rhls.eu-central-1.aws.neon.tech/jobstell-data?sslmode=require",
  },
});
