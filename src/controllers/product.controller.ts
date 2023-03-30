import productService from '~/services/product.service'

const productController = {
  getProducts: productService.getProducts,
  createProduct: productService.createProduct
}
export default productController
