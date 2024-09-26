import styled from 'styled-components';
import Comment from './Comment';
import React, { useEffect, useState, useRef } from 'react';
import { Desc_150_reg, Account_alert_reg } from 'styles/typography';
import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
`;

const ReCommentBox = styled.div<{ isBlank: boolean }>`
  width: 100;
  border-bottom: ${(props) => (props.isBlank ? 'none' : '2px solid #f4f4f4')};
`;

const ReComments = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 48px;
  width: 100%;
`;

const BarBox = styled.div<{ isClicked: boolean; isBlank: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 16px 16px 64px;
  width: 100%;
  color: #9f9f9f;
  background-color: ${(props) => (props.isClicked ? '#fbfbfb' : '#fff')};
  border-bottom: ${(props) => (props.isBlank ? 'none' : '2px solid #f4f4f4')};
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

const ClickedCommentBtn = styled.div`
  cursor: pointer;
  color: #9f9f9f;
  padding: 16px 0 16px 16px;
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

  isInput: boolean;
  setIsInput: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedLa: React.Dispatch<React.SetStateAction<string | undefined>>;
  inputRef: React.RefObject<HTMLTextAreaElement>;
};

export default function CommentBox({
  mainComment,
  subComment,
  isInput,
  setIsInput,
  setClickedLa,
  inputRef,
}: CommentBoxProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false); //isInput 활성화
  const [isClickedMo, setIsClickedMo] = useState<boolean[]>([]); //댓글 더 보기 버튼 클릭시, 메인 댓글 색상 변경
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isClickedWr, setIsClickedWr] = useState<boolean[]>([]); //댓글쓰기 버튼
  const [comLength, setComLength] = useState<number[]>([]); //subComment 갯수

  //timeout
  const timeoutComment = (id: number) => {
    const updatedClickedWr = [];
    updatedClickedWr[id] = false;
    setIsClickedWr(updatedClickedWr);
    console.log(isClicked);
  };

  //댓글쓰기 버튼 이벤트
  const onClickComment = (id: number) => {
    setIsInput(true);
    setIsClicked(!isClicked);
    const updatedClicked = [];
    updatedClicked[id] = true;
    setIsClickedWr(updatedClicked);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setTimeout(() => {
      timeoutComment(id);
    }, 3000);
    setClickedLa(mainComment == undefined ? undefined : mainComment[id]?.id);
  };

  //댓글 더보기 버튼 이벤트
  const onClickMoreComment = (id: number) => {
    const updatedClickedMo = [...isClickedMo];
    updatedClickedMo[id] = true;
    setIsClickedMo(updatedClickedMo);
  };

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
    <Container>
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
                isClicked={isClickedWr[comment.commentId]}
              />
              {isClickedMo[comment.commentId] ? (
                <ReCommentBox isBlank={mainComment ? false : true}>
                  <ReComments>
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
                            isClicked={undefined}
                          />
                        </div>
                      ))}
                    <ClickedCommentBtn
                      onClick={() => onClickComment(comment.commentId)}
                    >
                      <Desc_150_reg>답글 달기</Desc_150_reg>
                    </ClickedCommentBtn>
                  </ReComments>
                </ReCommentBox>
              ) : (
                <BarBox
                  isClicked={isClickedWr[comment.commentId]}
                  isBlank={mainComment ? false : true}
                >
                  <CommentBtn onClick={() => onClickComment(comment.commentId)}>
                    <Desc_150_reg>답글 달기</Desc_150_reg>
                  </CommentBtn>
                  {subComment && (
                    <CommentIconBox
                      onClick={() => onClickMoreComment(comment.commentId)}
                    >
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
