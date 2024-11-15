import styled from 'styled-components';
import { Desc_150_reg, Chip_button_med } from 'styles/typography';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { ReactComponent as KakaoIcon } from '../../assets/icons/kakao.svg';
import BackgroundImage from '../../assets/images/login.svg';

/*height를 부모요소에서 61px를 뺀 값으로 해서 Detail에서 margin-top: 61px를 했을 때, 
상단 마진을 줘서 요소가 부모 요소의 height를 초과해 잘리는 문제를 해결함*/
const Container = styled.div`
  width: 360px;
  height: 100% - 61px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  padding: 0 30px;
`;

const Detail = styled.div`
  margin: 61px 0 18.1px 0;
  text-align: center;
`;

const Explains = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 267px 0 90px 0;
`;

const Explain = styled.div`
  color: #fff;
  text-align: center;
`;

const Button = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 328px;
  height: 48px;
  background-color: #fee500;
  margin-bottom: 48px;
  text-decoration: none;
  outline: none;
  color: #000;
`;

const Icon = styled.div`
  margin-right: 7px;
`;

export default function LoginPage() {
  const KAKAO_AUTH_URL = `${process.env.REACT_APP_API_URL}/oauth2/authorization/kakao`;

  return (
    <Container>
      <Detail>
        <Desc_150_reg>
          날씨에 맞는 옷을 쉽게 고를 수 있도록
          <br /> 도와주는 AI 기반 옷 추천 SNS, 왓
        </Desc_150_reg>
      </Detail>
      <Logo />
      <Explains>
        <Explain>
          <Desc_150_reg>
            왓에서는 내 옷장에 있는 옷들 중
            <br /> 오늘 날씨에 딱맞는 옷을
            <br /> 추천 받을 수 있습니다.
          </Desc_150_reg>
        </Explain>
        <Explain>
          <Desc_150_reg>
            왓에서 매일 아침 당신이 입을 옷을 추천 받고
            <br /> 당신의 OOTD를 친구들과
            <br /> 공유해 보세요.
          </Desc_150_reg>
        </Explain>
      </Explains>
      <Button href={KAKAO_AUTH_URL}>
        <Icon>
          <KakaoIcon />
        </Icon>
        <Chip_button_med>카카오로 시작하기</Chip_button_med>
      </Button>
    </Container>
  );
}
