import Elysia, { t } from 'elysia';
import { login } from './auth.controller';
import { LoginValidationSchema } from './auth.validator';

export function InitV1AuthRoutes(server: Elysia<'/api/v1'>) {
    server.group('/auth', (app) => {
        app.post('/login', login, {
            body: LoginValidationSchema,
        });
        return app;
    });
}
