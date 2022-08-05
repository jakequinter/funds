import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { prisma } from '@/lib/prisma';

// GET /api/category
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  // POST /api/expense
  // Required fields in body: name, amount, categoryId
  if (req.method === 'POST') {
    const { name, amount, categoryId } = req.body;

    if (session && session.user) {
      const result = await prisma.expense.create({
        data: {
          name,
          amount,
          categoryId,
        },
      });

      return res.status(200).json(result);
    } else {
      return res.status(401).send({ message: 'Unauthorized' });
    }
  }

  // PUT /api/expense
  // Required fields in body: id, name, amount, categoryId
  if (req.method === 'PUT') {
    const { id, name, amount, categoryId } = req.body;

    if (session && session.user) {
      const result = await prisma.expense.update({
        where: {
          id,
        },
        data: {
          name,
          amount,
          categoryId,
        },
      });

      return res.status(200).json(result);
    } else {
      return res.status(401).send({ message: 'Unauthorized' });
    }
  }


  // DELETE /api/expense
  // Required fields in body: id
  if (req.method === 'DELETE') {
    const { id } = req.body;

    if (session && session.user) {
      const result = await prisma.expense.delete({
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
