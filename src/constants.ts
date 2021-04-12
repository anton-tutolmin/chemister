import { config } from 'dotenv';
config();


export const HASH_SALT_ROUNDS = Number.parseInt(process.env.HASH_SALT_ROUNDS);
export const JWT_SECRET = process.env.JWT_SECRET;