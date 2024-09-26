import styled from 'styled-components';
import NicknameBox from 'components/NicknameBox';
import { Main_title_med } from 'styles/typography';
import { Desc_150_reg } from 'styles/typography';

const Container = styled.div<{ isClicked: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  padding: 16px 16px 8px 16px;
  background-color: ${(props) => (props.isClicked ? '#fbfbfb' : '#fff')};
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 100%;
  object-fit: cover;
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TextBox = styled.div`
  padding-left: 48px;
`;

type CommentProps = {
  commentId: number;
  parentId: number | null;
  profileImg: string;
  nickname: string;
  id: string;
  content: string;
  isClicked: boolean | undefined;
};

export default function Comment({
  commentId,
  parentId,
  profileImg,
  nickname,
  id,
  content,
  isClicked,
}: CommentProps) {
  return (
    <Container isClicked={isClicked ? isClicked : false}>
      <Header>
        <ProfileImg src={profileImg} />
        <NameBox>
          <Main_title_med>{id}</Main_title_med>
          <NicknameBox nickname={nickname} />
        </NameBox>
      </Header>
      <TextBox>
        <Desc_150_reg>{content}</Desc_150_reg>
      </TextBox>
    </Container>
  );
}
