import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { prisma } from '@/lib/prisma';

// GET /api/instance
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (req.method === 'GET') {
    if (session && session.user) {
      const result = await prisma.instance.findMany({
        where: {
          userId: session.user.id,
        },
        include: {
          categories: true,
        }
      });

      return res.status(200).json(result);
    }
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // POST /api/instance
  // Required fields in body: userId, month, year
  if (req.method === 'POST') {
    const { month, year } = req.body;

    if (session && session.user) {
      const result = await prisma.instance.create({
        data: {
          month,
          year,
          userId: session.user.id,
        },
      });

      return res.status(200).json(result);
    } else {
      return res.status(401).send({ message: 'Unauthorized' });
    }
  }
}
