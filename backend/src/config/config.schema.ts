import * as joi from 'joi';

export const envSchema = joi
  .object({
    NODE_ENV: joi
      .string()
      .valid('development', 'production', 'test')
      .default('development'),
    APP_NAME: joi.string().required(),
    APP_PORT: joi.number().default(3000),
    APP_DESCRIPTION: joi.string().optional(),
    APP_VERSION: joi.string().default('1'),
    APP_URL: joi.string().uri().default('http://localhost:3000'),
    ORIGIN_URL: joi.string().uri().default('http://localhost:3000'),
    DATABASE_URL: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    JWT_EXPIRES_IN: joi.string().required(),
    CSRF_SECRET: joi.string().required(),
    GOOGLE_ID: joi.string().required(),
    GOOGLE_SECRET: joi.string().required(),
    GOOGLE_CALLBACK_URL: joi.string().required(),
  })
  .unknown(true);
