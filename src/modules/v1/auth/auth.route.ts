import Elysia, { t } from 'elysia';
import { login, signup } from './auth.controller';
import {
    LoginValidationSchema,
    SignUpValidationSchema,
} from './auth.validator';

export function InitV1AuthRoutes(server: Elysia<'/api/v1'>) {
    server.group('/auth', (app) => {
        app.post('/login', login, {
            body: LoginValidationSchema,
        });
        app.post('/signup', signup, {
            body: SignUpValidationSchema,
        });
        return app;
    });
}
