import styled from 'styled-components';
import { CTA_button_med } from 'styles/typography';

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
  height: 589px;
  background-color: #fff;
  border: none;
  border-radius: 16px;
  padding: 24px 32px;
`;

const CloseBtn = styled.text`
  display: flex;
  justify-content: end;
  cursor: pointer;
`;

type InfoModalProps = {
  closeModal: () => void;
};

export default function InfoModal({ closeModal }: InfoModalProps) {
  return (
    <Container onClick={closeModal}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        {/**부모 요소의 이벤트 막음 */}
        <CloseBtn onClick={closeModal}>
          <CTA_button_med>닫기</CTA_button_med>
        </CloseBtn>
      </ModalBox>
    </Container>
  );
}
