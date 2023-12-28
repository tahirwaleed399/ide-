import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as dotenv from 'dotenv';
import * as schema from './schema';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

dotenv.config({ path: '.env' });

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString)
const db = drizzle(client , {schema});

export {db};