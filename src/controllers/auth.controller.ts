import { authService } from '~/services/auth.service'
import { Request, Response } from 'express'
import catchAsync from '~/utils/catchAsync'
import { HttpException } from '~/exceptions/httpException'
import { User } from '@prisma/client'
import { JwtPayload } from '~/config/passport'

export const authController = {
  login: catchAsync(async (req: Request, res: Response) => {
    const data = await authService.login(req.user as User, res)
    res.send(data)
  }),
  register: catchAsync(async (req: Request, res: Response) => {
    const userData = req.body
    const data = await authService.register(userData)
    res.status(201).send({
      message: 'User created'
    })
  }),
  refresh: catchAsync(async (req: Request, res: Response) => {
    const user = req.user as User
    const token = await authService.refresh(user)
    return res.send(token)
  }),
  googleLogin: catchAsync(async (req: Request, res: Response) => {
    const user = req.user as User
    const data = await authService.login(user, res)
    return res.send(data)
  })
}
