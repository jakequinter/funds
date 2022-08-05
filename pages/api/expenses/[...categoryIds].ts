import type { NextApiRequest, NextApiResponse } from 'next';
import { DocumentData } from 'firebase/firestore'

import db from '@/lib/firebase/firebaseAdmin';

// GET /api/categories/:instanceId
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { categoryIds } = req.query;
console.log('categoryIds', categoryIds);
   let expenses: DocumentData = [];
   const expensesRef = db.collection('expenses');
   const snapshot = await expensesRef.where('categoryId', 'in', categoryIds).get();

   if (snapshot.empty) {
     return res.status(404).json({ error: 'No categories found' });
   }

   snapshot.forEach(doc => {
      expenses.push({ id: doc.id, ...doc.data() });
   });

    return res.status(200).json(expenses);
}