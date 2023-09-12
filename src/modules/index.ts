import Elysia from 'elysia';
import { initV1Routes } from './v1/v1.routes';

export function initRoutes(server: Elysia) {
    // Api Mapper
    server.group('/api', (app) => {
        initV1Routes(app);
        return app;
    });

    // 404 Routes
    server.all('*', (context) => {
        context.set.status = 404;
        context.body = {
            message: 'Route Not Found',
        };
        return context.body;
    });
}
