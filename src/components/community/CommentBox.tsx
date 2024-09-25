import styled from 'styled-components';
import Comment from './Comment';
import React, { useEffect, useState } from 'react';
import { Desc_150_reg, Account_alert_reg } from 'styles/typography';
import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg';

const Container = styled.div<{ isBlank: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
  border-bottom: ${(props) => (props.isBlank ? 'none' : '2px solid #f4f4f4')};
  padding-bottom: 16px;
`;

const ReCommentBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 48px;
  width: 100%;
`;

const BarBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 16px 0 64px;
  width: 100%;
  color: #9f9f9f;
  margin-top: 8px;
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
  margin-top: 16px;
  padding-left: 16px;
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
      }[]
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

  onClickComment(): void;
  isInput: boolean;
  inputRef: React.RefObject<HTMLTextAreaElement>;
};

export default function CommentBox({
  mainComment,
  subComment,
  onClickComment,
  isInput,
  inputRef,
}: CommentBoxProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [comLength, setComLength] = useState<number[]>([]);

  useEffect(() => {
    if (isInput) {
      inputRef.current?.focus();
    }
  });

  useEffect(() => {
    const updatedLength = [...comLength];

    mainComment?.map((comment) => {
      updatedLength[comment.commentId] =
        subComment?.filter((item) => item.parentId == comment.commentId)
          .length ?? 0;

      setComLength(updatedLength);
    });
  }, subComment);

  return (
    <Container isBlank={mainComment == undefined ? true : false}>
      {mainComment ? (
        <>
          {mainComment.map((comment, idx) => (
            <div key={idx}>
              <Comment
                commentId={comment.commentId}
                parentId={comment.parentId}
                profileImg={comment.profileImg}
                nickname={comment.nickname}
                id={comment.id}
                content={comment.content}
              />
              {isClicked ? (
                <ReCommentBox>
                  {subComment
                    ?.filter((item) => item.parentId == comment.commentId)
                    ?.map((subComment, idx) => (
                      <div key={idx}>
                        <Comment
                          commentId={subComment.commentId}
                          parentId={subComment.parentId}
                          profileImg={subComment.profileImg}
                          nickname={subComment.nickname}
                          id={subComment.id}
                          content={subComment.content}
                        />
                      </div>
                    ))}
                  <CommentBtn onClick={onClickComment}>
                    <Desc_150_reg>답글 달기</Desc_150_reg>
                  </CommentBtn>
                </ReCommentBox>
              ) : (
                <BarBox>
                  <CommentBtn onClick={onClickComment}>
                    <Desc_150_reg>답글 달기</Desc_150_reg>
                  </CommentBtn>
                  {subComment && (
                    <CommentIconBox onClick={() => setIsClicked(true)}>
                      <CommentIcon fill="#9F9F9F" />
                      <Account_alert_reg>
                        {comLength[comment.commentId]}
                      </Account_alert_reg>
                    </CommentIconBox>
                  )}
                </BarBox>
              )}
            </div>
          ))}
        </>
      ) : (
        <BlankBox>
          <Desc_150_reg>댓글이 없습니다</Desc_150_reg>
        </BlankBox>
      )}
    </Container>
  );
}
