import styled from 'styled-components';
import Header from 'components/Header';
import Post from 'components/community/Post';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  width: 360px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostBox = styled.div`
  pointer-events: none;
  margin-top: 70px;
`;

export default function CommunityDetailPage() {
  const params = useParams();

  return (
    <Container>
      <Header type={'white'} />
      <PostBox>
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
          postId={3}
        />
      </PostBox>
    </Container>
  );
}
