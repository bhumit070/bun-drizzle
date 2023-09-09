import {
    integer,
    pgTable,
    serial,
    text,
    timestamp,
    varchar,
} from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

export const cities = pgTable('cities', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
});

export type City = InferSelectModel<typeof cities>;
export type NewCity = InferInsertModel<typeof cities>;
