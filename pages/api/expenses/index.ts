import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/lib/firebase/firebaseAdmin';

// GET /api/category
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // POST /api/category
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
}