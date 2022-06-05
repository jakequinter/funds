import { rest } from 'msw';

export const handlers = [
  // GET /api/instance
  rest.get('/api/instance', (req, res, ctx) => {
    return res(
      ctx.delay(100),
      ctx.json([
        {
          id: 'cl3kpyexq00269u2en0b49djt',
          month: 4,
          year: 2022,
          createdAt: '2022-04-24T22:18:32.606Z',
          updatedAt: '2022-04-24T22:18:32.606Z',
          userId: 'cl3koke3w00454i2eckfn7y9u',
          categories: [
            {
              id: 'cl3kpyexq00269u2en28dhru3',
              name: 'Groceries',
              color: 'blue',
              target: 600,
              createdAt: '2022-04-24T22:28:43.976Z',
              updatedAt: '2022-05-24T22:28:43.976Z',
              instanceId: 'cl3kpyexq00269u2en0b49djt',
            },
            {
              id: 'cl3kqoaxd0316092ec6a48djt',
              name: 'Restaurants',
              color: 'purple',
              target: 300,
              createdAt: '2022-04-24T22:38:40.465Z',
              updatedAt: '2022-05-24T22:38:40.466Z',
              instanceId: 'cl3kpyexq00269u2en0b49djt',
            },
            {
              id: 'cl3kqt5wy0573092ejkitool4',
              name: 'Miscellaneous',
              color: 'pink',
              target: 1000,
              createdAt: '2022-04-24T22:42:27.250Z',
              updatedAt: '2022-05-24T22:42:27.250Z',
              instanceId: 'cl3kpyexq00269u2en0b49djt',
            },
          ],
        },
        {
          id: 'cl3kpyexq00269u2en0btiam5',
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
          createdAt: '2022-05-24T22:18:32.606Z',
          updatedAt: '2022-05-24T22:18:32.606Z',
          userId: 'cl3koke3w00454i2eckfn7y9u',
          categories: [
            {
              id: 'cl3kpyexq00269u2en0btiam1',
              name: 'Groceries',
              color: 'blue',
              target: 600,
              createdAt: '2022-05-24T22:28:43.976Z',
              updatedAt: '2022-05-24T22:28:43.976Z',
              instanceId: 'cl3kpyexq00269u2en0btiam5',
            },
            {
              id: 'cl3kqoaxd0316092ec6awu2nw',
              name: 'Restaurants',
              color: 'purple',
              target: 300,
              createdAt: '2022-05-24T22:38:40.465Z',
              updatedAt: '2022-05-24T22:38:40.466Z',
              instanceId: 'cl3kpyexq00269u2en0btiam5',
            },
            {
              id: 'cl3kqt5wy0573092ejk1sjnbr',
              name: 'Miscellaneous',
              color: 'pink',
              target: 1000,
              createdAt: '2022-05-24T22:42:27.250Z',
              updatedAt: '2022-05-24T22:42:27.250Z',
              instanceId: 'cl3kpyexq00269u2en0btiam5',
            },
          ],
        },
      ])
    );
  }),

  // GET /api/instance/:id
  rest.get('/api/instance/:instanceId', (req, res, ctx) => {
    return res(
      ctx.delay(100),
      ctx.json({
        id: 'cl3kpyexq00269u2en0btiam5',
        month: 5,
        year: 2022,
        createdAt: '2022-05-24T22:18:32.606Z',
        updatedAt: '2022-05-24T22:18:32.606Z',
        userId: 'cl3koke3w00454i2eckfn7y9u',
        categories: [
          {
            id: 'cl3kpyexq00269u2en0btiam1',
            name: 'Groceries',
            color: 'blue',
            target: 600,
            createdAt: '2022-05-24T22:28:43.976Z',
            updatedAt: '2022-05-24T22:28:43.976Z',
            instanceId: 'cl3kpyexq00269u2en0btiam5',
          },
          {
            id: 'cl3kqoaxd0316092ec6awu2nw',
            name: 'Restaurants',
            color: 'purple',
            target: 300,
            createdAt: '2022-05-24T22:38:40.465Z',
            updatedAt: '2022-05-24T22:38:40.466Z',
            instanceId: 'cl3kpyexq00269u2en0btiam5',
          },
          {
            id: 'cl3kqt5wy0573092ejk1sjnbr',
            name: 'Miscellaneous',
            color: 'pink',
            target: 1000,
            createdAt: '2022-05-24T22:42:27.250Z',
            updatedAt: '2022-05-24T22:42:27.250Z',
            instanceId: 'cl3kpyexq00269u2en0btiam5',
          },
        ],
      })
    );
  }),

  // GET /api/category/:instanceId
  rest.get('/api/category/:instanceId', (req, res, ctx) => {
    return res(
      ctx.delay(100),
      ctx.json([
        {
          id: 'cl3kpyexq00269u2en0btiam1',
          name: 'Groceries',
          color: 'blue',
          target: 600,
          createdAt: '2022-05-24T22:28:43.976Z',
          updatedAt: '2022-05-24T22:28:43.976Z',
          instanceId: 'cl3kpyexq00269u2en0btiam5',
          expenses: [
            {
              id: 'cl3m3d7kd193291o4clrxxcuh',
              name: 'Amazon',
              amount: 78.24,
              createdAt: '2022-05-25T21:21:44.077Z',
              updatedAt: '2022-05-25T21:21:44.077Z',
              categoryId: 'cl3kpyexq00269u2en0btiam1',
            },
            {
              id: 'cl3nhnq0r0266jgo4myg54i27',
              name: 'Amazon',
              amount: 103.12,
              createdAt: '2022-05-26T20:49:35.355Z',
              updatedAt: '2022-05-26T20:49:35.355Z',
              categoryId: 'cl3kpyexq00269u2en0btiam1',
            },
          ],
        },
        {
          id: 'cl3kqoaxd0316092ec6awu2nw',
          name: 'Restaurants',
          color: 'purple',
          target: 300,
          createdAt: '2022-05-24T22:38:40.465Z',
          updatedAt: '2022-05-24T22:38:40.466Z',
          instanceId: 'cl3kpyexq00269u2en0btiam5',
          expenses: [
            {
              id: 'cl3m3w8o8263591o4vphrc5iq',
              name: 'Taco Bell',
              amount: 24.72,
              createdAt: '2022-05-25T21:36:31.976Z',
              updatedAt: '2022-05-25T21:36:31.976Z',
              categoryId: 'cl3kqoaxd0316092ec6awu2nw',
            },
            {
              id: 'cl3m4s6ln387491o4b35yuj0d',
              name: 'Posto',
              amount: 300,
              createdAt: '2022-05-25T22:01:22.283Z',
              updatedAt: '2022-05-25T22:01:22.283Z',
              categoryId: 'cl3kqoaxd0316092ec6awu2nw',
            },
          ],
        },
        {
          id: 'cl3kqt5wy0573092ejk1sjnbr',
          name: 'Miscellaneous',
          color: 'pink',
          target: 1000,
          createdAt: '2022-05-24T22:42:27.250Z',
          updatedAt: '2022-05-24T22:42:27.250Z',
          instanceId: 'cl3kpyexq00269u2en0btiam5',
          expenses: [
            {
              id: 'cl3nhob5q0293jgo4ffejz1bv',
              name: 'Tech Course',
              amount: 99.99,
              createdAt: '2022-05-26T20:50:02.750Z',
              updatedAt: '2022-05-26T20:50:02.750Z',
              categoryId: 'cl3kqt5wy0573092ejk1sjnbr',
            },
            {
              id: 'cl3nlowo25822jgo4xamduhus',
              name: 'New LV Bag',
              amount: 1500,
              createdAt: '2022-05-26T22:42:29.090Z',
              updatedAt: '2022-05-26T22:42:29.090Z',
              categoryId: 'cl3kqt5wy0573092ejk1sjnbr',
            },
          ],
        },
      ])
    );
  }),
];
