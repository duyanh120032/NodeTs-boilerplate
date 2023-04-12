import { Router } from 'express'
import validationMiddleware from '~/middlewares/validation.middleware'
import { authDto } from '~/dtos/auth.dto'
import { authController } from '~/controllers/auth.controller'
import passport from 'passport'

const router = Router()

router
  /**
   * This function comment is parsed by doctrine
   * @route GET /api
   * @group foo - Operations about user
   * @param {string} email.query.required - username or email - eg: user@domain
   * @param {string} password.query.required - user's password.
   * @returns {object} 200 - An array of user info
   * @returns {Error}  default - Unexpected error
   */
  .post(
    '/login',
    validationMiddleware(authDto),
    passport.authenticate('local', { session: false }),
    authController.login
  )
  .post('/register', validationMiddleware(authDto), authController.register)
  .post('/refresh', passport.authenticate('jwt', { session: false }), authController.refresh)
  .get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
  .get('/google/callback', passport.authenticate('google', { session: false }), authController.googleLogin)

export default router
