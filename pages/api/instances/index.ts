import type { NextApiRequest, NextApiResponse } from 'next';
import { DocumentData } from 'firebase/firestore'

import { auth, db } from '@/lib/firebase/firebaseAdmin';

// GET /api/instance
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token as string);
    
    let instances: DocumentData = [];
    const instancesRef = db.collection('instances');
    const snapshot = await instancesRef.where("userId", "==", uid).get();
 
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