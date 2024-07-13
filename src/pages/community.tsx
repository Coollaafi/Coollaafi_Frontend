import styled from 'styled-components';
import UploadModal from 'components/community/UploadModal';
import useModal from 'hooks/community/useModal';

const Container = styled.div`
  width: 360px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UploadBtn = styled.button`
  background-color: #000;
  color: #fff;
  font-family: 'Noto';
  font-size: 14px;
  padding: 8px 16px;
  border: 1px solid #000;
  border-radius: 40px;
  position: fixed;
  bottom: 24px;
`;

const PencilIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 8px;
`;

export default function CommunityPage() {
  const { isOpen, closeModal, openModal } = useModal();

  return (
    <Container>
      <UploadBtn onClick={openModal}>
        글 올리기
        <PencilIcon src="/assets/icons/pencil.svg" />
      </UploadBtn>
      {isOpen ? <UploadModal closeModal={closeModal} /> : <></>}
    </Container>
  );
}
