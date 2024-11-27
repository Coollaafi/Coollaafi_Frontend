import styled from 'styled-components';
import {
  Account_alert_reg,
  CTA_button_med,
  Main_title_med,
} from 'styles/typography';
import { ReactComponent as PencilIcon } from '../assets/icons/pencil.svg';
import { ReactComponent as FriendIcon } from '../assets/icons/friend.svg';
import { ReactComponent as PlusIcon } from '../assets/icons/friend-plus.svg';
import { Desc_120_med } from 'styles/typography';
import UploadModal from 'components/community/UploadModal';
import useModal from 'hooks/useModal';
import Header from 'components/Header';
import Post from 'components/community/Post';
import Footer from 'components/Footer';
import { useEffect, useState } from 'react';
import AddFriendModal from 'components/community/AddFriendModal';
import { format } from 'date-fns';
import { useMutation } from 'react-query';
import { getAddress } from 'apis/recommend';
import { posts } from 'apis/community';
import { useUserStore } from 'store/user';

const Container = styled.div`
  width: 360px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 16px;
  width: 100%;
  height: 91px;
  padding: 8px 16px 16px 16px;
  color: black;
  margin-top: 70px;
`;

const BarBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const BtnTitle = styled.div`
  display: flex;
  height: 24px;
  align-items: center;
`;

const PlusFriendIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MarginBox = styled.div`
  margin-right: -10px;
  height: 24px;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const CheckBoxs = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 4px;
  width: 108px;
  height: 32px;
  border-radius: 80px;
  background-color: #efefef;
`;

const CheckBox = styled.div<{ $isClicked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 24px;
  border-radius: 40px;
  background-color: ${({ $isClicked }) => ($isClicked ? '#000000' : '#ffffff')};
  color: ${({ $isClicked }) => ($isClicked ? '#ffffff' : '#919191')};
  cursor: pointer;
  &:hover {
    background-color: #000;
    color: #ffffff;
  }
`;

const UploadBtn = styled.button`
  gap: 8px;
  background-color: #000;
  color: #fff;
  box-sizing: content-box;
  padding: 11px 15px;
  border: 1px solid #000;
  border-radius: 40px;
  position: fixed;
  bottom: 24px;
  z-index: 1;
`;

const BlankBox = styled.div`
  width: 100%;
  height: calc(100vh - 225px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9f9f9f;
  text-align: center;
`;

type postListProps = {
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
};

export default function CommunityPage() {
  const {
    isOpen: isUploadOpen,
    closeModal: closeUploadModal,
    openModal: openUploadModal,
  } = useModal();
  const {
    isOpen: isAddFriendOpen,
    closeModal: closeAddFriendModal,
    openModal: openAddFriendModal,
  } = useModal();
  const [isAll, setIsAll] = useState<boolean>(true);

  const [postList, setPostList] = useState<postListProps[]>([]);
  const [newPostList, setNewPostList] = useState<postListProps[]>([]);
  const [city, setCity] = useState<string>('');
  const [si, setSi] = useState<string>('');
  const [gu, setGU] = useState<string>('');

  const memberId = useUserStore((state) => state.memberId);
  const accessToken = useUserStore((state) => state.accessToken);

  const postsMutation = useMutation(posts, {
    onSuccess: (data) => {
      setPostList(data.result);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  //이용자 위치 가져오기
  const addressMutation = useMutation(getAddress, {
    onSuccess: (data) => {
      setCity(data.region_1depth_name + ' ' + data.region_2depth_name);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  //이용자의 경도,위도 가져오기_주소/날씨가져오는 api에 경도,위도 넣기
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          addressMutation.mutate({
            lng: position.coords.longitude.toString(),
            lat: position.coords.latitude.toString(),
          });
        },
        function (error) {
          console.log(error);
        },
        {
          enableHighAccuracy: false, //배터리를 더 소모해서 더 정확한 위치를 찾을 것인지_true로 하면 더 정확하지만 더 오래걸림
          maximumAge: 0, //캐시된 위치 정보의 유효시간 지정_0으로 지정시, 캐시 사용없이 실시간으로
          timeout: Infinity, //주어진 초 안에 찾지 못하면 에러 발생_위치 반환 시 소모할 수 있는 최대 시간
        },
      );
    } else {
      alert('현재 브라우저에서는 geolocation을 지원하지 않습니다');
    }
    return;
  }

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    postsMutation.mutate({ memberId: memberId, accessToken: accessToken });
  }, [postList]);

  useEffect(() => {
    setSi(city.split(' ').filter((e) => e[e.length - 1] == '시')[0]);
    setGU(city.split(' ').filter((e) => e[e.length - 1] == '구')[0]);
    console.log(si, gu);

    if (!isAll) {
      const updatedPostList = postList.filter(
        (item) => item.post.address == si + ' ' + gu,
      );
      setNewPostList(updatedPostList);
    } else if (isAll) {
      setNewPostList(postList);
    }
  }, [isAll]);

  return (
    <Container>
      <Header type={'white'} />
      <TitleBox>
        <Main_title_med>이번주 친구들의 룩북 구경하기</Main_title_med>
        <BarBox>
          <CheckBoxs>
            <CheckBox $isClicked={!isAll} onClick={() => setIsAll(false)}>
              <Desc_120_med>내 위치</Desc_120_med>
            </CheckBox>
            <CheckBox $isClicked={isAll} onClick={() => setIsAll(true)}>
              <Desc_120_med>전체위치</Desc_120_med>
            </CheckBox>
          </CheckBoxs>
          <IconBox onClick={openAddFriendModal}>
            <BtnTitle>
              <Main_title_med>친구추가하기</Main_title_med>
            </BtnTitle>
            <PlusFriendIcon>
              <MarginBox>
                <PlusIcon />
              </MarginBox>
              <FriendIcon />
            </PlusFriendIcon>
          </IconBox>
        </BarBox>
      </TitleBox>
      {newPostList.length != 0 && newPostList ? (
        newPostList.map((item) => {
          const member = item.member;
          const post = item.post;

          return (
            <Post
              key={post.postId}
              profileImage={member.memberImage}
              id={member.memberServiceId}
              nickname={member.alias}
              date={format(new Date(post.createdAt), 'yyyy년 MM월 dd일')}
              weather={post.weather_description}
              weatherIcon={post.weather_icon_url}
              ootdImage={post.ootd_url}
              collageImage={post.lookbook_url}
              location={post.address}
              like={post.preferCount}
              comment={post.commentCount}
              postId={post.postId}
              tempMin={post.tmin}
              tempMax={post.tmax}
              content={''}
              postCondition={post.postCondition}
              isLikedByMember={post.isLikedByMember}
              isDetail={false}
            />
          );
        })
      ) : (
        <BlankBox>
          <Account_alert_reg>
            게시글을 올린 친구가 없습니다.
            <br />
            가장 먼저 올려보세요.
          </Account_alert_reg>
        </BlankBox>
      )}
      <Footer kind={'white'} />
      <UploadBtn onClick={openUploadModal}>
        <CTA_button_med>룩북 올리기</CTA_button_med>
        <PencilIcon />
      </UploadBtn>
      {isUploadOpen && <UploadModal closeModal={closeUploadModal} />}
      {isAddFriendOpen && <AddFriendModal closeModal={closeAddFriendModal} />}
    </Container>
  );
}
