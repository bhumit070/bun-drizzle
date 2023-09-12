import { t } from 'elysia';

export const LoginValidationSchema = t.Object({
    email: t.String({
        format: 'email',
    }),
    password: t.String(),
});
export type TLoginValidationSchema = typeof LoginValidationSchema;

export const SignUpValidationSchema = t.Object({
    fullName: t.String({
        minLength: 3,
    }),
    phone: t.String({
        minLength: 10,
        maxLength: 10,
    }),
    email: t.String({
        format: 'email',
        default: '',
    }),
    password: t.String({
        minLength: 5,
        maxLength: 20,
    }),
});
export type TSignUpValidationSchema = typeof SignUpValidationSchema;
