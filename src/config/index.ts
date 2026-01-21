
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });
type EnvVariables = {
  node_env: "development" | "production" | "test";
  PORT: number;
  MONGODB_URI: string;
  SUPERADMIN_EMAIL: string;
  SUPERADMIN_PASSWORD: string;
  JWT_ACCESS_TOKEN: string;
  JWT_REFRESH_TOKEN: string;
};
export const envVariables: EnvVariables = {
    node_env: process.env.NODE_ENV as "development" | "production" | "test",
    PORT: Number(process.env.PORT) || 3000,
    MONGODB_URI: process.env.MONGODB_URI!,
    SUPERADMIN_PASSWORD: process.env.SUPERADMIN_PASSWORD!,
    SUPERADMIN_EMAIL: process.env.SUPERADMIN_EMAIL!,
    JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN!,
    JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN!,
} ;
