import * as joi from 'joi';
import 'dotenv/config';

interface EnvInterface {
  NODE_ENV: 'development' | 'production' | 'test';
  APP_NAME: string;
  APP_PORT: number;
  APP_DESCRIPTION: string | undefined;
  APP_VERSION: string;
  APP_URL: string;
  DATABASE_URL: string;
}

const envSchema = joi
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
    DATABASE_URL: joi.string().required(),
  })
  .unknown(true);

const data: joi.ValidationResult<EnvInterface> = envSchema.validate({
  ...process.env,
});

if (data.error)
  throw new Error(`Config validation error: ${data.error?.message}`);

const envData: EnvInterface = data.value;

const envs = {
  app: {
    name: envData.APP_NAME,
    port: envData.APP_PORT,
    description: envData.APP_DESCRIPTION,
    version: envData.APP_VERSION,
    url: envData.APP_URL,
    environment: envData.NODE_ENV,
  },
  database: {
    url: envData.DATABASE_URL,
  },
};

export default envs;
