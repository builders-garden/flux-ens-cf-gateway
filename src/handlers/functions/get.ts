import { PrismaClient } from '@prisma/client'
import { Env } from "../../env";
import { Name } from "../../models";
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

export async function get(name: string, env: Env): Promise<Name | null> {
  const pool = new Pool({ connectionString: env.DATABASE_URL })
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })

  const record = await prisma.record.findUnique({
    where: {
      name
    }
  })

  return record
}
