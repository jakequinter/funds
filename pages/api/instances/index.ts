import type { NextApiRequest, NextApiResponse } from 'next';
import { DocumentData } from 'firebase/firestore';

import { db } from '@/lib/firebase/firebaseAdmin';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET /api/instances
  if (req.method === 'GET') {
    try {
      // const { uid } = await auth.verifyIdToken(req.cookies.token);

      let instances: DocumentData = [];
      const instancesRef = db.collection('instances');
      const snapshot = await instancesRef.get();

      if (snapshot.empty) {
        return res.status(404).json({ error: 'No instances found' });
      }

      snapshot.forEach(doc => {
        instances.push({ id: doc.id, ...doc.data() });
      });

      return res.status(200).json(instances);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  // POST /api/instances
  // Required fields in body: userId, month, year
  if (req.method === 'POST') {
    try {
      // const { uid } = await auth.verifyIdToken(req.cookies.token);
      const { userId, month, year } = req.body;

     
      const result = await db.collection('instances').add({
        userId,
        month,
        year,
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
}
