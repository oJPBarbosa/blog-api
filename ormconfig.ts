import dotenv from 'dotenv'

dotenv.config()

export const config = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  entities: [
    './src/entities/*{.ts,.js}'
  ],
  migrations: [
    './src/database/migrations/*{.ts,.js}'
  ],
  cli: {
    migrationsDir: './src/database/migrations',
  },
  ssl: {
    rejectUnauthorized: false,
  },
}

export default config