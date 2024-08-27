import styled from 'styled-components';
import UploadModal from 'components/community/UploadModal';
import useModal from 'hooks/community/useModal';
import { CTA_button_med, Main_title_med } from 'styles/typography';
import { ReactComponent as PencilIcon } from '../assets/icons/pencil.svg';
import { ReactComponent as FriendIcon } from '../assets/icons/friend.svg';
import { ReactComponent as PlusIcon } from '../assets/icons/friend-plus.svg';
import { ReactComponent as MenuIcon } from '../assets/icons/menu.svg';
import Header from 'components/Header';
import Post from 'components/community/Post';
import Footer from 'components/Footer';

const Container = styled.div`
  width: 360px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 47px;
  padding: 0 16px;
  color: black;
  margin-top: 70px;
`;

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const PlusFriendIcon = styled.div`
  display: flex;
  flex-direction: row;
`;

const MarginBox = styled.div`
  margin-right: -10px;
`;

const IconBox = styled.div`
  cursor: pointer;
`;

const UploadBtn = styled.button`
  gap: 8px;
  background-color: #000;
  color: #fff;
  padding: 12px 16px;
  border: 1px solid #000;
  border-radius: 40px;
  position: fixed;
  bottom: 24px;
  z-index: 1;
`;

export default function CommunityPage() {
  const { isOpen, closeModal, openModal } = useModal();

  return (
    <Container>
      <Header kind={'white'} />
      <TitleBox>
        <Main_title_med>이번주 친구들의 룩북 구경하기</Main_title_med>
        <Icons>
          <IconBox>
            <PlusFriendIcon>
              <MarginBox>
                <PlusIcon />
              </MarginBox>
              <FriendIcon />
            </PlusFriendIcon>
          </IconBox>
          <IconBox>
            <MenuIcon />
          </IconBox>
        </Icons>
      </TitleBox>
      <Post
        profileImage={'https://i.ibb.co/LNpPpWJ/image.jpg'}
        id={'Ewha03'}
        nickname={'예사롭지 않은 패피'}
        date={'2024년 06월 27일'}
        weather={'날씨 맑음'}
        ootdImage={
          'https://s3-alpha-sig.figma.com/img/2dee/9c18/4a18c7ef0557219335a6bede8d1d0c3f?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nBC3-pwz9uTv1qpostuzHMQ6526x3W7eq~Gnc9nZIJWSLjcYcYrncrkKOPy~lgjLWaVGriDoTgRtmPizKCw~j9~aFUQMdEONAJA8PTYvOMTsgjKmj3pOSXXvnjyJ8Bx~4rqx9po-ZIAyPye7FXlc9e9vyAjLS9sH~HNALJNqlVksiVeV7Wvckt6-E4YOoP2tbU8dx8Yj-F2YyQ5fu-entXiJUUTtzAm7oDCdwGtWNdpJXR4AjeTgtTObSvPuy4iZJaEC9-h8WkcvoGujqxoQ0YRX1nb6J0FSrUzH7VERD8-qJ17hIZNvxJZ-tofozWVHa3Kb68N5cUYVQh4RfPpC1g__'
        }
        collageImage={
          'https://s3-alpha-sig.figma.com/img/5b9c/73ba/153666f5977562a9942997bb05e5f3d7?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Jq4XLl3JFgwWM7rBndV90g8IdazbkEEJ0Hu8~ipfnEV1o6rAhpf1Bf5J8aI3fSNMl-iikbzEaiS1wH3iLrPjJG4BFY5pe-EtJMZJJPpS2GpWrNT8quqAeymHEnBpw7Y3pEhld3gh5idfC-Dn-EMAziahafw01dkKYJGKlH-GXxMzf~~H7D38PO8UJIr3lhX9YGwTu5KG~DrCy7s3lCiCfh4l0ETILXRwRREBzr-UkHsHcB5YHb7atsEnGHGPGZLUrv16ZxK-49kkKVwBn~FLvs1b1S41LPXu7z9f7DWuNABtXBGPJOwJFbcP6uxJ6FrmUJ3t5kVdw2tg1ekR4rC1ZQ__'
        }
        location={'서울특별시 성동구'}
        like={33}
        comment={2}
      />
      <Post
        profileImage={'https://i.ibb.co/LNpPpWJ/image.jpg'}
        id={'Ewha04'}
        nickname={'예사롭지 않은 패피'}
        date={'2024년 06월 27일'}
        weather={'날씨 맑음'}
        ootdImage={
          'https://s3-alpha-sig.figma.com/img/2dee/9c18/4a18c7ef0557219335a6bede8d1d0c3f?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nBC3-pwz9uTv1qpostuzHMQ6526x3W7eq~Gnc9nZIJWSLjcYcYrncrkKOPy~lgjLWaVGriDoTgRtmPizKCw~j9~aFUQMdEONAJA8PTYvOMTsgjKmj3pOSXXvnjyJ8Bx~4rqx9po-ZIAyPye7FXlc9e9vyAjLS9sH~HNALJNqlVksiVeV7Wvckt6-E4YOoP2tbU8dx8Yj-F2YyQ5fu-entXiJUUTtzAm7oDCdwGtWNdpJXR4AjeTgtTObSvPuy4iZJaEC9-h8WkcvoGujqxoQ0YRX1nb6J0FSrUzH7VERD8-qJ17hIZNvxJZ-tofozWVHa3Kb68N5cUYVQh4RfPpC1g__'
        }
        collageImage={
          'https://s3-alpha-sig.figma.com/img/5b9c/73ba/153666f5977562a9942997bb05e5f3d7?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Jq4XLl3JFgwWM7rBndV90g8IdazbkEEJ0Hu8~ipfnEV1o6rAhpf1Bf5J8aI3fSNMl-iikbzEaiS1wH3iLrPjJG4BFY5pe-EtJMZJJPpS2GpWrNT8quqAeymHEnBpw7Y3pEhld3gh5idfC-Dn-EMAziahafw01dkKYJGKlH-GXxMzf~~H7D38PO8UJIr3lhX9YGwTu5KG~DrCy7s3lCiCfh4l0ETILXRwRREBzr-UkHsHcB5YHb7atsEnGHGPGZLUrv16ZxK-49kkKVwBn~FLvs1b1S41LPXu7z9f7DWuNABtXBGPJOwJFbcP6uxJ6FrmUJ3t5kVdw2tg1ekR4rC1ZQ__'
        }
        location={'서울특별시 성동구'}
        like={33}
        comment={2}
      />
      <Post
        profileImage={'https://i.ibb.co/LNpPpWJ/image.jpg'}
        id={'Ewha05'}
        nickname={'예사롭지 않은 패피'}
        date={'2024년 06월 27일'}
        weather={'날씨 맑음'}
        ootdImage={
          'https://s3-alpha-sig.figma.com/img/2dee/9c18/4a18c7ef0557219335a6bede8d1d0c3f?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nBC3-pwz9uTv1qpostuzHMQ6526x3W7eq~Gnc9nZIJWSLjcYcYrncrkKOPy~lgjLWaVGriDoTgRtmPizKCw~j9~aFUQMdEONAJA8PTYvOMTsgjKmj3pOSXXvnjyJ8Bx~4rqx9po-ZIAyPye7FXlc9e9vyAjLS9sH~HNALJNqlVksiVeV7Wvckt6-E4YOoP2tbU8dx8Yj-F2YyQ5fu-entXiJUUTtzAm7oDCdwGtWNdpJXR4AjeTgtTObSvPuy4iZJaEC9-h8WkcvoGujqxoQ0YRX1nb6J0FSrUzH7VERD8-qJ17hIZNvxJZ-tofozWVHa3Kb68N5cUYVQh4RfPpC1g__'
        }
        collageImage={
          'https://s3-alpha-sig.figma.com/img/5b9c/73ba/153666f5977562a9942997bb05e5f3d7?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Jq4XLl3JFgwWM7rBndV90g8IdazbkEEJ0Hu8~ipfnEV1o6rAhpf1Bf5J8aI3fSNMl-iikbzEaiS1wH3iLrPjJG4BFY5pe-EtJMZJJPpS2GpWrNT8quqAeymHEnBpw7Y3pEhld3gh5idfC-Dn-EMAziahafw01dkKYJGKlH-GXxMzf~~H7D38PO8UJIr3lhX9YGwTu5KG~DrCy7s3lCiCfh4l0ETILXRwRREBzr-UkHsHcB5YHb7atsEnGHGPGZLUrv16ZxK-49kkKVwBn~FLvs1b1S41LPXu7z9f7DWuNABtXBGPJOwJFbcP6uxJ6FrmUJ3t5kVdw2tg1ekR4rC1ZQ__'
        }
        location={'서울특별시 성동구'}
        like={33}
        comment={2}
      />
      <Post
        profileImage={'https://i.ibb.co/LNpPpWJ/image.jpg'}
        id={'Ewha06'}
        nickname={'예사롭지 않은 패피'}
        date={'2024년 06월 27일'}
        weather={'날씨 맑음'}
        ootdImage={
          'https://s3-alpha-sig.figma.com/img/2dee/9c18/4a18c7ef0557219335a6bede8d1d0c3f?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nBC3-pwz9uTv1qpostuzHMQ6526x3W7eq~Gnc9nZIJWSLjcYcYrncrkKOPy~lgjLWaVGriDoTgRtmPizKCw~j9~aFUQMdEONAJA8PTYvOMTsgjKmj3pOSXXvnjyJ8Bx~4rqx9po-ZIAyPye7FXlc9e9vyAjLS9sH~HNALJNqlVksiVeV7Wvckt6-E4YOoP2tbU8dx8Yj-F2YyQ5fu-entXiJUUTtzAm7oDCdwGtWNdpJXR4AjeTgtTObSvPuy4iZJaEC9-h8WkcvoGujqxoQ0YRX1nb6J0FSrUzH7VERD8-qJ17hIZNvxJZ-tofozWVHa3Kb68N5cUYVQh4RfPpC1g__'
        }
        collageImage={
          'https://s3-alpha-sig.figma.com/img/5b9c/73ba/153666f5977562a9942997bb05e5f3d7?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Jq4XLl3JFgwWM7rBndV90g8IdazbkEEJ0Hu8~ipfnEV1o6rAhpf1Bf5J8aI3fSNMl-iikbzEaiS1wH3iLrPjJG4BFY5pe-EtJMZJJPpS2GpWrNT8quqAeymHEnBpw7Y3pEhld3gh5idfC-Dn-EMAziahafw01dkKYJGKlH-GXxMzf~~H7D38PO8UJIr3lhX9YGwTu5KG~DrCy7s3lCiCfh4l0ETILXRwRREBzr-UkHsHcB5YHb7atsEnGHGPGZLUrv16ZxK-49kkKVwBn~FLvs1b1S41LPXu7z9f7DWuNABtXBGPJOwJFbcP6uxJ6FrmUJ3t5kVdw2tg1ekR4rC1ZQ__'
        }
        location={'서울특별시 성동구'}
        like={33}
        comment={2}
      />
      <Footer kind={'white'} />
      <UploadBtn onClick={openModal}>
        <CTA_button_med>룩북 올리기</CTA_button_med>
        <PencilIcon />
      </UploadBtn>
      {isOpen ? <UploadModal closeModal={closeModal} /> : <></>}
    </Container>
  );
}
