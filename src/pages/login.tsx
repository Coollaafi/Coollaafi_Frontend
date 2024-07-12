import styled from 'styled-components';

/*height를 부모요소에서 61px를 뺀 값으로 해서 Detail에서 margin-top: 61px를 했을 때, 
상단 마진을 줘서 요소가 부모 요소의 height를 초과해 잘리는 문제를 해결함*/
const Container = styled.div`
  width: 360px;
  height: cal(100% - 61px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('/assets/images/login.svg');
  background-size: cover;
  background-position: center;
`;

const Logo = styled.text`
  font-family: 'DTL';
  font-size: 133.101px;
  letter-spacing: -10.648px;
`;

const Detail = styled.text`
  font-family: 'Noto-Thin';
  font-size: 12px;
  margin: 61px 0 -13px 0;
  text-align: center;
`;

const Explains = styled.text`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 23px;
  margin: 263px 0 100px 0;
`;

const Explain = styled.text`
  font-family: 'Noto-Thin';
  font-size: 12px;
  text-align: left;
  color: #fff;
`;

const Button = styled.button`
  width: 328px;
  height: 48px;
  background-color: #fee500;
  font-family: 'Noto-Thin';
  font-size: 14px;
  margin-bottom: 48px;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 7px;
`;

export default function LoginPage() {
  const Rest_api_key = process.env.Rest_api_key;
  const redirect_url = 'http://localhost:3000';
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_url}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoUrl;
  };

  return (
    <Container>
      <Detail>
        날씨에 맞는 옷을 쉽게 고를 수 있도록 <br />
        도와주는 AI 기반 옷 추천 SNS, 왓
      </Detail>
      <Logo>WOT</Logo>
      <Explains>
        <Explain>
          왓에서는 내 옷장에 있는 옷들 중 오늘 날씨에
          <br /> 딱맞는 옷을 추천 받을 수 있습니다.
        </Explain>
        <Explain>
          왓에서 매일 아침 당신이 입을 옷을 추천 받고
          <br /> 당신의 OOTD를 친구들과
          <br /> 공유해 보세요.
        </Explain>
      </Explains>
      <Button onClick={handleLogin}>
        <Icon src="/assets/icons/kakao.svg" />
        카카오로 시작하기
      </Button>
    </Container>
  );
}
