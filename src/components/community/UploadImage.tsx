import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Desc_120_med } from 'styles/typography';

const Box = styled.div`
  width: 140px;
  height: 200px;
  background-color: #fbfbfb;
  border: 1px solid #f4f4f4;
  cursor: pointer;
  position: relative;
`;

const ImageBox = styled.img<{ isFile: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  object-fit: contain;
  visibility: ${(props) => (props.isFile ? 'visible' : 'hidden')};
`;

const ImageBtn = styled.div<{ isFile: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 80px;
  right: 38px;
  cursor: pointer;
  visibility: ${(props) => (props.isFile ? 'hidden' : 'visible')};
`;

const HiddenBtn = styled.input`
  display: none;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
`;

export default function UploadImage() {
  const [imgFile, setImgFile] = useState<string>('');

  const fileRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileRef?.current?.click();
  };
  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = e.target.files?.[0];
    if (targetFile !== undefined) {
      setImgFile(URL.createObjectURL(targetFile));
    }
  };

  return (
    <>
      <Box>
        <ImageBox
          isFile={imgFile == '' ? false : true}
          src={imgFile}
          onClick={handleClick}
        />
        <ImageBtn isFile={imgFile == '' ? false : true} onClick={handleClick}>
          <Icon src="/assets/icons/image.svg" />
          <Desc_120_med>파일 선택하기</Desc_120_med>
        </ImageBtn>
        {/*hidden input _ ref 전달*/}
        <HiddenBtn
          type="file"
          accept="image/*"
          ref={fileRef}
          onChange={changeFile}
        />
      </Box>
    </>
  );
}
