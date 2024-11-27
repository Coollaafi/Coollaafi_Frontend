import styled from 'styled-components';
import {
  CTA_button_med,
  Desc_120_med,
  Desc_150_reg,
  Main_title_med,
} from 'styles/typography';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { followRequest, search } from 'apis/community';
import { useUserStore } from 'store/user';
import default_profile from '../../assets/images/default-profile.svg';

const Container = styled.div`
  width: 360px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  z-index: 1000;
`;

const ModalBox = styled.div`
  width: 328px;
  height: 655px;
  background-color: #fff;
  border: none;
  border-radius: 16px;
  padding: 16px 16px;
`;

const CloseBtn = styled.text`
  display: flex;
  justify-content: end;
  margin: 8px 8px 0 0;
  cursor: pointer;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-bottom: 28px;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-family: 'Noto_Med';
  font-size: 12px;
  line-height: 150%;
  letter-spacing: -0.96px;
  height: 48px;
  background-color: #fbfbfb;
  margin-top: 12px;
  padding-left: 14px;
  &::placeholder {
    color: #9f9f9f;
  }
`;

const Box = styled.div`
  width: 100%;
  height: 240px;
  margin-top: 15px;
  gap: 5px;
  overflow: scroll;
`;

const FriendBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 60px;
  justify-content: space-between;
`;

const ProfileImg = styled.img`
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 100%;
  object-fit: cover;
`;

const NicknameBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  gap: 2px;
`;

const Btn = styled.div`
  height: 30px;
  width: 40px;
  background-color: #000000;
  color: #ffffff;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

type AddFriendModalProps = {
  closeModal: () => void;
};

type FriendListProps = {
  memberServiceId: string;
  memberNickName: string;
  memberImage: string;
  alias: string;
}[];

export default function AddFriendModal({ closeModal }: AddFriendModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [friendList, setFriendList] = useState<FriendListProps>();
  const accessToken = useUserStore((state) => state.accessToken);
  const memberId = useUserStore((state) => state.memberId);

  const searchMutation = useMutation(search, {
    onSuccess: (data) => {
      setFriendList(data.result);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const followRequestMutation = useMutation(followRequest, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const onClickBtn = (followeeId: number) => {
    followRequestMutation.mutate({
      accessToken: accessToken,
      followerId: memberId,
    });
  };

  useEffect(() => {
    searchMutation.mutate({
      query: inputRef.current?.value,
      accessToken: accessToken,
    });
  }, [inputRef.current?.value]);

  return (
    <Container>
      <ModalBox>
        <CloseBtn onClick={closeModal}>
          <CTA_button_med>닫기</CTA_button_med>
        </CloseBtn>
        <TitleBox>
          <Main_title_med>친구 추가하기</Main_title_med>
          <Desc_120_med>OOTD를 공유할 친구를 추가해보세요.</Desc_120_med>
        </TitleBox>
        <Input
          type="text"
          ref={inputRef}
          placeholder="친구 아이디/닉네임을 입력해주세요"
        />
        <Box>
          {friendList?.map((friend) => (
            <FriendBox key={friend.memberServiceId}>
              <ProfileBox>
                <ProfileImg
                  src={
                    friend.memberImage ? friend.memberImage : default_profile
                  }
                />
                <NicknameBox>
                  <div>
                    <Desc_150_reg>{friend.memberServiceId}</Desc_150_reg>
                  </div>
                  <div>
                    <Desc_150_reg>{friend.memberNickName}</Desc_150_reg>
                  </div>
                </NicknameBox>
              </ProfileBox>
              <Btn onClick={() => onClickBtn(0)}>
                <Desc_120_med>추가</Desc_120_med>
              </Btn>
            </FriendBox>
          ))}
        </Box>
      </ModalBox>
    </Container>
  );
}
