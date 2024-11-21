import client from './client';

export const refreshToken = async (refreshToken: string) => {
  const response = await client.post('/auth/refresh', {
    refreshToken: refreshToken,
  });

  return response.data;
};

export const checkServiceId = async (info: any) => {
  const response = await client.get('/member/check-service-id', {
    params: {
      serviceId: info.serviceId,
    },
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });

  return response.data;
};

export const join = async (info: any) => {
  const response = await client.post('/member/join', info.formdata, {
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return response.data;
};
