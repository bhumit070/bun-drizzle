import { ElysiaCustomContext } from '../../../types/elysia';
import type {
    TLoginValidationSchema,
    TSignUpValidationSchema,
} from './auth.validator';

type LoginContext = ElysiaCustomContext<{
    body: TLoginValidationSchema;
}>;

type SignUpContext = ElysiaCustomContext<{
    body: TSignUpValidationSchema;
}>;

export function login(context: LoginContext) {
    return context.body;
}

export function signup(context: SignUpContext) {
    return context.body;
}
