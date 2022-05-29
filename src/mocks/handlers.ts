import { rest } from 'msw'

export const handlers = [
  // handles GET /api/instance/:instanceId
  rest.get('/api/instance/:instanceId', (req, res, ctx) => {
     // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem('is-authenticated')
    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(401),
        ctx.json({
          message: 'Unauthorized',
        }),
      )
    }

    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    )
  }),
]