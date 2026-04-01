import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { z } from "zod";

const envPathFromCwd = path.resolve(process.cwd(), '.env');

const envPath = [envPathFromCwd].find((candidate) =>
  fs.existsSync(candidate)
);

dotenv.config(envPath ? { path: envPath, override: true } : { override: true });

const envSchema = z.object({
  PORT: z.string().default("3000"),
  DB_URL: z.string(),
  USE_MOCK_REPOSITORY: z
    .enum(['true', 'false'])
    .default('false')
    .transform((value) => value === 'true'),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
});

const env = envSchema.parse(process.env);

export const config = {
  port: parseInt(env.PORT, 10),
  dbUrl: env.DB_URL,
  useMockRepository: env.USE_MOCK_REPOSITORY,
  nodeEnv: env.NODE_ENV,
};