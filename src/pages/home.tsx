import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from 'components/Header';
import NicknameBox from 'components/NicknameBox';
import {
  CTA_button_med,
  Desc_120_med,
  Main_title_med,
} from 'styles/typography';
import { ReactComponent as SettingIcon } from '../assets/icons/setting.svg';
import { ReactComponent as InfoIcon } from '../assets/icons/info.svg';
import { ReactComponent as UploadIcon } from '../assets/icons/upload.svg';
import useModal from 'hooks/useModal';
import InfoModal from 'components/home/InfoModal';
import CalendarBox from 'components/home/CalendarBox';
import Footer from 'components/Footer';
import EditModal from 'components/home/EditModal';

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

const Btn = styled(Link)`
  display: flex;
  box-sizing: content-box;
  padding: 7px 15px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 40px;
  border: 1px solid #000;
  cursor: pointer;
  text-decoration: none;
  color: #000;
  &:hover {
    background-color: #000;
    color: #fff;
    .dress {
      stroke: #fff;
    }
    .upload {
      stroke: #fff;
    }
  }
`;

export default function HomePage() {
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

  return (
    <Container>
      <Header type={'white'} />
      <Content>
        <ProfileBox>
          <NameBox>
            <Name>
              <Main_title_med>{'Ewha03!'}</Main_title_med>
              <Desc_120_med>{'김이화'}</Desc_120_med>
            </Name>
            <Nickname>
              <NicknameBox nickname="평범한 패피" />
              <Icon onClick={openInfoModal}>
                <InfoIcon />
              </Icon>
            </Nickname>
          </NameBox>
          <ImageBox>
            <ProfileImg src="https://i.ibb.co/LNpPpWJ/image.jpg" />
            <SettingBtn onClick={openEditModal}>
              <Desc_120_med>프로필설정</Desc_120_med>
              <SettingIcon />
            </SettingBtn>
          </ImageBox>
        </ProfileBox>
        <BtnBox>
          <Lines>
            <Line>
              <Main_title_med>{'예사롭지 않은 패피'}</Main_title_med>
              <Desc_120_med>가 되기까지</Desc_120_med>
            </Line>
            <Line>
              <Main_title_med>{'7장'}</Main_title_med>
              <Desc_120_med>의 사진 업로드가 필요해요</Desc_120_med>
            </Line>
          </Lines>
          <Btns>
            <Btn to={'/upload'}>
              <CTA_button_med>사진업로드</CTA_button_med>
              <UploadIcon stroke="black" />
            </Btn>
            <Btn to={'/ai'}>
              <CTA_button_med> {`AI의 today's 옷추천`}</CTA_button_med>
            </Btn>
          </Btns>
        </BtnBox>
        <CalendarBox />
      </Content>
      {isInfoOpen && <InfoModal closeModal={closeInfoModal} />}
      {isEditOpen && <EditModal closeModal={closeEditModal} />}
      <Footer kind="white" />
    </Container>
  );
}
