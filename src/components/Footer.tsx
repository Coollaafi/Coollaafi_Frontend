import { logout } from 'apis/auth';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'store/user';
import styled from 'styled-components';
import { Noto_Receipt } from 'styles/typography';

const Container = styled.div<{ type: string }>`
  width: 360px;
  height: 64px;
  padding: 18px 16px 0 16px;
  background-color: ${(props) =>
    props.type == 'black' ? 'rgba(0, 0, 0, 0.6)' : '#FBFBFB'};
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

type FooterType = 'black' | 'white';

export default function Footer(type: { kind: FooterType }) {
  const navigate = useNavigate();

  const onClickLogout = async () => {
    try {
      const data = await logout();
      useUserStore.persist.clearStorage();
      navigate('/login');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container type={type.kind}>
      <Box>
        <Button onClick={onClickLogout}>
          <Noto_Receipt>로그아웃</Noto_Receipt>
        </Button>
        <EmailBox>
          <Noto_Receipt>문의</Noto_Receipt>
          <Noto_Receipt>
            <Email>wot83323@gmail.com</Email>
          </Noto_Receipt>
          {/*이메일 변경 필요 */}
        </EmailBox>
      </Box>
      <SecondBox>
        <Noto_Receipt>
          <Button>회원탈퇴</Button>
        </Noto_Receipt>
      </SecondBox>
    </Container>
  );
}
