import type { NextApiRequest, NextApiResponse } from 'next';
import { DocumentData, documentId } from 'firebase/firestore'

import db from '@/lib/firebase/firebaseAdmin';

// GET /api/instance/:instanceId
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { instanceId } = req.query;

   const instancesRef = db.collection('instances');
   const doc = await instancesRef
   .doc(instanceId as string)
   .get();

   if (!doc.exists) {
     return res.status(404).json({ error: 'No instances found' });
   } else {
     return res.status(200).json({ id: doc.id, ...doc.data()});
   }
}