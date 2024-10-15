import React, { useState } from 'react';
import styled from 'styled-components';
import { CTA_button_med } from '../../styles/typography';
import BeforeModal from './BeforeModal';
import AfterModal from './AfterModal';

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
  height: 596px;
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

type UploadModalProps = {
  closeModal: () => void;
};

export default function UploadModal({ closeModal }: UploadModalProps) {
  const [isBeforeClicked, setIsBeforeClicked] = useState<boolean>(false);
  return (
    <Container>
      <ModalBox>
        <CloseBtn onClick={closeModal}>
          <CTA_button_med>닫기</CTA_button_med>
        </CloseBtn>
        {isBeforeClicked ? (
          <AfterModal />
        ) : (
          <BeforeModal setIsBeforeClicked={setIsBeforeClicked} />
        )}
      </ModalBox>
    </Container>
  );
}
