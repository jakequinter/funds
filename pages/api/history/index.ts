import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { prisma } from '@/lib/prisma';

// GET /api/history
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
          NOT: {
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
          }
        },
        include: {
          categories: true,
        }
      });

      return res.status(200).json(result);
    }
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
