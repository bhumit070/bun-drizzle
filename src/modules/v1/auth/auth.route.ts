import Elysia, { t } from 'elysia';
import { login, signup } from './auth.controller';
import {
    LoginValidationSchema,
    SignUpValidationSchema,
} from './auth.validator';
import { server } from '../../..';

export function InitV1AuthRoutes(elysiaServer: typeof server) {
    elysiaServer.group('/auth', (app) => {
        app.post('/login', login, {
            body: LoginValidationSchema,
        });
        app.post('/signup', signup, {
            body: SignUpValidationSchema,
        });
        return app;
    });
}
