import express from 'express'
import productController from '~/controllers/product.controller'
import { createProductDto } from '~/dtos/product.dto'
import validationMiddleware from '~/middlewares/validation.middleware'

const router = express.Router()

router
  .get('', productController.getProducts)
  .post('', validationMiddleware(createProductDto), productController.createProduct)

export default router
