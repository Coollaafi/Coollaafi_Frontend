import styled from 'styled-components';
import UploadModal from 'components/community/UploadModal';
import useModal from 'hooks/community/useModal';
import { CTA_button_med } from 'styles/typography';
import { ReactComponent as PencilIcon } from '../assets/icons/pencil.svg';
import Header from 'components/Header';
import Post from 'components/community/Post';

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
  padding: 12px 16px;
  border: 1px solid #000;
  border-radius: 40px;
  position: fixed;
  bottom: 24px;
  z-index: 1;
`;

const Icon = styled.div`
  margin-left: 8px;
`;

const Posts = styled.div`
  margin-top: 70px;
`;
export default function CommunityPage() {
  const { isOpen, closeModal, openModal } = useModal();

  return (
    <Container>
      <Header />
      <Posts>
        <Post />
      </Posts>
      <UploadBtn onClick={openModal}>
        <CTA_button_med>룩북 올리기</CTA_button_med>
        <Icon>
          <PencilIcon />
        </Icon>
      </UploadBtn>
      {isOpen ? <UploadModal closeModal={closeModal} /> : <></>}
    </Container>
  );
}
