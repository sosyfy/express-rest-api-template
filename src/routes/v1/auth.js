import express from 'express'
import * as controller from '#controllers/auth'

const router = express.Router()

router
    .route('/register')
    .post(controller.signUp)

router 
    .route('/login')
    .post(controller.logInWithEmailAndPassword)


router 
    .route('/logout')
    .post(controller.logout)


export default router