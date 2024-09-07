import { PrismaClient } from '@prisma/client'
import { Env } from "../env";
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

export async function getNames(env: Env) {
  try {
    const pool = new Pool({ connectionString: env.DATABASE_URL })
    const adapter = new PrismaPg(pool)
    const prisma = new PrismaClient({ adapter })

    const records = await prisma.record.findMany()

    if (!records) {
      return Response.json({}, { status: 200 });
    }

    // Simplify the response format
    const formattedNames = records.reduce((acc: any, name: any) => {
      return {
        ...acc,
        [name.name]: {
          addresses: name.addresses,
          texts: name.texts,
          contenthash: name.contenthash,
        },
      };
    }, {});

    return Response.json(formattedNames, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error }, { status: 500 });
  }
}
