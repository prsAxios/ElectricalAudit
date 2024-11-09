import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://cancAIDatabase_owner:u9ULZ5YeXzNT@ep-misty-dream-a57u4ze2.us-east-2.aws.neon.tech/cancAIDatabase?sslmode=require"
);
export const db = drizzle(sql, { schema });
