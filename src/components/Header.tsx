import styled from 'styled-components';
import { ReactComponent as Logo } from '../assets/icons/header-logo.svg';
import { ReactComponent as DressIcon } from '../assets/icons/dress.svg';
import { Link } from 'react-router-dom';

const Container = styled.div<{ type: string }>`
  width: 360px;
  height: 70px;
  background-color: ${(props) =>
    props.type == 'white'
      ? 'white'
      : props.type == 'black'
        ? 'black'
        : 'transparent'};
  padding: 12px 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 100;
  top: 0;
`;

type HeaderType = 'white' | 'trans' | 'black';

type HeaderProps = {
  type: HeaderType;
};

export default function Header({ type }: HeaderProps) {
  return (
    <Container type={type}>
      {type == 'black' ? (
        <Logo width="85" height="30" viewBox="0 0 85 30" fill="white" />
      ) : (
        <Link to="/home">
          <Logo width="85" height="30" viewBox="0 0 85 30" fill="black" />
        </Link>
      )}
      {type != 'black' && (
        <Link to="/community">
          <DressIcon width="24px" height="24px" stroke="black" />
        </Link>
      )}
    </Container>
  );
}
