import React, { useRef } from 'react';
import styled from 'styled-components';
import { CTA_button_med } from 'styles/typography';
import { ReactComponent as ImageIcon } from '../assets/icons/image.svg';
import useImage from 'hooks/useImage';

const Box = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ImageBox = styled.img<{ isFile: boolean; type: ColorType }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  object-fit: contain;
  visibility: ${(props) => (props.isFile ? 'visible' : 'hidden')};
`;

const ImageBtn = styled.div<{ isFile: boolean; type: ColorType }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  color: ${(props) =>
    props.type == 'trans' ? '#9F9F9F' : props.isFile ? 'white' : 'black'};
  cursor: pointer;
  .image {
    fill: ${(props) =>
      props.type == 'trans' ? '#9F9F9F' : props.isFile ? 'white' : 'black'};
  }
`;

const HiddenBtn = styled.input`
  display: none;
`;

type ColorType = 'white' | 'trans';

type UploadImageProps = {
  imgFile: string;
  setImgFile: React.Dispatch<React.SetStateAction<string>>;
  type: ColorType;
};

export default function UploadImage({
  imgFile,
  setImgFile,
  type,
}: UploadImageProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const { handleClick, changeFile } = useImage({ setImgFile, fileRef });

  return (
    <Box>
      <ImageBox
        isFile={imgFile == '' ? false : true}
        type={type}
        src={imgFile}
      />
      <ImageBtn
        isFile={imgFile == '' ? false : true}
        type={type}
        onClick={handleClick}
      >
        <ImageIcon />
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
  );
}
