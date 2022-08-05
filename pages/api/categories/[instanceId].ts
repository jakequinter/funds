import type { NextApiRequest, NextApiResponse } from 'next';
import { DocumentData } from 'firebase/firestore'

import db from '@/lib/firebase/firebaseAdmin';

// GET /api/categories/:instanceId
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { instanceId } = req.query;

  let categories: DocumentData = [];
   const categoriesRef = db.collection('categories');
   const snapshot = await categoriesRef.where('instanceId', '==', instanceId).get();

   if (snapshot.empty) {
     return res.status(404).json({ error: 'No instances found' });
   }

   snapshot.forEach(doc => {
      categories.push({ id: doc.id, ...doc.data() });
   });

    return res.status(200).json(categories);
}