// Import passport and passport-local
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy } from 'passport-jwt'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import bcrypt from 'bcryptjs'
import env from '~/config/index'
import { Request } from 'express'

// Define local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        // Find user by email
        const user = await prisma?.user.findUnique({
          where: {
            email
          }
        })

        // If user not found or password incorrect, return error
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return done(null, false, { message: 'Invalid email or password' })
        }

        // If user found and password correct, return user
        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
)
// Define jwt strategy
export interface JwtPayload {
  userId: string
  email: string
  iat: number
  exp: number
}
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: (req) => req.cookies?.refreshToken,
      secretOrKey: env.JwT_REFRESH_TOKEN_KEY,
      passReqToCallback: true
    },
    async (req: Request, payload: JwtPayload, done: any) => {
      console.log('payload', payload)
      try {
        // Find user by id
        const user = await prisma?.user.findUnique({
          where: {
            id: payload.userId
          }
        })

        // If user not found, return error
        if (!user) {
          return done(null, false, { message: 'Invalid token' })
        }

        // If user found, return user
        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      profile.emails = profile.emails || []
      try {
        // Find user by email
        const user = await prisma?.user.findUnique({
          where: {
            email: profile.emails[0].value
          }
        })
        console.log('profile', profile)

        // If user not found, create new user
        if (!user) {
          const newUser = await prisma?.user.create({
            data: {
              email: profile.emails[0].value,
              name: profile.displayName,
              password: '123456'
            }
          })
          return done(null, newUser)
        }

        // If user found, return user
        return done(null, user)
      } catch (error) {
        return done(error as any)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  console.log('serializeUser', user)
  done(null, (user as any).id)
})

passport.deserializeUser((id, done) => {
  console.log('deserializeUser', id)
  prisma?.user.findUnique({ where: { id: id as string } }).then((user) => {
    done(null, user)
  })
})

export default passport
