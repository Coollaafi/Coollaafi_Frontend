import axios from 'axios';

//kakao에서 주소 받아오기
export const getAddress = async (address: { lng: string; lat: string }) => {
  const response = await axios.get(
    `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${address.lng}&y=${address.lat}`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API}`,
      },
    },
  );
  return response.data.documents[0];
};
