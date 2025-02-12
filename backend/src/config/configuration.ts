export default () => ({
  app: {
    name: process.env.APP_NAME,
    port: process.env.APP_PORT,
    description: process.env.APP_DESCRIPTION,
    version: process.env.APP_VERSION,
    url: process.env.APP_URL,
    environment: process.env.NODE_ENV,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
});
