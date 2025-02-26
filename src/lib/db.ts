import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedPrisma: PrismaClient
}

function getPrismaClient() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

  // Test the connection
  client.$connect()
    .catch((err) => {
      console.error('Failed to connect to database:', err)
      process.exit(1)
    })

  return client
}

let db: PrismaClient

if (process.env.NODE_ENV === 'production') {
  db = getPrismaClient()
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = getPrismaClient()
  }
  db = global.cachedPrisma
}

export default db