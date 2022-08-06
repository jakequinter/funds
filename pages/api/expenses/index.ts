import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/lib/firebase/firebaseAdmin';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // POST /api/expenses
  // Required fields in body: name, color, spend, type, categoryId, createdAt, updatedAt
  if (req.method === 'POST') {
    const { name, color, spend, type, categoryId } = req.body;

    const result = await db.collection('expenses').add({
      name,
      color,
      spend,
      type,
      categoryId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res.status(200).json(result);
  }

  // PUT /api/expenses
  // Required fields in body: id, name, color, spend, type, updatedAt
  if (req.method === 'PUT') {
    const { id, name, color, spend, type, categoryId } = req.body;

    const result = await db.collection('expenses').doc(id).update({
      name,
      color,
      spend,
      type,
      categoryId,
      updatedAt: new Date(),
    })

    return res.status(200).json(result);
  }

  // DELETE /api/expenses
  // Required fields in body: id
  if (req.method === 'DELETE') {
    const { id } = req.body;

    const result = await db.collection('expenses').doc(id).delete();

    return res.status(200).json(result);
  }
}