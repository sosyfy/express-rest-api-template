import express from 'express'
import authRoutes from '#routes/v1/auth'


const router = express.Router()
  // .use('/users', userRoutes)
  .use('/auth', authRoutes)

export default router