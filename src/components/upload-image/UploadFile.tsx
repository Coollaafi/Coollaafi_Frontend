import styled from 'styled-components';
import { CTA_button_med } from 'styles/typography';
import { ReactComponent as ImageIcon } from '../../assets/icons/image.svg';

const ImageBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Drag = styled.label`
  width: 100%;
  height: 86px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #9f9f9f;
  background: #121212;
  border: 1px dashed #4d4d4d;
  cursor: pointer;
`;

const File = styled.input`
  display: none;
`;

export default function UploadFile() {
  return (
    <ImageBox>
      <Drag>
        <ImageIcon fill="#9F9F9F" />
        <CTA_button_med>파일 선택하기</CTA_button_med>
        <File type="file" multiple={true} />
      </Drag>
    </ImageBox>
  );
}
