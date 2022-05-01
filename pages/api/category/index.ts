
   
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { prisma } from '@/lib/prisma';


// POST /api/section
// Required fields in body: userId, name, color
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { name, color } = req.body;

  const session = await getSession({ req });
  console.log('session', session);

  // if (session && ) {
  // const result = await prisma.section.create({
  //     data: {
  //       name,
  //       color,
  //       userId: session.user.id
  //     }
  //   })
  //   res.json(result);
  // } else {
  //   res.status(401).send({ message: 'Unauthorized' })
  // }
}