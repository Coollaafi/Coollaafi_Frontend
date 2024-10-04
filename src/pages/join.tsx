import styled from 'styled-components';
import Header from 'components/Header';

const Container = styled.div`
  width: 360px;
  height: 100%;
`;

export default function JoinPage() {
  return (
    <Container>
      <Header type="black" />
    </Container>
  );
}
