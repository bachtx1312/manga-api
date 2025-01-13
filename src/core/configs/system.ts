import _ from 'lodash';
import 'dotenv/config';

const {
  PORT = 8000,
  API_PREFIX = '',
  DB_HOST = 'localhost',
  DB_PORT = '5432',
  DB_NAME = 'manga_db',
  DB_USER = 'postgres',
  DB_PASSWORD = '',
  DB_TYPE = 'postgres',
  OPEN_AI_SECRET_KEY = '',
  JWT_SECRET = '',
  JWT_EXPIRES = '7d',
  CLOUDINARY_NAME = '',
  CLOUDINARY_API_KEY = '',
  CLOUDINARY_API_SECRET = '',
} = process.env;

export const ENV = {
  PORT,
  API_PREFIX,
  DATABASE: {
    DB_HOST,
    DB_PORT: _.toNumber(DB_PORT),
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_TYPE,
  },
  OPEN_AI: {
    SECRET_KEY: OPEN_AI_SECRET_KEY,
  },
  CLOUDINARY: {
    NAME: CLOUDINARY_NAME,
    API_KEY: CLOUDINARY_API_KEY,
    API_SECRET: CLOUDINARY_API_SECRET,
  },
  JWT: {
    SECRET: JWT_SECRET,
    EXPIRES: JWT_EXPIRES,
  },
};
