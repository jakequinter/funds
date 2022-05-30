import { rest } from 'msw'

export const handlers = [
  // handles a GET  to /api/test
  rest.get('/api/test', (req, res, ctx) => {
    return res(ctx.json({ name: 'John doe' }));
  })
]