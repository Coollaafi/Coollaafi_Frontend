import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  CTA_button_med,
  Main_title_med,
  Desc_120_med,
  Desc_150_med,
  Chip_button_med,
} from '../../styles/typography';
import UploadImage from './UploadImage';
import { ReactComponent as DressIcon } from '../../assets/icons/dress.svg';

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
  margin-top: 8px;
  cursor: pointer;
`;

const Box = styled.div<{ name: string }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 19px;
`;

const SecondBox = styled.div<{ name: string }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: ${(props) =>
    props.name == 'image' ? '22px 0 0 0' : '10px 0 34px 0'};
`;

const SubTitle = styled.div`
  margin-top: 14px;
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
  border: 1px solid #f4f4f4;
`;

const StoreBtn = styled.button<{ isFile: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 2px;
  color: ${(props) => (props.isFile ? '#ffffff' : '#9F9F9F')};
  background-color: ${(props) => (props.isFile ? '#000000' : '#EDEDED')};
  border: none;
  border-radius: 60px;
  position: absolute;
  padding: 8px 12px;
  bottom: 83px;
  left: 16px;
  z-index: 10;
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

const Star = styled.div`
  width: 8.5px;
  color: #ff0000;
`;

const FirstText = styled.div`
  display: flex;
  flex-direction: row;
`;

const SecondText = styled.div`
  color: #9f9f9f;
  margin-bottom: 12px;
`;

const ThirdText = styled.div`
  margin-bottom: 50px;
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

  {
    /*}
  useEffect(() => {
    if () {
      setIsDone(false);
    } else {
      setIsDone(true);
    }
  }, [imgFile]);
*/
  }

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
        <SecondBox name="image">
          <ResultBoxs>
            <ResultBox>
              <Desc_120_med>OOTD</Desc_120_med>
              <Result>
                <UploadImage imgFile={imgFile} setImgFile={setImgFile} />
              </Result>
            </ResultBox>
            <ResultBox>
              <Desc_120_med>WOT LOOK BOOK</Desc_120_med>
              <Result>
                <StoreBtn isFile={imgFile == '' ? false : true}>
                  <DressIcon stroke={imgFile == '' ? '#9F9F9F' : 'white'} />
                  <CTA_button_med>룩북 만들기</CTA_button_med>
                </StoreBtn>
              </Result>
            </ResultBox>
          </ResultBoxs>
        </SecondBox>
        <SecondBox name="content">
          {/*콜라주 만들어지기 전*/}
          <Desc_120_med>
            <FirstText>
              <Star>*</Star>사진 업로드 가이드
            </FirstText>
          </Desc_120_med>
          <SecondText>
            <Desc_150_med>
              1. 상의, 하의, 아우터 중 하나라도 완전히 나온 사진을 올려주세요.
              <br />
              2. 얼굴은 나오지 않아도 됩니다.
            </Desc_150_med>
          </SecondText>
          <ThirdText>
            <Desc_120_med>
              OOTD 이미지 파일을 선택한 후 룩북 만들기 버튼을 눌러주세요!
            </Desc_120_med>
          </ThirdText>
          {/*콜라주 만들어진 후*/}
          {/*
          <SubTitle>
            <Desc_120_med>
              룩북 게시글에 올라갈 오늘의 착장을 설명해주세요
            </Desc_120_med>
          </SubTitle>
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
          </CheckBoxs>*/}
        </SecondBox>
        <Button isDone={isDone}>
          <CTA_button_med>룩북으로 공유하기</CTA_button_med>
        </Button>
      </ModalBox>
    </Container>
  );
}
