import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  CTA_button_med,
  Main_title_med,
  Desc_120_med,
  Chip_button_med,
} from '../../styles/typography';
import { ReactComponent as DressIcon } from '../../assets/icons/dress.svg';

const Container = styled.div`
  width: 100%;
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
  align-items: end;
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
`;

const ResultImg = styled.img`
  width: 100%;
  height: 100%;
  border: 1px solid #f4f4f4;
  background-color: #fbfbfb;
  object-fit: contain;
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
  left: 13px;
  z-index: 10;
  .dress {
    stroke: ${(props) => (props.isFile ? '#ffffff' : '#9F9F9F')};
  }
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
  box-sizing: content-box;
  padding: 9px 9px;
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

export default function AfterModal() {
  const [imgFile, setImgFile] = useState<string>(
    'https://i.ibb.co/hZRh851/04298b43bcdfb4378a78c42880ddae55.jpg',
  );
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
    if (imgFile && isChecked.includes(true)) {
      setIsDone(true);
    } else {
      setIsDone(false);
    }
  }, [imgFile, isChecked]);

  return (
    <Container>
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
              <ResultImg src="https://i.ibb.co/SKHYchj/2f977c88dfc2179d9f97dd54421c0428.jpg" />
            </Result>
          </ResultBox>
          <ResultBox>
            <Desc_120_med>WOT LOOK BOOK</Desc_120_med>
            <Result>
              <StoreBtn isFile={imgFile == '' ? false : true}>
                <DressIcon />
                <CTA_button_med>룩북 저장하기</CTA_button_med>
              </StoreBtn>
              <ResultImg src="https://i.ibb.co/hZRh851/04298b43bcdfb4378a78c42880ddae55.jpg" />
            </Result>
          </ResultBox>
        </ResultBoxs>
      </SecondBox>
      <SecondBox name="content">
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
        </CheckBoxs>
      </SecondBox>
      <Button isDone={isDone}>
        <CTA_button_med>룩북으로 공유하기</CTA_button_med>
      </Button>
    </Container>
  );
}
