import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { NewUser, users } from './schema/users';
import { NewCity, cities } from './schema/cities';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: 'postgres://bhumit070:bhumit070@localhost:5432/bun_demo',
});

const db = drizzle(pool);

// Insert
const newUser: NewUser = {
    fullName: 'John Doe',
    phone: '+123456789',
};
const insertedUsers /* : User[] */ = await db
    .insert(users)
    .values(newUser)
    .returning();
const insertedUser = insertedUsers[0]!;

const newCity: NewCity = {
    name: 'New York',
};
const insertedCities /* : City[] */ = await db
    .insert(cities)
    .values(newCity)
    .returning();
const insertedCity = insertedCities[0]!;

// Update
const updateResult /* : { updated: Date }[] */ = await db
    .update(users)
    .set({ cityId: insertedCity.id, updatedAt: new Date() })
    .where(eq(users.id, insertedUser.id))
    .returning({ updated: users.updatedAt });
