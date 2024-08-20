import styled from 'styled-components';
import Header from 'components/Header';
import { DTL_Date, DTL_Day, Main_title_med } from 'styles/typography';
import { ReactComponent as SunIcon } from '../assets/icons/sun.svg';
import { getAddress, getWeather } from 'apis/recommend';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

const Container = styled.div`
  width: 360px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  width: 100%;
  padding: 0 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const FirBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 62px;
`;

const Cal = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-top: -12px;
`;

const CalDay = styled.div`
  margin-top: 11px;
`;

const SecBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 140px;
  align-items: end;
`;

const Weather = styled.div`
  height: 17px;
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

const Temp = styled.div`
  height: 19px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const Line = styled.div`
  width: 25px;
  height: 2px;
  border-radius: 8px;
  border: none;
  background-image: linear-gradient(to right, #547bc7, #a82e2e);
`;

const Image = styled.div`
  width: 100%;
  height: 597.046px;
`;

const Location = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;
`;

export default function RecommendPage() {
  const [city, setCity] = useState('');
  const [gu, setGu] = useState('');
  const [tempMax, setTempMax] = useState<number>();
  const [tempMin, setTempMin] = useState<number>();
  const [weatherDes, setWeatherDes] = useState<string>('');
  const [weatherImg, setWeatherImg] = useState<string>('');
  const dayList = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const year = new Date().getFullYear().toString();
  const month = (new Date().getMonth() + 1).toString();
  const date = new Date().getDate().toString();
  const day = dayList[new Date().getDay()];

  useEffect(() => {
    getLocation();
  }, []);

  //이용자 위치 가져오기
  const addressMutation = useMutation(getAddress, {
    onSuccess: (data) => {
      setCity(data.region_1depth_name);
      setGu(data.region_2depth_name);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  //이용자 위치의 날씨 가져오기
  const weatherMutation = useMutation(getWeather, {
    onSuccess: (data) => {
      setTempMax(Math.round(data.main.temp_max));
      setTempMin(Math.round(data.main.temp_min));
      setWeatherDes(data.weather[0].description);
      setWeatherImg(data.weather[0].icon);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  //이용자의 경도,위도 가져오기_주소/날씨가져오는 api에 경도,위도 넣기
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          addressMutation.mutate({
            lng: position.coords.longitude.toString(),
            lat: position.coords.latitude.toString(),
          });
          weatherMutation.mutate({
            lng: position.coords.longitude.toString(),
            lat: position.coords.latitude.toString(),
          });
        },
        function (error) {
          console.log(error);
        },
        {
          enableHighAccuracy: false, //배터리를 더 소모해서 더 정확한 위치를 찾을 것인지_true로 하면 더 정확하지만 더 오래걸림
          maximumAge: 0, //캐시된 위치 정보의 유효시간 지정_0으로 지정시, 캐시 사용없이 실시간으로
          timeout: Infinity, //주어진 초 안에 찾지 못하면 에러 발생_위치 반환 시 소모할 수 있는 최대 시간
        },
      );
    } else {
      alert('현재 브라우저에서는 geolocation을 지원하지 않습니다');
    }
    return;
  }

  return (
    <Container>
      <Header kind={'white'} />
      <Box>
        {/*api 연결 시, 날짜에 맞게 변화하도록*/}
        <FirBox>
          <DTL_Date>{year}</DTL_Date>
          <Cal>
            <DTL_Date>
              {month}.{date}
            </DTL_Date>
            <CalDay>
              <DTL_Day>{day}</DTL_Day>
            </CalDay>
          </Cal>
          <Weather>
            <Main_title_med>{weatherDes}</Main_title_med>
            <SunIcon />
          </Weather>
        </FirBox>
        {/*api 연결 시, 날씨에 맞게 변화하도록*/}
        <SecBox>
          <Location>
            <Main_title_med>{city}</Main_title_med>
            <Main_title_med>{gu}</Main_title_med>
          </Location>
          <Temp>
            <Main_title_med>{tempMin}°</Main_title_med>
            <Line />
            <Main_title_med>{tempMax}°</Main_title_med>
          </Temp>
        </SecBox>
      </Box>
      {/*api 연결 시, 콜라쥬 이미지 넣도록*/}
      <Image />
    </Container>
  );
}
