import { migrate } from 'drizzle-orm/sqlite-proxy/migrator';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createDatabaseConnection, executeMigrationQueries, type Database } from '../src/lib/db';

const here = dirname(fileURLToPath(import.meta.url));

/** Create a fresh in-memory Node SQLite database with the schema migrated in. */
export async function createTestDatabase(): Promise<Database> {
    const { db, sqlite } = createDatabaseConnection(':memory:');
    await migrate(
        db,
        async (queries: string[]): Promise<void> => executeMigrationQueries(sqlite, queries),
        { migrationsFolder: join(here, 'migrations') },
    );
    return db;
}
