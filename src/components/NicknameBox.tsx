import styled from 'styled-components';
import { Chip_button_med } from 'styles/typography';

const NickName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 24px;
  border-radius: 40px;
  border: 1px solid #ededed;
  background-color: #f8f8f8;
  color: #919191;
`;

type NicknameBoxProps = {
  nickname: string;
};

export default function NicknameBox({ nickname }: NicknameBoxProps) {
  return (
    <NickName>
      <Chip_button_med>{nickname}</Chip_button_med>
    </NickName>
  );
}
