import express from 'express'
import serverless from 'serverless-http'
import { router as bookingRouter } from './bookingRouter.js'
import { router as productRouter } from './productRouter.js'
import { router as customerRouter } from './customerRouter.js'

export const router = express.Router()

router.use('/bookings', bookingRouter)
router.use('/products', productRouter)
router.use('/customers', customerRouter)


// Catch 404 (ALWAYS keep this as the last route).
router.use('*', (req, res, next) => {
  const statusCode = 404
  const error = new Error(http.STATUS_CODES[statusCode])
  error.status = statusCode
  next(error)
})
