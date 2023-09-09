import {
    integer,
    pgTable,
    serial,
    text,
    timestamp,
    varchar,
} from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { cities } from './cities';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    fullName: text('full_name').notNull(),
    phone: varchar('phone', { length: 20 }).notNull(),
    role: text('role', { enum: ['user', 'admin'] })
        .default('user')
        .notNull(),
    cityId: integer('city_id').references(() => cities.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
