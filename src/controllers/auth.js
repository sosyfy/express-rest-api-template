import httpStatus from 'http-status'
import { addDays, addMinutes, getUnixTime } from 'date-fns'
import User from '#models/user'
import * as Errors from '#errors/common'

//& sign up a user function

export async function signUp( req , res ,next ){
   try {
    const { email , password } = req.body 
    //& data validtion from frontend 
    if(!email || !password ) {
       return next( new Errors.IncorrectEmailOrPasswordError() )
    }

    //& Creating a user in the database 

    const user = await User.create({
            email ,
            password
        })
    
    //& sending a token after user creation
    
   
   } catch (error) {
    
   } 
   

}