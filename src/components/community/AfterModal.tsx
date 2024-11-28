import { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import styled from 'styled-components';
import {
  CTA_button_med,
  Main_title_med,
  Desc_120_med,
  Chip_button_med,
} from '../../styles/typography';
import { ReactComponent as DressIcon } from '../../assets/icons/dress.svg';
import { useUserStore } from 'store/user';
import { useMutation } from 'react-query';
import { uploadPosts } from 'apis/community';

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
  object-fit: cover;
`;

const LookBookBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fbfbfb;
  position: relative;
  overflow: hidden;
`;

const Outfit = styled.img<{ type: string }>`
  position: absolute;
  z-index: 1;
  width: ${(props) =>
    props.type == 'shoes' ? '20px' : props.type == 'top' ? '50px' : '45px'};
  left: ${(props) =>
    props.type == 'shoes' ? '15px' : props.type == 'top' ? '50px' : '50px'};
  top: ${(props) =>
    props.type == 'shoes' ? '160px' : props.type == 'top' ? '5px' : '80px'};
`;

const StoreBtn = styled.button`
  display: flex;
  flex-direction: row;
  gap: 2px;
  color: #ffffff;
  background-color: #000000;
  border: none;
  border-radius: 60px;
  position: absolute;
  padding: 8px 12px;
  bottom: 83px;
  left: 13px;
  z-index: 10;
  .dress {
    stroke: #ffffff;
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

type UploadModalProps = {
  closeModal: () => void;
  ootdList: string[];
  ootdImgId: number;
  ootdImgUrl: string;
};

export default function AfterModal({
  closeModal,
  ootdList,
  ootdImgId,
  ootdImgUrl,
}: UploadModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isChecked, setIsChecked] = useState<boolean[]>([false, false, false]);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [top, setTop] = useState<string>('');
  const [bottom, setBottom] = useState<string>('');
  const [shoes, setShoes] = useState<string>('');
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>('');
  const accessToken = useUserStore((state) => state.accessToken);
  const memberId = useUserStore((state) => state.memberId);
  const formData = new FormData();

  const uploadPostsMutation = useMutation(uploadPosts, {
    onSuccess: (data) => {
      console.log(data);
      /*window.location.reload();*/
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const handleClick = (num: number) => {
    if (num == 0) {
      setIsChecked([true, false, false]);
    } else if (num == 1) {
      setIsChecked([false, true, false]);
    } else if (num == 2) {
      setIsChecked([false, false, true]);
    }
  };

  const captureImg = async () => {
    if (containerRef.current) {
      try {
        //html2canvas로 캡쳐
        const canvas = await html2canvas(containerRef.current, {
          useCORS: true, // 외부 리소스 허용
          allowTaint: false,
          scale: 2, // 고해상도
        });
        //캔버스를 데이터 URL로
        const url = canvas.toDataURL('image/png');
        setImgUrl(url);
        //다운로드 링크 생성
        const link = document.createElement('a');
        link.href = url;
        /*link.download = 'lookbook.png';
        link.click();*/
      } catch (e) {
        console.error(e);
      }
    }
  };

  const requestDTO = {
    memberId: memberId,
    ootdImageId: ootdImgId,
    description: inputRef.current && inputRef.current.value,
    postCondition: isChecked[0] ? 'HOT' : isChecked[1] ? 'PERFECT' : 'COLD',
  };

  const onClickBtn = () => {
    // Blob 생성 (서버 전송용)
    const base64Data = imgUrl.replace(/^data:image\/\w+;base64,/, '');
    const binaryData = atob(base64Data); // Base64 디코딩
    const arrayBuffer = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      arrayBuffer[i] = binaryData.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/png' });
    formData.append('requestDTO', JSON.stringify(requestDTO));
    formData.append('lookbookImage', blob);
    uploadPostsMutation.mutate({
      formData: formData,
      accessToken: accessToken,
    });
    console.log(imgUrl);
  };

  useEffect(() => {
    ootdList.map((outfit) => {
      if (outfit[outfit.length - 5] == 's') {
        setShoes(outfit);
      }
      if (outfit[outfit.length - 5] == 'p') {
        setTop(outfit);
      }
      if (outfit[outfit.length - 5] == 'm') {
        setBottom(outfit);
      }
    });
  }, []);

  useEffect(() => {
    captureImg();
  }, [shoes, top, bottom]);

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
              <ResultImg src={ootdImgUrl} />
            </Result>
          </ResultBox>
          <ResultBox>
            <Desc_120_med>WOT LOOK BOOK</Desc_120_med>
            <Result>
              <StoreBtn>
                <DressIcon />
                <CTA_button_med>룩북 저장하기</CTA_button_med>
              </StoreBtn>
              <LookBookBox ref={containerRef}>
                <Outfit src={top} type="top" crossOrigin="anonymous" />
                <Outfit src={bottom} type="bottom" crossOrigin="anonymous" />
                <Outfit src={shoes} type="shoes" crossOrigin="anonymous" />
              </LookBookBox>
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
        <TextArea placeholder="내용을 작성해주세요." ref={inputRef} />
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
      <Button isDone={isChecked.includes(true)} onClick={onClickBtn}>
        <CTA_button_med>룩북으로 공유하기</CTA_button_med>
      </Button>
    </Container>
  );
}
