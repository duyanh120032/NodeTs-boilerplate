import { authDto } from '~/dtos/auth.dto'
import { HttpException } from '~/exceptions/httpException'
import bcrypt from 'bcryptjs'
import { User } from '@prisma/client'
import { generateAccessToken } from '~/utils'
import { Response } from 'express'

export const authService = {
  login: async (credentials: User, res: Response) => {
    const access_token = generateAccessToken(credentials)
    const refreshToken = generateAccessToken(credentials)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    })
    return { access_token }
  },
  register: async (credentials: authDto) => {
    const { email, password } = credentials
    //   check if user exists
    const user = await prisma?.user.findUnique({
      where: {
        email
      }
    })
    if (user) {
      throw new HttpException(400, 'User already exists')
    }
    //   create user
    const newUser = await prisma?.user.create({
      data: {
        email,
        password: await bcrypt.hash(password, 10),
        name: email.split('@')[0]
      }
    })
    return newUser
  },
  refresh: async (user: User) => {
    const access_token = generateAccessToken(user)
    return { access_token }
  }
}
