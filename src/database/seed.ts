import { faker } from '@faker-js/faker'

;(() => {
  seedProducts()
})()
async function seedProducts() {
  for (let i = 0; i < 20000; i++) {
    console.log(`Creating product ${i + 1}...`)
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price(100, 200, 0)),
        description: faker.commerce.productDescription(),
        product_thumbnail: faker.image.imageUrl(),
        quantity: faker.datatype.number(),
        attributes: [
          {
            name: faker.commerce.productMaterial(),
            value: faker.commerce.productMaterial()
          },
          {
            name: faker.commerce.productMaterial(),
            value: faker.commerce.productMaterial()
          }
        ]
      }
    })
    console.log(`Product ${i + 1} created!`)
  }
}
