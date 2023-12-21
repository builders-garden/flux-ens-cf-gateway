import { PrismaClient } from '@prisma/client/edge'
import { Env } from "../env";

export async function getNames(env: Env) {
  try {
    const prisma = new PrismaClient()

    const records = await prisma.record.findMany()

    if (!records) {
      return Response.json({}, { status: 200 });
    }

    // Simplify the response format
    const formattedNames = records.reduce((acc, name) => {
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
