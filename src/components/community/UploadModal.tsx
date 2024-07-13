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

/**임의로 36.5px로 margin 줌 원래는 42px인데, 안맞아..**/
const SecondBox = styled.div<{ name: string }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: 'Noto';
  margin: ${(props) =>
    props.name == 'image' ? '-54px 0 16px 0' : '0 0 36.5px 0'};
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: 296px;
  height: 200px;
  background-color: #fbfbfb;
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

const ResultBoxs = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const ResultBox = styled.div`
  width: 140px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
`;

const Result = styled.div`
  width: 140px;
  height: 200px;
  position: relative;
  background-color: #fbfbfb;
  border: none;
`;

//font 바꾸면 font-size 12px로 수정 필요
const StoreBtn = styled.button`
  font-family: 'Noto';
  font-size: 10px;
  color: #fff;
  padding: 10px;
  background-color: #000000;
  border: none;
  border-radius: 40px;
  position: absolute;
  bottom: 12px;
  left: 7px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 62px;
  background: #fbfbfb;
  font-family: 'Noto-Thin';
  font-size: 12px;
  padding: 12px 10px;
  border: none;
  outline: none;
  resize: none;
  work-break: break-all;
  &::placeholder {
    color: #c7c7c7;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CheckBoxs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CheckBox = styled.button<{ isChecked: boolean }>`
  padding: 10px;
  background-color: ${(props) => (props.isChecked ? '#000000' : '#fbfbfb')};
  border: ${(props) =>
    props.isChecked ? '1px solid #000000' : '1px solid #f4f4f4'};
  border-radius: 40px;
  font-family: 'Noto';
  font-size: 12px;
  color: ${(props) => (props.isChecked ? '#ffffff' : '#9f9f9f')};
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
  const [isChecked, setIsChecked] = useState(false);

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
        {/*<SecondBox name="image">
          <ResultBoxs>
            <ResultBox>
              <Detail>OOTD</Detail>
              <Result></Result>
            </ResultBox>
            <ResultBox>
              <Detail>WOT LOOK BOOK</Detail>
              <Result>
                <StoreBtn>왓룩북 이미지 저장하기</StoreBtn>
              </Result>
            </ResultBox>
          </ResultBoxs>
        </SecondBox>
        <SecondBox name="content">
          <Detail>룩북 게시글을 작성해주세요</Detail>
          <TextArea placeholder="내용을 작성해주세요." />
          <CheckBoxs>
            <CheckBox isChecked={isChecked}>더웠어요🥵</CheckBox>
            <CheckBox isChecked={isChecked}>딱 좋았어요😖</CheckBox>
            <CheckBox isChecked={isChecked}>추웠어요🥶</CheckBox>
          </CheckBoxs>
        </SecondBox>*/}
        <Button isDone={isDone}>룩북으로 변경하기</Button>
      </ModalBox>
    </Container>
  );
}
