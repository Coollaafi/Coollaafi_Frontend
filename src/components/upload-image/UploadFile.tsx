import styled from 'styled-components';
import { CTA_button_med } from 'styles/typography';
import { ReactComponent as UploadIcon } from '../../assets/icons/upload.svg';
import { ReactComponent as ImageIcon } from '../../assets/icons/image.svg';

const ImageBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Drag = styled.label`
  width: 214px;
  height: 87px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1px dashed black;
`;

const File = styled.input`
  display: none;
`;

const Button = styled.div`
  width: 98px;
  height: 87px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: white;
  cursor: pointer;
`;

export default function UploadFile() {
  return (
    <ImageBox>
      <Drag>
        <UploadIcon />
        <CTA_button_med>업로드할 파일을 끌어 놓아주세요</CTA_button_med>
        <File type="file" multiple={true} />
      </Drag>
      <Button>
        <ImageIcon fill="white" />
        <CTA_button_med>파일 선택하기</CTA_button_med>
      </Button>
    </ImageBox>
  );
}
