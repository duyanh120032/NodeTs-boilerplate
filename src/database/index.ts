import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient({ log: ['info'] })

if (process.env.NODE_ENV !== 'production') {
  console.log('! Prisma instantiated in development mode')
  global.prisma = prisma
}

async function connectDB() {
  try {
    await prisma.$connect()
    console.log('? Database connected successfully')
  } catch (error) {
    console.log(error)
    await prisma.$disconnect()
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

export default connectDB
