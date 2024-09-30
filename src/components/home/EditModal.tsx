import { useState, useRef } from 'react';
import styled from 'styled-components';
import {
  Account_alert_reg,
  CTA_button_med,
  Desc_120_med,
  Main_title_med,
} from 'styles/typography';
import useImage from 'hooks/useImage';
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
  height: 384px;
  background-color: #fff;
  border: none;
  border-radius: 16px;
  padding: 16px;
`;

const CloseBtn = styled.text`
  display: flex;
  justify-content: end;
  cursor: pointer;
  margin: 8px 8px 15px 0;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-bottom: 32px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const ImageBox = styled.img`
  width: 126px;
  height: 126px;
  border: none;
  border-radius: 100%;
`;

const HiddenBtn = styled.input`
  display: none;
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
`;

const Text = styled.div`
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
`;

const Btn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  background-color: black;
  color: white;
  margin-top: 32px;
  cursor: pointer;
`;

type EditModalProps = {
  closeModal: () => void;
};

export default function EditModal({ closeModal }: EditModalProps) {
  const [imgFile, setImgFile] = useState<string>('');
  const fileRef = useRef<HTMLInputElement>(null);
  const { handleClick, changeFile } = useImage({ setImgFile, fileRef });

  return (
    <Container>
      <ModalBox>
        <CloseBtn onClick={closeModal}>
          <CTA_button_med>닫기</CTA_button_med>
        </CloseBtn>
        <TitleBox>
          <Main_title_med>프로필 설정하기</Main_title_med>
          <Desc_120_med>다른 사용자에게 보여질 프로필 사진이예요.</Desc_120_med>
        </TitleBox>
        <Box>
          <ImageBox src={imgFile == '' ? default_profile : imgFile} />
          <HiddenBtn
            type="file"
            accept="image/*"
            ref={fileRef}
            onChange={changeFile}
          />
          <BtnBox>
            <Text onClick={handleClick}>
              <Account_alert_reg>사진 선택</Account_alert_reg>
            </Text>
            <Text onClick={() => setImgFile('')}>
              <Account_alert_reg>기본이미지</Account_alert_reg>
            </Text>
          </BtnBox>
        </Box>
        <Btn>
          <CTA_button_med>변경하기</CTA_button_med>
        </Btn>
      </ModalBox>
    </Container>
  );
}
