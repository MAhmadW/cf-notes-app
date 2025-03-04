import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export const connectDB = (env: D1Database) => drizzle(env, { schema })