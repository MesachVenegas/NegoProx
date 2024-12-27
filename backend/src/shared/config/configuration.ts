import * as Joi from 'joi';
import 'dotenv/config';

interface EnvVariables {
  APP_NAME: string;
  APP_PORT: number;
  APP_DESCRIPTION: string;
  APP_DEFAULT_VERSION: string;
  APP_URL: string;
  APP_LOGO_URL: string;
  APP_FRONT_VERIFICATION_URL: string;

  DATABASE_URL: string;

  JWT_SECRET: string;
  JWT_EXPIRATION: number;
  JWT_EMAIL_SECRET: string;

  EMAIL_HOST: string;
  EMAIL_PORT: number;
  EMAIL_USERNAME: string;
  EMAIL_PASSWORD: string;
  EMAIL_SECURE: boolean;

  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK_URL: string;

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
  APP_LOGO_URL: Joi.string().uri().default('https://via.placeholder.com/50'),
  APP_URL: Joi.string().default('http://localhost:8000'),
  APP_FRONT_VERIFICATION_URL: Joi.string().default('http://localhost:3000'),
  APP_DEFAULT_VERSION: Joi.string().default('1'),

  DATABASE_URL: Joi.string().uri().required(),

  JWT_SECRET: Joi.string().min(10).required(),
  JWT_DURATION: Joi.string().default('1d'),
  JWT_EMAIL_SECRET: Joi.string().min(10).required(),

  EMAIL_HOST: Joi.string().required(),
  EMAIL_PORT: Joi.number().required(),
  EMAIL_USERNAME: Joi.string().required(),
  EMAIL_PASSWORD: Joi.string().required(),
  EMAIL_SECURE: Joi.boolean().default(true),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_CALLBACK_URL: Joi.string().required(),
  // CLOUDINARY_KEY: Joi.string().required(),
  // CLOUDINARY_SECRET: Joi.string().required(),
  // CLOUDINARY_NAME: Joi.string().required(),
}).unknown(true);

const { error, value } = envVars.validate({ ...process.env });

if (error) throw new Error(`Config validation error: ${error}`);

const envVariables: EnvVariables = value;

export const envs = {
  app: {
    url: envVariables.APP_URL,
    port: envVariables.APP_PORT,
    name: envVariables.APP_NAME,
    logoUrl: envVariables.APP_LOGO_URL,
    frontVerificationUrl: envVariables.APP_FRONT_VERIFICATION_URL,
    description: envVariables.APP_DESCRIPTION,
    default_version: envVariables.APP_DEFAULT_VERSION,
  },
  database: {
    url: envVariables.DATABASE_URL,
  },
  jwt: {
    secret: envVariables.JWT_SECRET,
    expiration: envVariables.JWT_EXPIRATION,
    emailSecret: envVariables.JWT_EMAIL_SECRET,
  },
  email: {
    host: envVariables.EMAIL_HOST,
    port: envVariables.EMAIL_PORT,
    user: envVariables.EMAIL_USERNAME,
    secure: envVariables.EMAIL_SECURE,
    password: envVariables.EMAIL_PASSWORD,
  },
  // cloudinary: {
  //   key: envVariables.CLOUDINARY_KEY,
  //   secret: envVariables.CLOUDINARY_SECRET,
  //   name: envVariables.CLOUDINARY_NAME,
  // },
  google: {
    clientId: envVariables.GOOGLE_CLIENT_ID,
    clientSecret: envVariables.GOOGLE_CLIENT_SECRET,
    callbackUrl: envVariables.GOOGLE_CALLBACK_URL,
  },
};
