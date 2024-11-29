import styled from 'styled-components';
import Header from 'components/Header';
import { DTL_Date, DTL_Day, Main_title_med } from 'styles/typography';
import { getAddress, getWeather, recommendOutfit } from 'apis/recommend';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useUserStore } from 'store/user';
import { PulseLoader } from 'react-spinners';

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

const Outfit = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-bottom: 2px solid #f4f4f4;
`;

const Image = styled.img<{ type: string }>`
  width: ${(props) =>
    props.type == 'shoes' ? '50px' : props.type == 'top' ? '170px' : '130px'};
`;

const Location = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;
`;

const BlankBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 225px);
`;

export default function RecommendPage() {
  const [outfitListf, setOutfitListf] = useState<string[]>();
  const [outfitLists, setOutfitLists] = useState<string[]>();
  const [outfitListth, setOutfitListth] = useState<string[]>();
  const [shoes, setShoes] = useState<string[]>([]);
  const [top, setTop] = useState<string[]>([]);
  const [bottom, setBottom] = useState<string[]>([]);
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
  const memberId = useUserStore((state) => state.memberId);
  const accessToken = useUserStore((state) => state.accessToken);

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
          recommendOutfitMutation.mutate({
            memberId: memberId,
            accessToken: accessToken,
            longitude: position.coords.longitude.toString(),
            latitude: position.coords.latitude.toString(),
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

  const recommendOutfitMutation = useMutation(recommendOutfit, {
    onSuccess: (data) => {
      setOutfitListf(data.result.slice(0, 3));
      setOutfitLists(data.result.slice(3, 6));
      setOutfitListth(data.result.slice(6, 9));
      console.log(data.result);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    outfitListf?.map((outfit) => {
      if (outfit[outfit.length - 5] == 's') {
        shoes[0] = outfit;
        setShoes([...shoes]);
      }
      if (outfit[outfit.length - 5] == 'p') {
        top[0] = outfit;
        setTop([...top]);
      }
      if (outfit[outfit.length - 5] == 'm') {
        bottom[0] = outfit;
        setBottom([...bottom]);
      }
    });
    outfitLists?.map((outfit) => {
      if (outfit[outfit.length - 5] == 's') {
        shoes[1] = outfit;
        setShoes([...shoes]);
      }
      if (outfit[outfit.length - 5] == 'p') {
        top[1] = outfit;
        setTop([...top]);
      }
      if (outfit[outfit.length - 5] == 'm') {
        bottom[1] = outfit;
        setBottom([...bottom]);
      }
    });
    outfitListth?.map((outfit) => {
      if (outfit[outfit.length - 5] == 's') {
        shoes[2] = outfit;
        setShoes([...shoes]);
      }
      if (outfit[outfit.length - 5] == 'p') {
        top[2] = outfit;
        setTop([...top]);
      }
      if (outfit[outfit.length - 5] == 'm') {
        bottom[2] = outfit;
        setBottom([...bottom]);
      }
    });
  }, [outfitListf, outfitLists, outfitListth]);

  return (
    <Container>
      <Header type={'white'} />
      <Box>
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
          </Weather>
        </FirBox>
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
      {recommendOutfitMutation.isLoading ? (
        <BlankBox>
          <PulseLoader color="#4d4d4d" size={12} />
        </BlankBox>
      ) : (
        [0, 1, 2].map((index, id) => {
          return (
            <Outfit key={id}>
              <Image src={top[index]} type="top" />
              <Image src={bottom[index]} type="bottom" />
              <Image src={shoes[index]} type="shoes" />
            </Outfit>
          );
        })
      )}
    </Container>
  );
}
