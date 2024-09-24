import styled from 'styled-components';
import { ReactComponent as Logo } from '../assets/icons/header-logo.svg';
import { ReactComponent as DressIcon } from '../assets/icons/dress.svg';
import { Link } from 'react-router-dom';

const Container = styled.div<{ type: string }>`
  width: 360px;
  height: 70px;
  background-color: ${(props) =>
    props.type == 'trans' ? 'transparent' : 'white'};
  padding: 12px 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 100;
  top: 0;
`;

type HeaderType = 'white' | 'trans';

type HeaderProps = {
  type: HeaderType;
};

export default function Header({ type }: HeaderProps) {
  return (
    <Container type={type}>
      <Link to="/home">
        <Logo />
      </Link>
      <Link to="/community">
        <DressIcon width="24px" height="24px" stroke="black" />
      </Link>
    </Container>
  );
}
