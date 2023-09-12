import { t } from 'elysia';

export const LoginValidationSchema = t.Object({
    username: t.String(),
    password: t.String(),
});
