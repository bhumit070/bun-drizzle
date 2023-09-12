import { InitV1AuthRoutes } from './auth/auth.route';
import { server } from '../..';

export function initV1Routes(elysiaServer: typeof server) {
    elysiaServer.group('/v1', (app) => {
        InitV1AuthRoutes(app as any);
        return app;
    });
}
