import styled from 'styled-components';
import Header from 'components/Header';
import Post from 'components/community/Post';
import CommentBox from 'components/community/CommentBox';
import { ReactComponent as UploadIcon } from '../assets/icons/comment-upload.svg';
import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { useUserStore } from 'store/user';
import { useMutation } from 'react-query';
import { comment, postDetail, reply } from 'apis/community';
import { home } from 'apis/home';

const Container = styled.div`
  width: 360px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 56px;
`;

const PostBox = styled.div`
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

type memberBasedProps = {
  memberServiceId: string;
  memberNickName: string;
  memberImage: string;
  alias: string;
};

type postProps = {
  member: {
    memberServiceId: string;
    memberNickName: string;
    memberImage: string;
    alias: string;
  };
  post: {
    postId: number;
    ootd_url: string;
    lookbook_url: string;
    address: string;
    tmin: number;
    tmax: number;
    weather_description: string;
    weather_icon_url: string;
    postCondition: string;
    createdAt: string;
    preferCount: number;
    commentCount: number;
    isLikedByMember: boolean;
  };
  postAdd: {
    description: string;
  };
  comments: {
    comment: {
      member: {
        memberServiceId: string;
        memberNickName: string;
        memberImage: string;
        alias: string;
      };
      commentId: number;
      content: string;
      replyCount: number;
      createdAt: string;
    };
    replies: {
      member: {
        memberServiceId: string;
        memberNickName: string;
        memberImage: string;
        alias: string;
      };
      replyId: number;
      content: string;
      createdAt: string;
    }[];
  }[];
};

export default function CommunityDetailPage() {
  const [row, setRow] = useState(1);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isInput, setIsInput] = useState<boolean>(false);
  const [ClickedLa, setClickedLa] = useState<string | undefined>(); //input placeholder
  const [memberBased, setMemberBased] = useState<memberBasedProps>();
  const [postData, setPostData] = useState<postProps>();
  const [commentId, setCommentId] = useState<number>(-1);
  const memberId = useUserStore((state) => state.memberId);
  const accessToken = useUserStore((state) => state.accessToken);
  const params = useParams();

  const homeMutation = useMutation(home, {
    onSuccess: (data) => {
      setMemberBased(data.result.memberBased);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const postsDetailMutation = useMutation(postDetail, {
    onSuccess: (data) => {
      setPostData(data.result);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const commentMutation = useMutation(comment, {
    onSuccess: (data) => {
      console.log(data.result);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const replyMutation = useMutation(reply, {
    onSuccess: (data) => {
      console.log(data.result);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const onClickUpload = () => {
    if (inputRef.current && inputRef.current.value != '') {
      if (commentId == -1) {
        commentMutation.mutate({
          accessToken: accessToken,
          memberId: memberId,
          postId: params.postId,
          content: inputRef.current.value,
        });
      } else {
        replyMutation.mutate({
          accessToken: accessToken,
          memberId: memberId,
          commentId: commentId - 1,
          content: inputRef.current.value,
        });
      }

      inputRef.current.value = '';
    }
  };

  const onClickEnter = (e: any) => {
    if (e.key == 'Enter') {
      e.preventDefault();
      onClickUpload();
    }
  };

  useEffect(() => {
    homeMutation.mutate({ memberId: memberId, accessToken: accessToken });

    postsDetailMutation.mutate({
      accessToken: accessToken,
      memberId: memberId,
      postId: params.postId,
    });
  }, []);

  return (
    <Container>
      <Header type={'white'} />
      <PostBox>
        {postData && (
          <Post
            profileImage={postData?.member.memberImage}
            id={postData?.member.memberServiceId}
            nickname={postData?.member.alias}
            date={format(
              new Date(postData?.post.createdAt),
              'yyyy년 MM월 dd일',
            )}
            weather={postData?.post.weather_description}
            weatherIcon={postData?.post.weather_icon_url}
            ootdImage={postData?.post.ootd_url}
            collageImage={postData?.post.lookbook_url}
            location={postData?.post.address}
            like={postData?.post.preferCount}
            comment={postData?.post.commentCount}
            postId={postData?.post.postId}
            tempMin={postData?.post.tmin}
            tempMax={postData?.post.tmax}
            content={postData?.postAdd.description}
            postCondition={postData?.post.postCondition}
            isLikedByMember={postData?.post.isLikedByMember}
            isDetail={true}
          />
        )}
      </PostBox>
      <CommentBox
        comments={postData?.comments}
        isInput={isInput}
        setIsInput={setIsInput}
        setClickedLa={setClickedLa}
        setCommentId={setCommentId}
        inputRef={inputRef}
      />
      <InputBox>
        <ProfileImage src={memberBased?.memberImage} />
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
