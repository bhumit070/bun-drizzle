import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    fullName: text('full_name').notNull(),
    phone: varchar('phone', { length: 20 }).notNull().unique(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
});

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
