export const unauthenticatdSession = {
  data: null
}

export const authenticatedSession = {
    data: {
      user: {
        name: 'John Doe',
        email: 'john@gmail.com',
        image: 'https://avatars0.githubusercontent.com/u/1234567?v=4',
      },
      expires: '2023-01-01T00:00:00.000Z',
      id: '123456789',
    },
    status: 'authenticated',
  };