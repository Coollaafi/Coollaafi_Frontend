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

export const ootd = async (info: any) => {
  const response = await client.post('/ootd/', info.formdata, {
    params: {
      memberId: info.memberId,
      categorySet: info.categorySet,
    },
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return response.data;
};

export const uploadPosts = async (info: any) => {
  const response = await client.post('/posts', info.formdata, {
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return response.data;
};
