import type { NextApiRequest, NextApiResponse } from 'next';
import { DocumentData } from 'firebase/firestore';

import { db } from '@/lib/firebase/firebaseAdmin';

// GET /api/history/:userId
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId } = req.query;

    let instances: DocumentData = [];
    const instancesRef = db.collection('instances');
    const snapshot = await instancesRef
      .where('userId', '==', userId)
      .orderBy('year', 'desc')
      .orderBy('month', 'desc')
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ error: 'No instances found' });
    }

    snapshot.forEach(doc => {
      instances.push({ id: doc.id, ...doc.data() });
    });

    const history = instances.slice(1);

    return res.status(200).json(history);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
