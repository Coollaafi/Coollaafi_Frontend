import styled from 'styled-components';
import { CTA_button_med, Main_title_med } from 'styles/typography';
import { ReactComponent as PencilIcon } from '../assets/icons/pencil.svg';
import { ReactComponent as FriendIcon } from '../assets/icons/friend.svg';
import { ReactComponent as PlusIcon } from '../assets/icons/friend-plus.svg';
import { Desc_120_med } from 'styles/typography';
import UploadModal from 'components/community/UploadModal';
import useModal from 'hooks/useModal';
import Header from 'components/Header';
import Post from 'components/community/Post';
import Footer from 'components/Footer';
import { useState } from 'react';
import AddFriendModal from 'components/community/AddFriendModal';
import data from '../data/post.json';
import { format } from 'date-fns';

const Container = styled.div`
  width: 360px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 16px;
  width: 100%;
  height: 91px;
  padding: 8px 16px 16px 16px;
  color: black;
  margin-top: 70px;
`;

const BarBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const BtnTitle = styled.div`
  display: flex;
  height: 24px;
  align-items: center;
`;

const PlusFriendIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MarginBox = styled.div`
  margin-right: -10px;
  height: 24px;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const CheckBoxs = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 4px;
  width: 108px;
  height: 32px;
  border-radius: 80px;
  background-color: #efefef;
`;

const CheckBox = styled.div<{ isClicked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 24px;
  border-radius: 40px;
  background-color: ${(props) => (props.isClicked ? '#000000' : '#ffffff')};
  color: ${(props) => (props.isClicked ? '#ffffff' : '#919191')};
  cursor: pointer;
  &:hover {
    background-color: #000;
    color: #ffffff;
  }
`;

const UploadBtn = styled.button`
  gap: 8px;
  background-color: #000;
  color: #fff;
  box-sizing: content-box;
  padding: 11px 15px;
  border: 1px solid #000;
  border-radius: 40px;
  position: fixed;
  bottom: 24px;
  z-index: 1;
`;

export default function CommunityPage() {
  const {
    isOpen: isUploadOpen,
    closeModal: closeUploadModal,
    openModal: openUploadModal,
  } = useModal();
  const {
    isOpen: isAddFriendOpen,
    closeModal: closeAddFriendModal,
    openModal: openAddFriendModal,
  } = useModal();
  const [isAll, setIsAll] = useState<boolean>(true);

  const postList = data.result;

  return (
    <Container>
      <Header type={'white'} />
      <TitleBox>
        <Main_title_med>이번주 친구들의 룩북 구경하기</Main_title_med>
        <BarBox>
          <CheckBoxs>
            <CheckBox isClicked={!isAll} onClick={() => setIsAll(false)}>
              <Desc_120_med>내 위치</Desc_120_med>
            </CheckBox>
            <CheckBox isClicked={isAll} onClick={() => setIsAll(true)}>
              <Desc_120_med>전체위치</Desc_120_med>
            </CheckBox>
          </CheckBoxs>
          <IconBox onClick={openAddFriendModal}>
            <BtnTitle>
              <Main_title_med>친구추가하기</Main_title_med>
            </BtnTitle>
            <PlusFriendIcon>
              <MarginBox>
                <PlusIcon />
              </MarginBox>
              <FriendIcon />
            </PlusFriendIcon>
          </IconBox>
        </BarBox>
      </TitleBox>
      {postList.map((item) => {
        const member = item.member;
        const post = item.post;

        return (
          <Post
            key={post.postId}
            profileImage={member.memberImage}
            id={member.memberServiceId}
            nickname={member.alias}
            date={format(new Date(post.createdAt), 'yyyy년 MM월 dd일')}
            weather={post.postCondition}
            ootdImage={post.ootdImage}
            collageImage={post.lookbookImage}
            location={post.location}
            like={post.preferCount}
            comment={post.commentCount}
            postId={post.postId}
            tempMin={post.MinTemp}
            tempMax={post.MaxTemp}
          />
        );
      })}
      <Footer kind={'white'} />
      <UploadBtn onClick={openUploadModal}>
        <CTA_button_med>룩북 올리기</CTA_button_med>
        <PencilIcon />
      </UploadBtn>
      {isUploadOpen && <UploadModal closeModal={closeUploadModal} />}
      {isAddFriendOpen && <AddFriendModal closeModal={closeAddFriendModal} />}
    </Container>
  );
}
