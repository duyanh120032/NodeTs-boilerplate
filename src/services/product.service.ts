import { Request, Response } from 'express'
import { prisma } from '~/database'
import catchAsync from '~/utils/catchAsync'

const productService = {
  getProducts: catchAsync(async (req: Request, res: Response) => {
    prisma.product.findMany({}).then((products) => {
      res.json(products)
    })
  })
}
export default productService
