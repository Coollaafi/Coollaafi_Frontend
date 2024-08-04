import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { CTA_button_med } from 'styles/typography';
import { ReactComponent as ImageIcon } from '../../assets/icons/image.svg';

const Box = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fbfbfb;
  border: 1px solid #f4f4f4;
  position: relative;
`;

const ImageBox = styled.img<{ isFile: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: ${(props) => (props.isFile ? 'pointer' : 'none')};
  visibility: ${(props) => (props.isFile ? 'visible' : 'hidden')};
`;

const ImageBtn = styled.div<{ isFile: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 80px;
  color: ${(props) => (props.isFile ? 'white' : 'black')};
  cursor: pointer;
`;

const HiddenBtn = styled.input`
  display: none;
`;

type UploadImageProps = {
  imgFile: string;
  setImgFile: React.Dispatch<React.SetStateAction<string>>;
};

export default function UploadImage({ imgFile, setImgFile }: UploadImageProps) {
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
          <ImageIcon fill={imgFile == '' ? 'black' : 'white'} />
          <CTA_button_med>파일 선택하기</CTA_button_med>
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
