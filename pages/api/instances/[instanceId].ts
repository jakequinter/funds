import type { NextApiRequest, NextApiResponse } from 'next';

// GET /api/instance
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(200).json({ hello: 'world' });
}