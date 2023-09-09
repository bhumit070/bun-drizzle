import type { Config } from 'drizzle-kit';

export default {
    schema: './src/db/schema',
    driver: 'pg',
    dbCredentials: {
        connectionString:
            'postgres://bhumit070:bhumit070@localhost:5432/bun_demo',
    },
    out: './migrations',
} satisfies Config;
