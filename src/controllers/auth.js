import httpStatus from 'http-status'
import { addDays, addMinutes, getUnixTime } from 'date-fns'
import  User from '#models/user'
import * as Errors from '#errors/common'
import config from '#config'
import jwt from 'jwt-simple'

// ? sign up a user function

export async function signUp( req , res ,next ){
   try {
    const { email , password, name } = req.body 
    //& data validtion from frontend 
    if(!email || !password || !name ) {
       return next( new Errors.ApiError())
    }

    //& Creating a user in the database 
    const user = await User.create({
            email,
            password,
            name
      })
    
    //& sending a token after user creation
    const token = createAccessToken(user)
    const options = {
      expires: token.expiresIn ,
      httpOnly : true 
    }
    
    //& remember not to send the password 
   //  user.password = undefined 
    
    res.status(httpStatus.CREATED).cookie('token', token.token , options ).json({
      status : true,
      message: "success",
      token: token,
      user : user.format() 
    })
  

   } catch (error) {
      if (error.message.includes('duplicate key error')) {
         throw new Errors.EmailAlreadyExistsError()
      }
   } 
}


// ? login user function 

export async function  logInWithEmailAndPassword( req ,res ,next ){
  try {
   const { email , password } = req.body 

   //& data validtion from frontend 
   if ( !email || !password ) {
       return next( new Errors.ApiError())
   }
  //& Check if user exists in db if yes fetch them 
   const user = await User.findOne({ email }).select("+password")

   if(!user ) {
       return next( new Errors.UserNotFoundError())
   }

   //& validating the password if they match with one from Db 
   const isPasswordCorrect = await user.isValidatedPassword(password)

   if(!isPasswordCorrect ) {
       return next( new Errors.IncorrectEmailOrPasswordError())
   }

   //& sending a token after validation  
    const token = createAccessToken(user)
    const options = {
      expires: token.expiresIn ,
      httpOnly : true 
    }
    
    res.status(httpStatus.CREATED).cookie('token', token.token , options ).json({
      status : true,
      message: "success",
      token: token,
      user : user.format() 
    })


  } catch (error) {
    return next( new Errors.ApiError())
  }

}


// ? logout  user function 

export async function logout ( req , res ,next ){
    
   res.cookie('token' , null , { expires: new Date(Date.now()) , httpOnly : true } )
  
   res.status(httpStatus.OK).json({
       success: true ,
       message : "logout success"
   }) 
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