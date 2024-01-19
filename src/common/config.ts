import * as dotenv from 'dotenv';
dotenv.config();

const config = {
  server: {
    port: process.env.SERVER_PORT ? +process.env.SERVER_PORT : 3000
  },
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE
  }
};

export default config;
