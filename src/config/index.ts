
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });
type EnvVariables = {
  node_env: "development" | "production" | "test";
  port: number;
  MONGODB_URI: string;
  SUPERADMIN_EMAIL: string;
  SUPERADMIN_PASSWORD: string;
  JWT_SECRET: string;
};
export const envVariables: EnvVariables = {
    node_env: process.env.NODE_ENV as "development" | "production" | "test",
    port: Number(process.env.PORT) || 3000,
    MONGODB_URI: process.env.MONGODB_URI!,
    SUPERADMIN_PASSWORD: process.env.SUPERADMIN_PASSWORD!,
    SUPERADMIN_EMAIL: process.env.SUPERADMIN_EMAIL!,
    JWT_SECRET: process.env.JWT_SECRET!,
} ;
