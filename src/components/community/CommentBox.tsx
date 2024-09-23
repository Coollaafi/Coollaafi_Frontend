import styled from 'styled-components';
import Comment from './Comment';
import { useState } from 'react';
import { Desc_150_reg, Account_alert_reg } from 'styles/typography';
import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg';

const Container = styled.div<{ isBlank: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  background-color: #fff;
  border-bottom: ${(props) => (props.isBlank ? 'none' : '2px solid #f4f4f4')};
  padding: 16px;
`;

const ReCommentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-left: 48px;
  width: 100%;
  margin-top: 8px;
`;

const BarBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 48px;
  width: 100%;
  color: #9f9f9f;
`;

const CommentIconBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CommentBtn = styled.div`
  cursor: pointer;
  color: #9f9f9f;
`;

const BlankBox = styled.div`
  width: 100%;
  text-align: center;
  color: #9f9f9f;
`;

type CommentBoxProps = {
  mainComment:
    | {
        commentId: number;
        parentId: null;
        profileImg: string;
        nickname: string;
        id: string;
        content: string;
      }
    | undefined;

  subComment:
    | {
        commentId: number;
        parentId: number;
        profileImg: string;
        nickname: string;
        id: string;
        content: string;
      }[]
    | undefined;
};
export default function CommentBox({
  mainComment,
  subComment,
}: CommentBoxProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [isInput, setIsInput] = useState(false);

  return (
    <Container isBlank={mainComment == undefined ? true : false}>
      {mainComment ? (
        <>
          <Comment
            commentId={mainComment.commentId}
            parentId={mainComment.parentId}
            profileImg={mainComment.profileImg}
            nickname={mainComment.nickname}
            id={mainComment.id}
            content={mainComment.content}
          />
          {isClicked ? (
            <ReCommentBox>
              {subComment?.map((comment, idx) => (
                <div key={idx}>
                  <Comment
                    commentId={comment.commentId}
                    parentId={comment.parentId}
                    profileImg={comment.profileImg}
                    nickname={comment.nickname}
                    id={comment.id}
                    content={comment.content}
                  />
                </div>
              ))}
              <CommentBtn onClick={() => setIsInput(true)}>
                <Desc_150_reg>답글 달기</Desc_150_reg>
              </CommentBtn>
            </ReCommentBox>
          ) : (
            <BarBox>
              <CommentBtn onClick={() => setIsInput(true)}>
                <Desc_150_reg>답글 달기</Desc_150_reg>
              </CommentBtn>
              {subComment && (
                <CommentIconBox onClick={() => setIsClicked(true)}>
                  <CommentIcon fill="#9F9F9F" />
                  <Account_alert_reg>{subComment.length}</Account_alert_reg>
                </CommentIconBox>
              )}
            </BarBox>
          )}
        </>
      ) : (
        <BlankBox>
          <Desc_150_reg>댓글이 없습니다</Desc_150_reg>
        </BlankBox>
      )}
    </Container>
  );
}
