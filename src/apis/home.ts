import client from './client';

export const home = async (info: any) => {
  const response = await client.get(`/member/${info.memberId}`, {
    params: {
      memberId: info.memberId,
    },
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return response.data;
};
