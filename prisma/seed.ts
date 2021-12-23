import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

async function seed() {
  await db.user.create({
    data: {
      id: '1',
    },
  })
}

seed()
