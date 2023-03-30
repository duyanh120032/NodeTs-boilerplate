import productService from '~/services/product.service'

const productController = {
  getProducts: productService.getProducts
}
export default productController
