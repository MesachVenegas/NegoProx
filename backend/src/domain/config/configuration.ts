import * as Joi from 'joi';
import 'dotenv/config';

interface EnvVariables {
  APP_NAME: string;
  APP_PORT: number;
  APP_DESCRIPTION: string;
  APP_DEFAULT_VERSION: string;
  APP_URL: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_DURATION: number;
  // GOOGLE_CLIENT_ID: string;
  // GOOGLE_CLIENT_SECRET: string;
  // GOOGLE_CALLBACK_URL: string;
  // CLOUDINARY_KEY: string;
  // CLOUDINARY_SECRET: string;
  // CLOUDINARY_NAME: string;
}

const envVars = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  APP_NAME: Joi.string().default('NegoProxAPI'),
  APP_DESCRIPTION: Joi.string().default('Local Host NegoProxAPI'),
  APP_PORT: Joi.number().default(8000),
  APP_URL: Joi.string().default('http://localhost:3000'),
  APP_DEFAULT_VERSION: Joi.string().default('1'),
  // DATABASE_URL: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().min(10).required(),
  JWT_DURATION: Joi.string().default('1d'),
  // GOOGLE_CLIENT_ID: Joi.string().required(),
  // GOOGLE_CLIENT_SECRET: Joi.string().required(),
  // GOOGLE_CALLBACK_URL: Joi.string().required(),
  // CLOUDINARY_KEY: Joi.string().required(),
  // CLOUDINARY_SECRET: Joi.string().required(),
  // CLOUDINARY_NAME: Joi.string().required(),
}).unknown(true);

const { error, value } = envVars.validate({ ...process.env });

if (error) throw new Error(`Config validation error: ${error}`);

const envVariables: EnvVariables = value;

export const envs = {
  app: {
    name: envVariables.APP_NAME,
    description: envVariables.APP_DESCRIPTION,
    port: envVariables.APP_PORT,
    url: envVariables.APP_URL,
    default_version: envVariables.APP_DEFAULT_VERSION,
  },
  database: {
    url: envVariables.DATABASE_URL,
  },
  jwt: {
    secret: envVariables.JWT_SECRET,
    expiration: envVariables.JWT_DURATION,
  },
  // cloudinary: {
  //   key: envVariables.CLOUDINARY_KEY,
  //   secret: envVariables.CLOUDINARY_SECRET,
  //   name: envVariables.CLOUDINARY_NAME,
  // },
  // google: {
  //   clientId: envVariables.GOOGLE_CLIENT_ID,
  //   clientSecret: envVariables.GOOGLE_CLIENT_SECRET,
  //   callbackUrl: envVariables.GOOGLE_CALLBACK_URL,
  // },
};
