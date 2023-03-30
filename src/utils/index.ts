import { User } from '~/modal/user.model'
import jwt from 'jsonwebtoken'
import env from '~/config'

export const generateAccessToken = (user: User) => {
  // Define payload
  const payload = {
    userId: user.id,
    email: user.email
  }

  // Sign token with secret key and expiration time
  return jwt.sign(payload, env.JwT_ACCESS_TOKEN_KEY, { expiresIn: env.JwT_ACCESS_TOKEN_EXPIRES_IN })
}
export const generateRefreshToken = (user: User) => {
  // Define payload
  const payload = {
    userId: user.id,
    email: user.email
  }

  // Sign token with secret key and expiration time
  return jwt.sign(payload, env.JwT_REFRESH_TOKEN_KEY, { expiresIn: env.JwT_REFRESH_TOKEN_EXPIRES_IN })
}
