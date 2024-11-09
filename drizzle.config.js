export default {
  dialect: "postgresql",
  schema: "./src/utils/schema.jsx",
  out: "./drizzle",
  dbCredentials: {
   url:'postgresql://cancAIDatabase_owner:u9ULZ5YeXzNT@ep-misty-dream-a57u4ze2.us-east-2.aws.neon.tech/cancAIDatabase?sslmode=require',
        connectionString:'postgresql://cancAIDatabase_owner:u9ULZ5YeXzNT@ep-misty-dream-a57u4ze2.us-east-2.aws.neon.tech/cancAIDatabase?sslmode=require'
  },
};
