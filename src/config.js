
import path from 'path'
import dotenv from 'dotenv'


const appPath = path.dirname(import.meta.url).replace('file:', '')

dotenv.config()

 

export default Object.freeze({
    appPath,
    version: "0.0.0",
    openApiPath: path.join(appPath, '../openapi.yaml'),
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
      from: process.env.EMAIL_FROM,
      service: process.env.EMAIL_SERVICE,
      username: process.env.EMAIL_USERNAME,
      password: process.env.EMAIL_PASSWORD,
    },
  })