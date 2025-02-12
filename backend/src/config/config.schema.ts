import * as joi from 'joi';

export const envSchema = joi
  .object({
    APP_NAME: joi.string().required(),
    APP_PORT: joi.number().default(3000),
    APP_DESCRIPTION: joi.string().optional(),
    APP_VERSION: joi.string().default('1'),
    APP_URL: joi.string().uri().default('http://localhost:3000'),
    DATABASE_URL: joi.string().required(),
  })
  .unknown(true);
