require('dotenv/config');

const dir = process.env.NODE_ENV === 'production' ? './build' : './src';

const config = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  entities: [dir + '/entities/*{.ts,.js}'],
  migrations: [dir + '/database/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: dir + '/database/migrations',
  },
  ssl: {
    rejectUnauthorized: false,
  },
};

module.exports = config;
