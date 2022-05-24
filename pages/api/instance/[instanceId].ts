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
    const { instanceId } = req.query;

    const result = await prisma.instance.findUnique({
      where: {
        id: instanceId as string, 
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