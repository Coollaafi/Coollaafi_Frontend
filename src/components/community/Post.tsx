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

export default function Post() {
  return (
    <Container>
      <Box>
        <ProfileBox>
          <Profile>
            <ProfileImg src={'https://i.ibb.co/LNpPpWJ/image.jpg'} />
            <ProfileDes>
              <Main_title_med>{'Ewha03'}</Main_title_med>
              <NickName>
                <Chip_button_med>{'예사롭지 않은 패피'}</Chip_button_med>
              </NickName>
            </ProfileDes>
          </Profile>
          <Date>
            <Account_alert_reg>{'2024년 06월 27일'}</Account_alert_reg>
          </Date>
        </ProfileBox>
        <WeatherBox>
          <SunIcon />
          <Account_alert_reg>{'날씨 맑음'}</Account_alert_reg>
        </WeatherBox>
        <PostImgBox>
          <PostImg
            src={
              'https://s3-alpha-sig.figma.com/img/2dee/9c18/4a18c7ef0557219335a6bede8d1d0c3f?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nBC3-pwz9uTv1qpostuzHMQ6526x3W7eq~Gnc9nZIJWSLjcYcYrncrkKOPy~lgjLWaVGriDoTgRtmPizKCw~j9~aFUQMdEONAJA8PTYvOMTsgjKmj3pOSXXvnjyJ8Bx~4rqx9po-ZIAyPye7FXlc9e9vyAjLS9sH~HNALJNqlVksiVeV7Wvckt6-E4YOoP2tbU8dx8Yj-F2YyQ5fu-entXiJUUTtzAm7oDCdwGtWNdpJXR4AjeTgtTObSvPuy4iZJaEC9-h8WkcvoGujqxoQ0YRX1nb6J0FSrUzH7VERD8-qJ17hIZNvxJZ-tofozWVHa3Kb68N5cUYVQh4RfPpC1g__'
            }
          />
          <PostImg
            src={
              'https://s3-alpha-sig.figma.com/img/5b9c/73ba/153666f5977562a9942997bb05e5f3d7?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Jq4XLl3JFgwWM7rBndV90g8IdazbkEEJ0Hu8~ipfnEV1o6rAhpf1Bf5J8aI3fSNMl-iikbzEaiS1wH3iLrPjJG4BFY5pe-EtJMZJJPpS2GpWrNT8quqAeymHEnBpw7Y3pEhld3gh5idfC-Dn-EMAziahafw01dkKYJGKlH-GXxMzf~~H7D38PO8UJIr3lhX9YGwTu5KG~DrCy7s3lCiCfh4l0ETILXRwRREBzr-UkHsHcB5YHb7atsEnGHGPGZLUrv16ZxK-49kkKVwBn~FLvs1b1S41LPXu7z9f7DWuNABtXBGPJOwJFbcP6uxJ6FrmUJ3t5kVdw2tg1ekR4rC1ZQ__'
            }
          />
        </PostImgBox>
        <LocationBox>
          <LocationIcon />
          <Account_alert_reg>{'서울특별시 성동구'}</Account_alert_reg>
        </LocationBox>
      </Box>
      <SubBox>
        <DetailBox>
          <LikeIcon />
          <Account_alert_reg>{33}</Account_alert_reg>
        </DetailBox>
        <DetailBox>
          <CommentIcon />
          <Account_alert_reg>{2}</Account_alert_reg>
        </DetailBox>
      </SubBox>
    </Container>
  );
}
