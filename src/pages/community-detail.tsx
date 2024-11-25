import styled from 'styled-components';
import Header from 'components/Header';
import Post from 'components/community/Post';
import CommentBox from 'components/community/CommentBox';
import { ReactComponent as UploadIcon } from '../assets/icons/comment-upload.svg';
import { useParams } from 'react-router-dom';
import { useState, useRef } from 'react';
import { format } from 'date-fns';
import default_profile from '../assets/images/default-profile.svg';
import data from '../data/post.json';

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

  const onClickEnter = (e: any) => {
    if (e.key == 'Enter') {
      e.preventDefault();
      onClickUpload();
    }
  };

  const params = useParams();
  const postList = data.result;
  const item = postList.filter(
    (item) => item.post.postId == Number(params.postId),
  );
  const post = item[0].post;
  const member = item[0].member;
  const comment = item[0].comment;

  return (
    <Container>
      <Header type={'white'} />
      <PostBox>
        <Post
          profileImage={member.memberImage}
          id={member.memberServiceId}
          nickname={member.alias}
          date={format(new Date(post.createdAt), 'yyyy년 MM월 dd일')}
          weather={post.weather}
          weatherIcon={'sun'}
          ootdImage={post.ootdImage}
          collageImage={post.lookbookImage}
          location={post.location}
          like={post.preferCount}
          comment={post.commentCount}
          postId={post.postId}
          tempMin={post.MinTemp}
          tempMax={post.MaxTemp}
          content={post.content}
          postCondition={post.postCondition}
        />
      </PostBox>
      <CommentBox
        comment={comment}
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
          onKeyDown={(e) => onClickEnter(e)}
        />
        <Icon onClick={onClickUpload}>
          <UploadIcon />
        </Icon>
      </InputBox>
    </Container>
  );
}
