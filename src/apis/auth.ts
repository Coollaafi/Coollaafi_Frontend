import client from './client';

export const refreshToken = async (refreshToken: string) => {
  const response = await client.post('/auth/refresh', {
    refreshToken: refreshToken,
  });

  return response.data;
};
