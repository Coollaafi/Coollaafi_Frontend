import client from './client';

export const posts = async (info: any) => {
  const response = await client.get('/posts/', {
    params: {
      memberId: info.memberId,
    },
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return response.data;
};
