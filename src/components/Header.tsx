import styled from 'styled-components';
import { ReactComponent as Logo } from '../assets/icons/header-logo.svg';
import { ReactComponent as DressIcon } from '../assets/icons/dress.svg';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 70px;
  background-color: transparent;
  padding: 12px 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  top: 0;
  left: 0;
`;

export default function Header() {
  return (
    <Container>
      <Link to="/home">
        <Logo />
      </Link>
      <Link to="/community">
        <DressIcon width="24px" height="24px" stroke="black" />
      </Link>
    </Container>
  );
}
