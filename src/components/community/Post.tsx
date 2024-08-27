import styled from 'styled-components';
import {
  Account_alert_reg,
  Chip_button_med,
  Main_title_med,
} from 'styles/typography';
import { ReactComponent as SunIcon } from '../../assets/icons/sun.svg';
import { ReactComponent as LocationIcon } from '../../assets/icons/location.svg';
import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg';
import { ReactComponent as LikeIcon } from '../../assets/icons/like.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  height: 447px;
  padding: 24px 16px;
  background-color: #fbfbfb;
  border-bottom: 2px solid #f4f4f4;
  cursor: pointer;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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
`;

const ProfileDes = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 3px 0;
  gap: 4px;
`;

const NickName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 24px;
  border-radius: 40px;
  border: 1px solid #ededed;
  background-color: #f8f8f8;
  color: #919191;
`;

const Date = styled.div`
  height: 100%;
  display: flex;
  align-items: end;
  color: #919191;
`;

const WeatherBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const PostImgBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  cursor: default;
`;

const PostImg = styled.img`
  width: 160px;
  height: 220px;
  object-fit: contain;
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

type PostProps = {
  profileImage: string;
  id: string;
  nickname: string;
  date: string;
  weather: string;
  ootdImage: string;
  collageImage: string;
  location: string;
  like: number;
  comment: number;
};

export default function Post({
  profileImage,
  id,
  nickname,
  date,
  weather,
  ootdImage,
  collageImage,
  location,
  like,
  comment,
}: PostProps) {
  return (
    <Container>
      <Box>
        <ProfileBox>
          <Profile>
            <ProfileImg src={profileImage} />
            <ProfileDes>
              <Main_title_med>{id}</Main_title_med>
              <NickName>
                <Chip_button_med>{nickname}</Chip_button_med>
              </NickName>
            </ProfileDes>
          </Profile>
          <Date>
            <Account_alert_reg>{date}</Account_alert_reg>
          </Date>
        </ProfileBox>
        <WeatherBox>
          <SunIcon />
          <Account_alert_reg>{weather}</Account_alert_reg>
        </WeatherBox>
        <PostImgBox>
          <PostImg src={ootdImage} />
          <PostImg src={collageImage} />
        </PostImgBox>
        <LocationBox>
          <LocationIcon />
          <Account_alert_reg>{location}</Account_alert_reg>
        </LocationBox>
      </Box>
      <SubBox>
        <DetailBox>
          <LikeIcon />
          <Account_alert_reg>{like}</Account_alert_reg>
        </DetailBox>
        <DetailBox>
          <CommentIcon />
          <Account_alert_reg>{comment}</Account_alert_reg>
        </DetailBox>
      </SubBox>
    </Container>
  );
}
