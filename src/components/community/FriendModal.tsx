import styled from 'styled-components';
import {
  CTA_button_med,
  Desc_120_med,
  Desc_150_reg,
  Main_title_med,
} from 'styles/typography';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { friend } from 'apis/community';
import { useUserStore } from 'store/user';
import default_profile from '../../assets/images/default-profile.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

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

const Box = styled.div`
  width: 100%;
  height: 525px;
  overflow: scroll;
`;

const RequestBox = styled.div`
  width: 100%;
  margin-top: 15px;
  gap: 5px;
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
  memberId: number;
  memberServiceId: string;
  memberNickName: string;
  memberImage: string;
  alias: string;
}[];

export default function FriendModal({ closeModal }: AddFriendModalProps) {
  const [friendList, setFriendList] = useState<FriendListProps>();
  const accessToken = useUserStore((state) => state.accessToken);
  const memberId = useUserStore((state) => state.memberId);

  const friendMutation = useMutation(friend, {
    onSuccess: (data) => {
      setFriendList(data.result);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    friendMutation.mutate({
      memberId: memberId,
      accessToken: accessToken,
    });
  }, []);

  return (
    <Container>
      <ModalBox>
        <CloseBtn onClick={closeModal}>
          <CTA_button_med>닫기</CTA_button_med>
        </CloseBtn>
        <TitleBox>
          <Main_title_med>
            내 친구들 ({friendList ? friendList.length : 0})
          </Main_title_med>
          <Desc_120_med>친구 수는 20명으로 제한됩니다.</Desc_120_med>
        </TitleBox>
        <Box>
          <RequestBox>
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
                <Btn>
                  <CloseIcon />
                </Btn>
              </FriendBox>
            ))}
          </RequestBox>
        </Box>
      </ModalBox>
    </Container>
  );
}
