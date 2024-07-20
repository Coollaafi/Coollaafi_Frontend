import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  CTA_button_med,
  Main_title_med,
  Desc_120_med,
  Chip_button_med,
} from '../../styles/typography';
import UploadImage from './UploadImage';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
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
  margin-top: 8px;
  cursor: pointer;
`;

const Box = styled.div<{ name: string }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: ${(props) =>
    props.name == 'title' ? '16px 0 0 0' : '84px 0 128px 0'};
`;

const SecondBox = styled.div<{ name: string }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: ${(props) =>
    props.name == 'image' ? '30px 0 16px 0' : '0 0 42px 0'};
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

const StoreBtn = styled.button`
  color: #fff;
  width: 126px;
  height: 32px;
  text-align: center;
  background-color: #000000;
  border: none;
  border-radius: 40px;
  position: absolute;
  bottom: 8px;
  left: 7px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 62px;
  background: #fbfbfb;
  font-family: 'Noto_Reg';
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
  padding: 10px 10px;
  background-color: ${(props) => (props.isChecked ? '#000000' : '#fbfbfb')};
  border: ${(props) =>
    props.isChecked ? '1px solid #000000' : '1px solid #f4f4f4'};
  border-radius: 40px;
  color: ${(props) => (props.isChecked ? '#ffffff' : '#9f9f9f')};
`;

const Button = styled.button<{ isDone: boolean }>`
  width: 296px;
  height: 48px;
  color: ${(props) => (props.isDone ? '#ffffff' : '#9f9f9f')};
  background-color: ${(props) => (props.isDone ? '#000000' : '#f4f4f4')};
  border: none;
`;

type UploadModalProps = {
  closeModal: () => void;
};

export default function UploadModal({ closeModal }: UploadModalProps) {
  const [imgFile, setImgFile] = useState<string>('');
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean[]>([false, false, false]);

  const handleClick = (num: number) => {
    if (num == 0) {
      setIsChecked([true, false, false]);
    } else if (num == 1) {
      setIsChecked([false, true, false]);
    } else if (num == 2) {
      setIsChecked([false, false, true]);
    }
  };

  useEffect(() => {
    if (imgFile == '') {
      setIsDone(false);
    } else {
      setIsDone(true);
    }
  }, [imgFile]);

  return (
    <Container>
      <ModalBox>
        <CloseBtn onClick={closeModal}>
          <CTA_button_med>닫기</CTA_button_med>
        </CloseBtn>
        <Box name="title">
          <Main_title_med>친구들과 LOOK BOOK 공유하기</Main_title_med>
          <Desc_120_med>
            업로드한 왓 룩북 이미지는 당신만의 스타일링을 학습해요
          </Desc_120_med>
        </Box>
        {/*<Box name="image">
          <Desc_120_med>OOTD 이미지 선택하기</Desc_120_med>
          <UploadImage imgFile={imgFile} setImgFile={setImgFile} />
        </Box>*/}
        <SecondBox name="image">
          <ResultBoxs>
            <ResultBox>
              <Desc_120_med>OOTD</Desc_120_med>
              <Result></Result>
            </ResultBox>
            <ResultBox>
              <Desc_120_med>WOT LOOK BOOK</Desc_120_med>
              <Result>
                <StoreBtn>
                  <Chip_button_med>왓룩북 이미지 저장</Chip_button_med>
                </StoreBtn>
              </Result>
            </ResultBox>
          </ResultBoxs>
        </SecondBox>
        <SecondBox name="content">
          <Desc_120_med>룩북 게시글을 작성해주세요</Desc_120_med>
          <TextArea placeholder="내용을 작성해주세요." />
          <CheckBoxs>
            <CheckBox isChecked={isChecked[0]} onClick={() => handleClick(0)}>
              <Chip_button_med>더웠어요🥵</Chip_button_med>
            </CheckBox>
            <CheckBox isChecked={isChecked[1]} onClick={() => handleClick(1)}>
              <Chip_button_med>딱 좋았어요😖</Chip_button_med>
            </CheckBox>
            <CheckBox isChecked={isChecked[2]} onClick={() => handleClick(2)}>
              <Chip_button_med>추웠어요🥶</Chip_button_med>
            </CheckBox>
          </CheckBoxs>
        </SecondBox>
        <Button isDone={isDone}>
          <CTA_button_med>룩북으로 변경하기</CTA_button_med>
        </Button>
        {/*
        <Button isDone={isDone}>
          <CTA_button_med>룩북 공유하기</CTA_button_med>
        </Button>*/}
      </ModalBox>
    </Container>
  );
}
