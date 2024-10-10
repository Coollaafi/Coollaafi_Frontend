import styled from 'styled-components';
import {
  Account_alert_reg,
  Chip_button_med,
  Desc_150_reg,
  Main_title_med,
} from 'styles/typography';
import { ReactComponent as SunIcon } from '../../assets/icons/sun.svg';
import { ReactComponent as WindIcon } from '../../assets/icons/wind.svg';
import { ReactComponent as RainIcon } from '../../assets/icons/rain.svg';
import { ReactComponent as CloudyIcon } from '../../assets/icons/cloudy.svg';
import { ReactComponent as CloudsIcon } from '../../assets/icons/clouds.svg';
import { ReactComponent as LocationIcon } from '../../assets/icons/location.svg';
import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg';
import { ReactComponent as LikeIcon } from '../../assets/icons/like.svg';
import { Link } from 'react-router-dom';
import NicknameBox from 'components/NicknameBox';
import default_profile from '../../assets/images/default-profile.svg';

const Container = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  padding: 24px 16px;
  background-color: #fbfbfb;
  border-bottom: 2px solid #f4f4f4;
  cursor: pointer;
  text-decoration: none;
  color: black;
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
  postId: number;
  tempMin: number;
  tempMax: number;
  content: string;
  postCondition: string;
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
  postId,
  tempMin,
  tempMax,
  content,
  postCondition,
}: PostProps) {
  return (
    <Container to={`/community/${postId}`}>
      <Box>
        <ProfileBox>
          <Profile>
            <ProfileImg
              src={profileImage == '' ? default_profile : profileImage}
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
              <CloudsIcon />
              <Account_alert_reg>{weather}</Account_alert_reg>
            </WeatherTextBox>
            <Temp>
              <Main_title_med>{tempMin}°</Main_title_med>
              <Line />
              <Main_title_med>{tempMax}°</Main_title_med>
            </Temp>
          </WeatherBox>
          <ConditionBox>
            <Chip_button_med>{postCondition}</Chip_button_med>
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
          <LikeIcon />
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
