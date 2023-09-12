import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: 'postgres://bhumit070:bhumit070@localhost:5432/bun_demo',
});

export const db = drizzle(pool);
