import express from 'express'
import * as controller from '#controllers/auth'

const router = express.Router()

router
.route('/register')
.post(controller.signUp)



export default router