import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
const configDatabase = {
    connectionString: process.env.DATABASE_URL
};

// if (process.env.MODE === "PROD") {
//     configDatabase.connectionString.
//     configDatabase.ssl = {
//         rejectUnauthorized: false
//     }
// }


export const connection = new Pool(configDatabase);
