import styled from 'styled-components';
import { Receipt } from 'styles/typography';

const Container = styled.div`
  width: 360px;
  height: 64px;
  padding: 18px 16px 0 16px;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  z-index: 100;
  bottom: 0;
  color: #9f9f9f;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 3px;
`;

const SecondBox = styled.div`
  width: 100%;
  text-align: right;
`;

const EmailBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 7.04px;
`;

const Email = styled.div`
  user-select: text;
  -ms-overflow-style: text;
`;

const Button = styled.div`
  cursor: pointer;
`;

export default function Footer() {
  return (
    <Container>
      <Box>
        <Receipt>
          <Button>로그아웃</Button>
        </Receipt>
        <EmailBox>
          <Receipt>문의</Receipt>
          <Receipt>
            <Email>WOT.ehwa@gmail.com</Email>
          </Receipt>
          {/*이메일 변경 필요 */}
        </EmailBox>
      </Box>
      <SecondBox>
        <Receipt>
          <Button>회원탈퇴</Button>
        </Receipt>
      </SecondBox>
    </Container>
  );
}
