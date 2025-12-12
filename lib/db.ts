// src/lib/db.ts

import { Pool } from 'pg';

// 1. Get the connection string from the environment
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in environment variables.');
}

// 2. Initialize the Pool (used for connection management)
const pool = new Pool({
  connectionString: DATABASE_URL,
});

// 3. Export a query function for easy use
 const db = {
  // query function is a wrapper around the pool.query method
  async query(text: string, params: any[] = []) {
    return pool.query(text, params);
  },
  // We can also expose the client for transactions if needed later
  pool,
};
export default db;