import { logger } from './helper';
import './db/index';
Bun.serve({
    port: 3000,
    async fetch(request, server) {
        logger();
        return new Response('Hello World!', {
            status: 200,
        });
    },
});
console.log('Server started at http://localhost:3000');
