import client from './client';

//전체 게시글
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

//게시글 detail
export const postDetail = async (info: any) => {
  const reponse = await client.get(`/posts/${info.postId}`, {
    params: {
      memberId: info.memberId,
      postId: info.postId,
    },

    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return reponse.data;
};

//게시글 댓글
export const comment = async (info: any) => {
  const response = await client.post('/comment/', null, {
    params: {
      postId: info.postId,
      memberId: info.memberId,
      content: info.content,
    },
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return response.data;
};

//게시글 대댓글
export const reply = async (info: any) => {
  const response = await client.post('/comment/reply/', null, {
    params: {
      commentId: info.commentId,
      memberId: info.memberId,
      content: info.content,
    },
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return response.data;
};

//게시글 좋아요 등록
export const addPrefer = async (info: any) => {
  const response = await client.post(
    '/post/prefer',
    { postId: info.postId, memberId: info.memberId },
    {
      headers: {
        Authorization: `Bearer ${info.accessToken}`,
      },
    },
  );
  return response.data;
};

//게시글 좋아요 삭제
export const deletePrefer = async (info: any) => {
  const response = await client.delete(`/post/prefer/delete`, {
    data: {
      postId: info.postId,
      memberId: info.memberId,
    },
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return response.data;
};

//게시글 업로드
export const uploadPosts = async (info: any) => {
  const response = await client.post('/posts', info.formData, {
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

//친구 찾기
export const search = async (info: any) => {
  const response = await client.get('/member/search', {
    params: {
      query: info.query,
    },
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return response.data;
};

//나에게 친구요청한 친구 조회
export const receiveFriend = async (info: any) => {
  const response = await client.get('/friends/receive', {
    params: {
      memberId: info.memberId,
    },
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return response.data;
};

//내가 친구요청한 친구 조회
export const sendFriend = async (info: any) => {
  const response = await client.get('/friends/send', {
    params: {
      memberId: info.memberId,
    },
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return response.data;
};

//친구요청
export const requestFriend = async (info: any) => {
  const response = await client.post('/friends/request', null, {
    params: {
      senderId: info.senderId,
      receiverId: info.receiverId,
    },
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return response.data;
};

//친구요청 수락
export const acceptFriend = async (info: any) => {
  const response = await client.post('/friends/request/accept', null, {
    params: {
      senderId: info.senderId,
      receiverId: info.receiverId,
    },
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return response.data;
};

//친구요청 거절
export const rejectFriend = async (info: any) => {
  const response = await client.delete('/friends/request/reject', {
    params: {
      senderId: info.senderId,
      receiverId: info.receiverId,
    },
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return response.data;
};

//친구삭제
export const deleteFriend = async (info: any) => {
  const response = await client.delete('/friends/delete', {
    params: {
      memberId1: info.memberId1,
      memberId2: info.memberId2,
    },
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return response.data;
};

//친구목록
export const friend = async (info: any) => {
  const response = await client.get(`/member/${info.memberId}/friends`, {
    params: {
      memberId: info.memberId,
    },
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return response.data;
};
