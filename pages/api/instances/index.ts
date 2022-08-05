import type { NextApiRequest, NextApiResponse } from 'next';
import { DocumentData } from 'firebase/firestore'

import db from '@/lib/firebase/firebaseAdmin';

// GET /api/instance
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let instances: DocumentData = [];
   const instancesRef = db.collection('instances');
   const snapshot = await instancesRef.get();

   if (snapshot.empty) {
     return res.status(404).json({ error: 'No instances found' });
   }

   snapshot.forEach(doc => {
      instances.push(doc.data());
   });

    return res.status(200).json(instances);
}