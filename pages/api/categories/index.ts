import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/lib/firebase/firebaseAdmin';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // POST /api/categories
  // Required fields in body: name, color, target, instanceId, createdAt, updatedAt
  if (req.method === 'POST') {
    const { name, color, target, instanceId } = req.body;

    const result = await db.collection('categories').add({
      name,
      color,
      target,
      instanceId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res.status(200).json(result);
  }

  // PUT /api/categories
  // Required fields in body: id, name, color, target, updatedAt
  if (req.method === 'PUT') {
    const { id, name, color, target } = req.body;

    const result = await db.collection('categories').doc(id).update({
      name,
      color,
      target,
      updatedAt: new Date(),
    })

    return res.status(200).json(result);
  }

  // DELETE /api/categories
  // Required fields in body: id
  if (req.method === 'DELETE') {
    const { id } = req.body;

    const result = await db.collection('categories').doc(id).delete();

    return res.status(200).json(result);
  }
}