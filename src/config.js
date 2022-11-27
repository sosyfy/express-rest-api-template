
import path from 'path'
import dotenv from 'dotenv'


const appPath = path.dirname(import.meta.url).replace('file:', '')

dotenv.config()

 

export default Object.freeze({
    appPath,
    openApiPath: "../openapi.yaml",
    env: process.env.NODE_ENV,
    isProduction: process.env.NODE_ENV === 'production',
    port: process.env.PORT,
    auth: {
      jwtSecret: process.env.JWT_SECRET,
      jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
    },

    mongo: {
      uri: process.env.MONGO_URI,
    },
    email: {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      username: process.env.EMAIL_USERNAME,
      password: process.env.EMAIL_PASSWORD,
    },
  })