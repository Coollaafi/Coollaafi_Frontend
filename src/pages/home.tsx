import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Header from 'components/Header';
import NicknameBox from 'components/NicknameBox';
import {
  CTA_button_med,
  Desc_120_med,
  Main_title_med,
} from 'styles/typography';
import { ReactComponent as DefaultProfile } from '../assets/images/default-profile.svg';
import { ReactComponent as SettingIcon } from '../assets/icons/setting.svg';
import { ReactComponent as InfoIcon } from '../assets/icons/info.svg';
import { ReactComponent as UploadIcon } from '../assets/icons/upload.svg';
import useModal from 'hooks/useModal';
import InfoModal from 'components/home/InfoModal';
import CalendarBox from 'components/home/CalendarBox';
import Footer from 'components/Footer';
import EditModal from 'components/home/EditModal';
import { useMutation } from 'react-query';
import { useUserStore } from 'store/user';
import { home } from 'apis/home';

const Container = styled.div`
  width: 360px;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 70px 16px 0 16px;
`;

const ProfileBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextColor = styled.div`
  color: #919191;
`;

const Nickname = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const Icon = styled.div`
  cursor: pointer;
`;

const ImageBox = styled.div`
  width: 126px;
  height: 126px;
  position: relative;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 100%;
  object-fit: cover;
`;

const SettingBtn = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  width: 96px;
  height: 24px;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  border: 1px solid #f4f4f4;
  background-color: #fbfbfb;
  position: absolute;
  color: #9f9f9f;
  left: 14px;
  bottom: -10px;
  cursor: pointer;
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 29px 0 32px 0;
  gap: 8px;
`;

const Lines = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Line = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
`;

const Btns = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const Btn = styled.div<{ isChecked: boolean }>`
  display: flex;
  box-sizing: content-box;
  padding: 7px 15px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 40px;
  border: 1px solid  ${(props) => (props.isChecked ? '#000' : '#9F9F9F')};
  cursor: ${(props) => (props.isChecked ? 'pointer' : 'auto')};
  text-decoration: none;
  color: ${(props) => (props.isChecked ? '#000' : '#9F9F9F')};
  background-color: ${(props) => (props.isChecked ? '#fff' : '#F4F4F4')};
  &:hover {
    background-color: ${(props) => props.isChecked && '#000'};
    color:${(props) => props.isChecked && '#fff'};
    .upload {
      stroke: ${(props) => props.isChecked && '#fff'};
    }
  }}
`;

type memberBasedProps = {
  memberServiceId: string;
  memberNickName: string;
  memberImage: string;
  alias: string;
};

type memberAddProps = {
  nextAlias: string;
  photosUntilNextAlias: number;
  createdAt: string;
};

type onClickBtnProps = {
  type: string;
  isChecked: boolean;
  event: React.MouseEvent<HTMLDivElement, MouseEvent>;
};

export default function HomePage() {
  const navigate = useNavigate();
  const {
    isOpen: isInfoOpen,
    closeModal: closeInfoModal,
    openModal: openInfoModal,
  } = useModal();
  const {
    isOpen: isEditOpen,
    closeModal: closeEditModal,
    openModal: openEditModal,
  } = useModal();

  const memberId = useUserStore((state) => state.memberId);
  const accessToken = useUserStore((state) => state.accessToken);
  const [memberBased, setMemberBased] = useState<memberBasedProps>();
  const [memberAdd, setMemberAdd] = useState<memberAddProps>();
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const onClickBtn = ({ type, isChecked, event }: onClickBtnProps) => {
    if (type == 'ai') {
      if (isChecked) {
        navigate('/ai');
      } else {
        event.preventDefault();
      }
    }
    if (type == 'upload') {
      navigate('/upload');
    }
  };

  const homeMutation = useMutation(home, {
    onSuccess: (data) => {
      setMemberBased(data.result.memberBased);
      setMemberAdd(data.result.memberAdd);
    },
    onError: (e) => {
      console.log(e);
      navigate('/login');
    },
  });

  useEffect(() => {
    homeMutation.mutate({ memberId: memberId, accessToken: accessToken });
  }, []);

  /*
  useEffect(() => {
    if (
      memberBased?.alias == '평범한 패피' ||
      memberBased?.alias == '예사롭지 않은 패피' ||
      memberBased?.alias == '주목받는 패피' ||
      memberBased?.alias == '독창적인 패피' ||
      memberBased?.alias == '세련된 패피'
    ) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  }, [memberBased?.alias]);
*/

  return (
    <Container>
      <Header type={'white'} />
      <Content>
        <ProfileBox>
          <NameBox>
            <Name>
              <Main_title_med>{memberBased?.memberServiceId}</Main_title_med>
              <TextColor>
                <Desc_120_med>{memberBased?.memberNickName}</Desc_120_med>
              </TextColor>
            </Name>
            <Nickname>
              <NicknameBox
                nickname={memberBased?.alias ? memberBased?.alias : ''}
              />
              <Icon onClick={openInfoModal}>
                <InfoIcon />
              </Icon>
            </Nickname>
          </NameBox>
          <ImageBox>
            {memberBased?.memberImage ? (
              <ProfileImg src={memberBased?.memberImage} />
            ) : (
              <DefaultProfile />
            )}
            <SettingBtn onClick={openEditModal}>
              <Desc_120_med>프로필설정</Desc_120_med>
              <SettingIcon />
            </SettingBtn>
          </ImageBox>
        </ProfileBox>
        <BtnBox>
          <Lines>
            <Line>
              <Main_title_med>{memberAdd?.nextAlias}</Main_title_med>
              <Desc_120_med>가 되기까지</Desc_120_med>
            </Line>
            <Line>
              <Main_title_med>
                {memberAdd?.photosUntilNextAlias + '장'}
              </Main_title_med>
              <Desc_120_med>의 사진 업로드가 필요해요</Desc_120_med>
            </Line>
          </Lines>
          <Btns>
            <Btn
              onClick={(e) =>
                onClickBtn({ type: 'upload', isChecked: isChecked, event: e })
              }
              isChecked={true}
            >
              <CTA_button_med>사진업로드</CTA_button_med>
              <UploadIcon stroke="black" />
            </Btn>
            <Btn
              isChecked={isChecked}
              onClick={(e) =>
                onClickBtn({ type: 'ai', isChecked: isChecked, event: e })
              }
            >
              <CTA_button_med> {`AI의 today's 옷추천`}</CTA_button_med>
            </Btn>
          </Btns>
        </BtnBox>
        <CalendarBox createdDate={memberAdd?.createdAt} />
      </Content>
      {isInfoOpen && <InfoModal closeModal={closeInfoModal} />}
      {isEditOpen && <EditModal closeModal={closeEditModal} />}
      <Footer kind="white" />
    </Container>
  );
}
