import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'
;(async () => {
  // await seedProducts()
  await seedUsers()
})()
async function seedProducts() {
  for (let i = 0; i < 20000; i++) {
    console.log(`Creating product ${i + 1}...`)
    await prisma?.product.create({
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
async function seedUsers() {
  const hashedPassword = await bcrypt.hash('123456', 10)
  for (let i = 0; i < 10; i++) {
    await prisma?.user.create({
      data: {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: hashedPassword
      }
    })
    console.log(`User ${i + 1} created!`)
  }
}
