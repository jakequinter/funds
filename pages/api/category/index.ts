import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { prisma } from '@/lib/prisma';

// GET /api/category
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  
  // POST /api/category
  // Required fields in body: name, color, target, instanceId
  if (req.method === 'POST') {
    const { name, color, target, instanceId } = req.body;

    if (session && session.user) {
      const result = await prisma.category.create({
        data: {
          name,
          color,
          target,
          instanceId      
        },
      });

      return res.status(200).json(result);
    } else {
      return res.status(401).send({ message: 'Unauthorized' });
    }
  }

  // PUT /api/category
  // Required fields in body: id, name, color, target
  if (req.method === 'PUT') {
    const { id, name, color, target } = req.body;

    if (session && session.user) {
      const result = await prisma.category.update({
        where: {
          id,
        },
        data: {
          name,
          color,
          target,
        },
      });

      return res.status(200).json(result);
    } else {
      return res.status(401).send({ message: 'Unauthorized' });
    }
  }

  // DELETE /api/category
  // Required fields in body: id
  if (req.method === 'DELETE') {
    const { id } = req.body;

    if (session && session.user) {
      const result = await prisma.category.delete({
        where: {
          id: id as string,
        },
      });

      return res.status(200).json(result);
    } else {
      return res.status(401).send({ message: 'Unauthorized' });
    }
  }
}
