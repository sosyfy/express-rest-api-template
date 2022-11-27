import httpStatus from 'http-status'
import { addDays, addMinutes, getUnixTime } from 'date-fns'
import * as User from '#models/user'
import * as Errors from '#errors/common'
import config from '#config'
import jwt from 'jwt-simple'

//& sign up a user function

export async function signUp( req , res ,next ){
   try {
    const { email , password } = req.body 
    //& data validtion from frontend 
    if(!email || !password ) {
       return next( new Errors.ApiError())
    }

    //& Creating a user in the database 
    const user = await User.create({
            email,
            password
      })
    
    //& sending a token after user creation
    const token = createAccessToken(user)

    console.log(token);
   
   } catch (error) {
      if (error.message.includes('duplicate key error')) {
         // throw new Errors.EmailAlreadyExistsError()
      }
   } 
}



function createAccessToken(user) {
   return {
     tokenType: "Bearer",
     expiresIn: addMinutes(Date.now(), config.auth.jwtExpirationInterval),
     token: createJwt(user._id),
   }
 }

function createJwt(encoder) {
   const payload = {
     exp: getUnixTime(addMinutes(Date.now(), config.auth.jwtExpirationInterval)),
     iat: getUnixTime(Date.now()),
     encoder,
   }
   return jwt.encode(payload, config.auth.jwtSecret)
 }