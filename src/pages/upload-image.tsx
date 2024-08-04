import styled from 'styled-components';
import BackgroundImage from '../assets/images/upload.svg';
import Header from 'components/Header';
import {
  Main_title_med,
  User_id_title_med,
  CTA_button_med,
  Desc_150_med,
} from 'styles/typography';
import { ReactComponent as UploadIcon } from '../assets/icons/upload.svg';
import { ReactComponent as ImageIcon } from '../assets/icons/image.svg';

const Container = styled.div`
  width: 360px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  padding: 0 16px;
`;

const TextBox = styled.div`
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 202px 0 32px 0;
`;

const User = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 1px;
`;

const ImageBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Drag = styled.div`
  width: 214px;
  height: 87px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1px dashed black;
`;

const Button = styled.div`
  width: 98px;
  height: 87px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: white;
  cursor: pointer;
`;

const GuideBox = styled.div`
  width: 100%;
  margin: 82px 0 190px 0;
  color: white;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 6px;
`;

const Star = styled.div`
  width: 8.5px;
  color: #ff0000;
`;

const Text = styled.div`
  color: #9f9f9f;
`;

export default function UploadImagePage() {
  return (
    <Container>
      <Header />
      <TextBox>
        <User>
          <User_id_title_med>평범한 패피 김이화</User_id_title_med>
          {/*로그인 구현 시, 별명 이름으로 변경 */}
          <Main_title_med>만의</Main_title_med>
        </User>
        <Main_title_med>
          AI를 발전시킬 옷이 나온
          <br /> 최근 사진들을 올려주세요
        </Main_title_med>
      </TextBox>
      <ImageBox>
        <Drag>
          <UploadIcon />
          <CTA_button_med>업로드할 파일을 끌어 놓아주세요</CTA_button_med>
        </Drag>
        <Button>
          <ImageIcon fill="white" />
          <CTA_button_med>파일 선택하기</CTA_button_med>
        </Button>
      </ImageBox>
      <GuideBox>
        <Main_title_med>
          <Title>
            <Star>*</Star>사진 업로드 가이드
          </Title>
        </Main_title_med>
        <Text>
          <Desc_150_med>
            1. 다른 날짜에 찍은 사진들을 올려주세요.
            <br /> 2. 상의, 하의, 아우터 중 하나라도 완전히
            <br /> 나온 사진으로 올려주세요.
            <br /> 3. 얼굴은 나오지 않아도 됩니다.
            <br /> 4. 누적 50장의 사진을 업로드하면 날씨에 맞는 옷을
            <br /> 추천받을 수 있습니다.
          </Desc_150_med>
        </Text>
      </GuideBox>
    </Container>
  );
}
