require('dotenv').config();

const config = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  entities: [
    process.env.NODE_ENV === 'production' ? './build' : './src' + '/entities/*{.ts,.js}'
  ],
  migrations: [
    process.env.NODE_ENV === 'production' ? './build' : './src' + '/database/migrations/*{.ts,.js}'
  ],
  cli: {
    migrationsDir: process.env.NODE_ENV === 'production' ? './build' : './src' + '/database/migrations',
  },
  ssl: {
    rejectUnauthorized: false,
  },
};

module.exports = config;