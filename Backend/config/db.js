import 'dotenv/config'
import { PrismaMssql } from '@prisma/adapter-mssql'
import { PrismaClient } from '@prisma/client'

const config = {
  server: process.env.HOST,
  port: 1433,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: true, 
    trustServerCertificate: true, 
  },
}

const adapter = new PrismaMssql(config)
const prisma = new PrismaClient({ adapter })

export default prisma 