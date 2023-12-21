import { PrismaClient } from '@prisma/client/edge'
import { Env } from "../../env";
import { Name } from "../../models";

export async function get(name: string, env: Env): Promise<Name | null> {
  const prisma = new PrismaClient()

  const record = await prisma.record.findUnique({
    where: {
      name
    }
  })

  return record
}
