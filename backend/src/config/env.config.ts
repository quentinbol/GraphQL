import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("3000"),
  DB_URL: z.string(),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
});

const env = envSchema.parse(process.env);

export const config = {
  port: parseInt(env.PORT, 10),
  dbUrl: env.DB_URL,
  nodeEnv: env.NODE_ENV,
};