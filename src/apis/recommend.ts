import axios from 'axios';
import client from './client';

//kakao에서 주소 받아오기
export const getAddress = async (address: { lng: string; lat: string }) => {
  const response = await axios.get(
    `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${address.lng}&y=${address.lat}`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
      },
    },
  );
  return response.data.documents[0];
};

//openWeather에서 날씨 받아오기
export const getWeather = async (address: { lng: string; lat: string }) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${address.lat}&lon=${address.lng}&lang=kr&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`,
  );
  return response.data;
};

//ootd 업로드
export const ootd = async (info: any) => {
  const response = await client.post('/ootd/', info.formData, {
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

//AI의 today's 옷추천
export const recommendOutfit = async (info: any) => {
  const response = await client.get('/recommend-outfit', {
    params: {
      memberId: info.memberId,
      latitude: info.latitude,
      longitude: info.longitude,
    },
    headers: {
      Authorization: `Bearer ${info.accessToken}`,
    },
  });
  return response.data;
};
