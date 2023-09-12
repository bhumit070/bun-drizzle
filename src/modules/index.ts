import { initV1Routes } from './v1/v1.routes';
import { server } from '../index';

export function initRoutes(elysiaServer: typeof server) {
    // Api Mapper
    elysiaServer.group('/api', (app) => {
        initV1Routes(app as any);
        return app;
    });

    // 404 Routes
    elysiaServer.all('*', (context) => {
        context.set.status = 404;
        context.body = {
            message: 'Route Not Found',
        };
        return context.body;
    });
}
