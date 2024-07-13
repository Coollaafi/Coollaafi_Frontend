import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
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
  font-family: 'Noto';
  font-size: 14px;
  margin-top: 8px;
  cursor: pointer;
`;

const Box = styled.div<{ name: string }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: 'Noto';
  margin: ${(props) =>
    props.name == 'title' ? '16px 0 84px 0' : '0 0 106px 0'};
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: 296px;
  height: 200px;
  background: #fbfbfb;
  border: 1px solid #f4f4f4;
  font-family: 'Noto';
  font-size: 14px;
  cursor: pointer;
`;

const Title = styled.text`
  font-size: 16px;
`;

const Detail = styled.text`
  font-size: 12px;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
`;

const Button = styled.button<{ isDone: boolean }>`
  width: 296px;
  height: 48px;
  color: ${(props) => (props.isDone ? '#ffffff' : '#9f9f9f')};
  background-color: ${(props) => (props.isDone ? '#000000' : '#f4f4f4')};
`;

type UploadModalProps = {
  closeModal: () => void;
};

export default function UploadModal({ closeModal }: UploadModalProps) {
  const [isDone, setIsDone] = useState(false);

  return (
    <Container>
      <ModalBox>
        <CloseBtn onClick={closeModal}>닫기</CloseBtn>
        <Box name="title">
          <Title>친구들과 LOOK BOOK 공유하기</Title>
          <Detail>
            업로드한 왓 룩북 이미지는 당신만의 스타일링을 학습해요
          </Detail>
        </Box>
        <Box name="image">
          <Detail>OOTD 이미지 선택하기</Detail>
          <ImageBox>
            <Icon src="/assets/icons/image.svg" />
            파일 선택하기
          </ImageBox>
          <Detail>파일을 재선택하려면 위의 버튼을 눌러주세요</Detail>
        </Box>
        <Button isDone={isDone}>룩북으로 변경하기</Button>
      </ModalBox>
    </Container>
  );
}
