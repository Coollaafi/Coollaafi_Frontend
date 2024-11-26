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

//프로필 수정-사진
export const editProfile = async (info: any) => {
  const response = await client.post('/member/edit-profile', info.formData, {
    params: {
      memberId: info.memberId,
    },
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

//프로필 수정-닉네임,아이디
export const editNicknameId = async (info: any) => {
  const response = await client.post(
    '/member/edit-nickname-id',
    {
      memberId: info.memberId,
      serviceId: info.serviceId,
      nickname: info.nickname,
    },
    {
      headers: {
        Authorization: `Bearer ${info.accessToken}`,
      },
    },
  );

  return response.data;
};
