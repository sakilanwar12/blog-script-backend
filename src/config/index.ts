
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const envVariables = {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI || "",
} as const;
