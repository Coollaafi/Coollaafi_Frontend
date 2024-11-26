import styled from 'styled-components';
import {
  Account_alert_reg,
  Chip_button_med,
  Desc_150_reg,
  Main_title_med,
} from 'styles/typography';
import { ReactComponent as LocationIcon } from '../../assets/icons/location.svg';
import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg';
import { ReactComponent as LikeIcon } from '../../assets/icons/like.svg';
import { ReactComponent as FilledLikeIcon } from '../../assets/icons/filledLike.svg';
import { Link } from 'react-router-dom';
import NicknameBox from 'components/NicknameBox';
import default_profile from '../../assets/images/default-profile.svg';
import { useMutation } from 'react-query';
import { addPrefer, deletePrefer } from 'apis/community';
import { useUserStore } from 'store/user';
import { useEffect, useState } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  padding: 24px 16px;
  background-color: #fbfbfb;
  border-bottom: 2px solid #f4f4f4;
`;

const Box = styled(Link)<{ isDetail: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: pointer;
  text-decoration: none;
  color: black;
  pointer-events: ${(props) => (props.isDetail ? 'none' : 'auto')};
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 54px;
  gap: 62px;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const ProfileImg = styled.img`
  width: 54px;
  height: 54px;
  border-radius: 100%;
  border: none;
  object-fit: cover;
  cursor: default;
`;

const ProfileDes = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 3px 0;
  gap: 4px;
`;

const Date = styled.div`
  height: 100%;
  display: flex;
  align-items: end;
  color: #919191;
`;

const BarBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ConditionBox = styled.div`
  box-sizing: content-box;
  padding: 9px 9px;
  border-radius: 40px;
  border: 1px solid #ededed;
  background-color: #f8f8f8;
  color: #919191;
`;

const WeatherBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const Temp = styled.div`
  height: 19px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const Line = styled.div`
  width: 25px;
  height: 2px;
  border-radius: 8px;
  border: none;
  background-image: linear-gradient(to right, #547bc7, #a82e2e);
`;

const WeatherTextBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const WeatherIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const PostImgBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const PostImg = styled.img`
  width: 160px;
  height: 220px;
  object-fit: contain;
  cursor: default;
`;

const LocationBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 17px;
  align-items: center;
  justify-content: end;
`;

const SubBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  width: 100%;
  gap: 20px;
`;

const DetailBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  height: 17px;
  gap: 4px;
`;

const ContentBox = styled.div<{ isContent: boolean }>`
  display: ${(props) => (props.isContent ? 'flex' : 'none')};
  width: 100%;
  align-items: center;
  word-break: break-all;
`;

const LikeIconBox = styled.div<{ isLikedByMember: boolean }>`
  cursor: pointer;
  width: 16px;
  height: 17px;
`;

type PostProps = {
  profileImage: string;
  id: string;
  nickname: string;
  date: string;
  weather: string;
  weatherIcon: string;
  ootdImage: string;
  collageImage: string;
  location: string;
  like: number;
  comment: number;
  postId: number;
  tempMin: number;
  tempMax: number;
  content: string;
  postCondition: string;
  isLikedByMember: boolean;
  isDetail: boolean;
};

export default function Post({
  profileImage,
  id,
  nickname,
  date,
  weather,
  weatherIcon,
  ootdImage,
  collageImage,
  location,
  like,
  comment,
  postId,
  tempMin,
  tempMax,
  content,
  postCondition,
  isLikedByMember,
  isDetail,
}: PostProps) {
  const memberId = useUserStore((state) => state.memberId);
  const accessToken = useUserStore((state) => state.accessToken);
  const addPreferMutation = useMutation(addPrefer, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const deletePreferMutation = useMutation(deletePrefer, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const onClickLike = () => {
    if (!isLikedByMember) {
      addPreferMutation.mutate({
        postId: postId,
        memberId: memberId,
        accessToken: accessToken,
      });
    } else {
      deletePreferMutation.mutate({
        postId: postId,
        memberId: memberId,
        accessToken: accessToken,
      });
    }
  };

  return (
    <Container>
      <Box to={`/community/${postId}`} isDetail={isDetail}>
        <ProfileBox>
          <Profile>
            <ProfileImg
              src={profileImage ? profileImage : default_profile}
              onClick={(e) => {
                e.stopPropagation(); //e.stopPropagation(): 상위 엘레멘트들로의 이벤트 전파 중단
                e.preventDefault(); //e.preventDefault(): 고유 동작 멈춤
              }}
            />
            <ProfileDes>
              <Main_title_med>{id}</Main_title_med>
              <NicknameBox nickname={nickname} />
            </ProfileDes>
          </Profile>
          <Date>
            <Account_alert_reg>{date}</Account_alert_reg>
          </Date>
        </ProfileBox>
        <BarBox>
          <WeatherBox>
            <WeatherTextBox>
              <Account_alert_reg>{weather}</Account_alert_reg>
            </WeatherTextBox>
            <Temp>
              <Main_title_med>{tempMin}°</Main_title_med>
              <Line />
              <Main_title_med>{tempMax}°</Main_title_med>
            </Temp>
          </WeatherBox>
          <ConditionBox>
            <Chip_button_med>
              {postCondition == 'HOT'
                ? '더웠어요🥵'
                : postCondition == 'COLD'
                  ? '추웠어요🥶'
                  : '딱 좋았어요😖'}
            </Chip_button_med>
          </ConditionBox>
        </BarBox>
        <PostImgBox>
          <PostImg
            src={ootdImage}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          />
          <PostImg
            src={collageImage}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          />
        </PostImgBox>
        <LocationBox>
          <LocationIcon />
          <Account_alert_reg>{location}</Account_alert_reg>
        </LocationBox>
      </Box>
      <SubBox>
        <DetailBox>
          <LikeIconBox isLikedByMember={isLikedByMember} onClick={onClickLike}>
            {isLikedByMember ? <FilledLikeIcon /> : <LikeIcon />}
          </LikeIconBox>
          <Account_alert_reg>{like}</Account_alert_reg>
        </DetailBox>
        <DetailBox>
          <CommentIcon fill="black" />
          <Account_alert_reg>{comment}</Account_alert_reg>
        </DetailBox>
      </SubBox>
      <ContentBox isContent={content == '' ? false : true}>
        <Desc_150_reg>{content}</Desc_150_reg>
      </ContentBox>
    </Container>
  );
}
