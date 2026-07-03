import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

// 1. Create a native connection pool using the pg driver
const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })

// 2. Connect Prisma to that pool
const adapter = new PrismaPg(pool)

// 3. Attach it globally so hot-reloads don't break the connection limit
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
