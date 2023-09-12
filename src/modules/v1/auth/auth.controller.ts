import { ElysiaCustomContext } from '../../../types/elysia';
import { LoginValidationSchema } from './auth.validator';

type LoginContext = ElysiaCustomContext<{
    body: typeof LoginValidationSchema;
}>;

export function login(context: LoginContext) {}
