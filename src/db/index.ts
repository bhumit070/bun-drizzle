import { DefaultLogger, LogWriter } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: 'postgres://bhumit070:bhumit070@localhost:5432/bun_demo',
});

const writer: LogWriter = {
    write(message) {
        const [_, queryWithParams, params] = message.split(':');
        let [query] = queryWithParams.split('--');

        const json = JSON.parse(params.trim());

        const start = 1;
        const end = json.length;

        for (let i = start; i <= end; i += 1) {
            const param = json[i - 1];
            query = query.replaceAll(`$${i}`, `${param}`);
        }
        console.log('-'.repeat(50));
        console.log(query.trim());
        console.log('-'.repeat(50));
    },
};
const dbLogger =
    process.env.NODE_ENV === 'production'
        ? undefined
        : new DefaultLogger({
              writer: writer,
          });

export const db = drizzle(pool, {
    logger: dbLogger,
});
