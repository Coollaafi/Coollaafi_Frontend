import styled from 'styled-components';
import BackgroundImage from '../assets/images/upload.svg';
import Header from 'components/Header';

const Container = styled.div`
  width: 360px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
`;

export default function UploadImagePage() {
  return (
    <Container>
      <Header />
    </Container>
  );
}
