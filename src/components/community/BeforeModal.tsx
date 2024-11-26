import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  CTA_button_med,
  Main_title_med,
  Desc_120_med,
  Desc_150_med,
} from '../../styles/typography';
import UploadImage from '../UploadImage';
import ButtonBox from 'components/ButtonBox';
import { useMutation } from 'react-query';
import { ootd } from 'apis/recommend';
import { useUserStore } from 'store/user';

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
  background-color: #fbfbfb;
  border: 1px solid #f4f4f4;
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

type BeforeModalProps = {
  setIsBeforeClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setOotdList: React.Dispatch<React.SetStateAction<string[]>>;
  setOotdImgId: React.Dispatch<React.SetStateAction<number>>;
  setOotdImgUrl: React.Dispatch<React.SetStateAction<string>>;
};

export default function BeforeModal({
  setIsBeforeClicked,
  setOotdList,
  setOotdImgId,
  setOotdImgUrl,
}: BeforeModalProps) {
  const [imgFileBlob, setImgFileBlob] = useState<Blob>(new Blob());
  const [imgFile, setImgFile] = useState<string>('');
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean[]>([]);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const formData = new FormData();

  const memberId = useUserStore((state) => state.memberId);
  const accessToken = useUserStore((state) => state.accessToken);

  const ootdMutation = useMutation(ootd, {
    onSuccess: (data) => {
      setIsBeforeClicked(true);
      setOotdList(data.result.collageImages);
      setOotdImgId(data.result.ootdImageId);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const onClickBtn = () => {
    setOotdImgUrl(imgFile);
    formData.append('ootdImage', imgFileBlob);
    formData.append('memberId', memberId);
    categoryList.forEach((category) => {
      formData.append('categorySet', category);
    });
    ootdMutation.mutate({
      accessToken: accessToken,
      formData: formData,
    });
    console.log(categoryList);
  };

  useEffect(() => {
    if (imgFile != '' && isClicked.includes(true)) {
      setIsDone(true);
    } else {
      setIsDone(false);
    }
  }, [imgFile, isClicked]);

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
              <UploadImage
                imgFile={imgFile}
                setImgFile={setImgFile}
                setImgFileBlob={setImgFileBlob}
                type="white"
              />
            </Result>
          </ResultBox>
          <ButtonBox
            type="white"
            isClicked={isClicked}
            setIsClicked={setIsClicked}
            categoryList={categoryList}
            setCategoryList={setCategoryList}
          />
        </ResultBoxs>
      </SecondBox>
      <SecondBox name="content">
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
      </SecondBox>
      <Button
        isDone={isDone}
        onClick={(e) => (isDone ? onClickBtn() : e.preventDefault)}
      >
        <CTA_button_med>룩북 만들기</CTA_button_med>
      </Button>
    </Container>
  );
}
