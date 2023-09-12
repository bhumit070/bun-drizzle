//import './db/index';
import { Elysia } from 'elysia';
import { initRoutes } from './modules';
import { swagger } from '@elysiajs/swagger';

export const server = new Elysia().use(
    swagger({
        documentation: {
            info: {
                title: 'Elysia API',
                version: '1.0.0',
                description: 'Elysia API Documentation',
            },
            servers: [
                {
                    url: 'http://localhost:{port}',
                    description: 'Local Server',
                    variables: {
                        port: {
                            default: '3000',
                        },
                    },
                },
            ],
        },
    }) as any,
);

initRoutes(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('-'.repeat(50));
    server.routes.forEach((route) => {
        if (route.path.includes('swagger') || route.path === '/*') {
            return;
        }
        console.log(`${route.method} ${route.path}`);
    });
    console.log('-'.repeat(50));

    console.log(`Server is running on port ${PORT} 🚀`);
});
