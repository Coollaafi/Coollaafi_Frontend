import styled from 'styled-components';
import Header from 'components/Header';
import Post from 'components/community/Post';
import CommentBox from 'components/community/CommentBox';
import { ReactComponent as UploadIcon } from '../assets/icons/comment-upload.svg';
import { useParams } from 'react-router-dom';
import { useState, useRef } from 'react';

const Container = styled.div`
  width: 360px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 56px;
`;

const PostBox = styled.div`
  pointer-events: none;
  margin-top: 70px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  padding-left: 16px;
  width: 360px;
  min-height: 56px;
  position: fixed;
  bottom: 0;
  background-color: #f4f4f4;
`;

const Input = styled.textarea<{ row: number }>`
  display: flex;
  align-items: center;
  width: ${(props) => (props.row == 1 ? '336px' : '400px')};
  height: ${(props) => (props.row == 1 ? '40px' : '104px')};
  border-radius: 64px;
  background-color: #fff;
  border: none;
  outline: none;
  caret-color: #000000;
  padding: ${(props) =>
    props.row == 1 ? '10px 35px 0 51px' : '8px 35px 8px 51px'};
  font-family: 'Noto_Reg';
  font-size: 12px;
  line-height: 18px;
  resize: none;
  word-break: break-all;
  overflow: scroll;
  &::placeholder {
    color: #9f9f9f;
  }
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  position: absolute;
  left: 16px;
  object-fit: cover;
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  right: 16px;
  cursor: pointer;
`;

export default function CommunityDetailPage() {
  const [row, setRow] = useState(1);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isInput, setIsInput] = useState<boolean>(false);
  const [ClickedLa, setClickedLa] = useState<string | undefined>(); //input placeholder

  const onClickUpload = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const mainComment = [
    {
      commentId: 0,
      parentId: null,
      profileImg: 'https://i.ibb.co/LNpPpWJ/image.jpg',
      nickname: '예사롭지 않은 패피',
      id: 'Ewha06',
      content: '우와 너 오늘 이 착장 진짜 잘 어울린다..',
    },
    {
      commentId: 1,
      parentId: null,
      profileImg: 'https://i.ibb.co/LNpPpWJ/image.jpg',
      nickname: '평범한 패피',
      id: 'Ewha03',
      content: '짱이다잉..',
    },
  ];

  const subComment = [
    {
      commentId: 0,
      parentId: 0,
      profileImg: 'https://i.ibb.co/LNpPpWJ/image.jpg',
      nickname: '평범한 패피',
      id: 'Ewha03',
      content: '우와 너 오늘 이 착장 진짜 잘 어울린다..',
    },
    {
      commentId: 1,
      parentId: 0,
      profileImg: 'https://i.ibb.co/LNpPpWJ/image.jpg',
      nickname: '평범한 패피',
      id: 'Ewha03',
      content: '우와 너 오늘 이 착장 진짜 잘 어울린다..',
    },
    {
      commentId: 1,
      parentId: 1,
      profileImg: 'https://i.ibb.co/LNpPpWJ/image.jpg',
      nickname: '예사롭지 않은 패피',
      id: 'Ewha06',
      content: '우와 너 오늘 이 착장 진짜 잘 어울린다..',
    },
  ];

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
      <CommentBox
        mainComment={mainComment}
        subComment={subComment}
        isInput={isInput}
        setIsInput={setIsInput}
        setClickedLa={setClickedLa}
        inputRef={inputRef}
      />
      <InputBox>
        <ProfileImage src="https://i.ibb.co/LNpPpWJ/image.jpg" />
        <Input
          ref={inputRef}
          row={row}
          placeholder={
            ClickedLa == undefined ? '' : `${ClickedLa}에게 남긴 댓글`
          }
        />
        <Icon onClick={onClickUpload}>
          <UploadIcon />
        </Icon>
      </InputBox>
    </Container>
  );
}
