import styled from 'styled-components';
import Header from 'components/Header';
import { Date, Day, Main_title_med } from 'styles/typography';
import { ReactComponent as SunIcon } from '../assets/icons/sun.svg';

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
`;

const CalBox = styled.div`
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

const WeatherBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 82px;
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

export default function RecommendPage() {
  return (
    <Container>
      <Header />
      <Box>
        {/*api 연결 시, 날짜에 맞게 변화하도록*/}
        <CalBox>
          <Date>2024</Date>
          <Cal>
            <Date>6. 13</Date>
            <CalDay>
              <Day>MON</Day>
            </CalDay>
          </Cal>
        </CalBox>
        {/*api 연결 시, 날씨에 맞게 변화하도록*/}
        <WeatherBox>
          <Weather>
            <Main_title_med>날씨 맑음</Main_title_med>
            <SunIcon />
          </Weather>
          <Temp>
            <Main_title_med>12°</Main_title_med>
            <Line />
            <Main_title_med>23°</Main_title_med>
          </Temp>
        </WeatherBox>
      </Box>
      {/*api 연결 시, 콜라쥬 이미지 넣도록*/}
      <Image />
    </Container>
  );
}
