export default () => ({
  app: {
    name: process.env.APP_NAME,
    port: process.env.APP_PORT,
    description: process.env.APP_DESCRIPTION,
    version: process.env.APP_VERSION,
    environment: process.env.NODE_ENV,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  security: {
    jwrSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    csrfSecret: process.env.CSRF_SECRET,
    url: process.env.APP_URL,
    originUrl: process.env.ORIGIN_URL,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL,
  },
});
