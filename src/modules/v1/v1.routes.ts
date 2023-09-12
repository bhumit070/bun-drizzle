import Elysia from 'elysia';
import { InitV1AuthRoutes } from './auth/auth.route';

export function initV1Routes(server: Elysia<'/api'>) {
    server.group('/v1', (app) => {
        InitV1AuthRoutes(app);
        return app;
    });
}
