import { Router } from 'express'
import validationMiddleware from '~/middlewares/validation.middleware'
import { authDto } from '~/dtos/auth.dto'
import { authController } from '~/controllers/auth.controller'
import passport from 'passport'

const router = Router()

router
  .post(
    '/login',
    validationMiddleware(authDto),
    passport.authenticate('local', { session: false }),
    authController.login
  )
  .post('/register', validationMiddleware(authDto), authController.register)
  .post('/refresh', passport.authenticate('jwt', { session: false }), authController.refresh)

export default router
