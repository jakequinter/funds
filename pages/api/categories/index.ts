import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/lib/firebase/firebaseAdmin';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // POST /api/category
  // Required fields in body: name, color, target, instanceId, createdAt, updatedAt
  if (req.method === 'POST') {
    const { name, color, target, instanceId } = req.body;

    const result = await db.collection('categories').add({
      name,
      color,
      target,
      instanceId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return res.status(200).json(result);
  }
}