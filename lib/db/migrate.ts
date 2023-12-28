import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

require("dotenv").config({path : '.env'});
const connectionString = process.env.DATABASE_URL!
const client = postgres(connectionString , {max:1})
const db = drizzle(client);
console.log(connectionString)

export const migrateDB = async () => {
  console.log("migrating db");
  await migrate(db, { migrationsFolder: "migrations" });
  console.log("db migrated");
  process.exit(1);
};

migrateDB().catch((err)=>{
    console.log(db)
    console.log(err)
    console.log('😣 errror in db migrations')
})