import client from './client';

export const refreshTokenApi = async (refreshToken: string) => {
  const response = await client.post('/auth/refresh', null, {
    params: {
      refreshToken: refreshToken,
    },
  });
  return response.data;
};

//회원가입-아이디 중복 확인
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

//회원가입 버튼
export const join = async (info: any) => {
  const response = await client.post('/member/join', info.formdata, {
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

//로그아웃
export const logout = async (info: any) => {
  const response = await client.post('/logout', info.memberId, {
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return response.data;
};
