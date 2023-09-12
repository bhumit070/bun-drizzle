import { eq, or } from 'drizzle-orm';
import { db } from '../../../db';
import { ElysiaCustomContext } from '../../../types/elysia';
import { users } from '../../../db/schema/users.schema';
import type {
    TLoginValidationSchema,
    TSignUpValidationSchema,
} from './auth.validator';
import { ApiResponse } from '../../../helper/response';
import { server } from '../../..';

type LoginContext = ElysiaCustomContext<{
    body: TLoginValidationSchema;
}>;

type SignUpContext = ElysiaCustomContext<{
    body: TSignUpValidationSchema;
}>;

export async function login(context: LoginContext) {
    const { body } = context;

    const existingUser = (
        await db
            .select({
                id: users.id,
                email: users.email,
                password: users.password,
            })
            .from(users)
            .where(or(eq(users.email, body.email)))
            .limit(1)
    )[0];

    if (!existingUser) {
        return new ApiResponse(context.set).error({
            code: 400,
            message: 'User not found',
        });
    }

    const isPasswordMatched = await Bun.password.verify(
        body.password,
        existingUser.password,
    );

    if (!isPasswordMatched) {
        return new ApiResponse(context.set).error({
            code: 400,
            message: 'Password is not matched',
        });
    }

    const token = await (context as any).jwtPlugin.sign({
        id: existingUser.id,
    });

    return new ApiResponse(context.set).success({
        code: 200,
        message: 'Login successfully',
        data: {
            token,
            ...existingUser,
            password: undefined,
        },
    });
}

export async function signup(context: SignUpContext) {
    try {
        const { body } = context;

        body.password = await Bun.password.hash(body.password);

        const existingUser = (
            await db
                .select({
                    email: users.email,
                    phone: users.phone,
                })
                .from(users)
                .where(
                    or(
                        eq(users.email, body.email),
                        eq(users.phone, body.phone),
                    ),
                )
        )[0];

        if (existingUser) {
            let errorMessage = '';
            if (existingUser.email === body.email) {
                errorMessage = 'Email already exists, ';
            }
            if (existingUser.phone === body.phone) {
                errorMessage += 'Phone already exists';
            }
            return new ApiResponse(context.set).success({
                code: 400,
                message: errorMessage,
            });
        }

        const insertedUser = await db.insert(users).values(body).returning();

        return insertedUser.at(0);
    } catch (error) {
        return new ApiResponse(context.set).error({
            code: 500,
            message: 'Internal Server Error',
        });
    }
}
