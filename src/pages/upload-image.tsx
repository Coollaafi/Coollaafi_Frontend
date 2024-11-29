import styled from 'styled-components';
import BackgroundImage from '../assets/images/upload.svg';
import { ReactComponent as UploadIcon } from '../assets/icons/upload.svg';
import Header from 'components/Header';
import Footer from 'components/Footer';
import {
  Main_title_med,
  User_id_title_med,
  Desc_150_med,
  CTA_button_med,
} from 'styles/typography';
import UploadImage from 'components/UploadImage';
import { useEffect, useState } from 'react';
import ButtonBox from 'components/ButtonBox';
import { useUserStore } from 'store/user';
import { useMutation } from 'react-query';
import { ootd } from 'apis/recommend';
import { useNavigate } from 'react-router-dom';
import AlertBox from 'components/AlertBox';
import { home } from 'apis/home';

const Container = styled.div`
  width: 360px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  padding: 0 16px;
`;

const TextBox = styled.div`
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 202px 0 32px 0;
`;

const User = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 1px;
`;

const SelectBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ImageBox = styled.div<{ isFile: boolean }>`
  width: 140px;
  height: 200px;
  background-color: #121212;
  border: ${(props) =>
    props.isFile ? '1px dashed #ffffff' : '1px dashed #4d4d4d'};
`;

const GuideBox = styled.div`
  width: 100%;
  margin: 32px 0 31px 0;
  color: white;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 6px;
`;

const Star = styled.div`
  width: 8.5px;
  color: #ff0000;
`;

const Texts = styled.div`
  color: #9f9f9f;
`;

const TotalText = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const Text = styled.div<{ width: number }>`
  width: ${(props) => props.width}px;
`;

const Button = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 9.92px;
  width: 100%;
  height: 48px;
  margin-bottom: 42px;
  color: black;
  background-color: white;
  cursor: pointer;
`;

type memberBasedProps = {
  memberServiceId: string;
  memberNickName: string;
  memberImage: string;
  alias: string;
};

export default function UploadImagePage() {
  const [memberBased, setMemberBased] = useState<memberBasedProps>();
  const [imgFileBlob, setImgFileBlob] = useState<Blob>(new Blob());
  const [imgFile, setImgFile] = useState<string>('');
  const [isClicked, setIsClicked] = useState<boolean[]>([]);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const memberId = useUserStore((state) => state.memberId);
  const accessToken = useUserStore((state) => state.accessToken);
  const formData = new FormData();
  const navigation = useNavigate();

  const homeMutation = useMutation(home, {
    onSuccess: (data) => {
      setMemberBased(data.result.memberBased);
    },
  });

  const ootdMutation = useMutation(ootd, {
    onSuccess: (data) => {
      navigation(`/`);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const onClickBtn = () => {
    formData.append('ootdImage', imgFileBlob);
    formData.append('memberId', memberId);
    categoryList.forEach((category) => {
      formData.append('categorySet', category);
    });
    ootdMutation.mutate({
      accessToken: accessToken,
      formData: formData,
    });
    console.log(categoryList);
  };

  useEffect(() => {
    homeMutation.mutate({ memberId: memberId, accessToken: accessToken });
  }, []);

  return (
    <Container>
      <Header type={'trans'} />
      <TextBox>
        <User>
          <User_id_title_med>
            {memberBased?.alias + ' ' + memberBased?.memberServiceId}
          </User_id_title_med>
          <Main_title_med>님만의</Main_title_med>
        </User>
        <Main_title_med>
          AI를 발전시킬 옷이 나온
          <br /> 최근 사진들을 올려주세요
        </Main_title_med>
      </TextBox>
      {ootdMutation.isLoading && <AlertBox type={'dark'} />}
      <SelectBox>
        <ImageBox isFile={imgFile == '' ? false : true}>
          <UploadImage
            imgFile={imgFile}
            setImgFile={setImgFile}
            setImgFileBlob={setImgFileBlob}
            type="trans"
          />
        </ImageBox>
        <ButtonBox
          type="black"
          isClicked={isClicked}
          setIsClicked={setIsClicked}
          categoryList={categoryList}
          setCategoryList={setCategoryList}
        />
      </SelectBox>
      <GuideBox>
        <Title>
          <Star>
            <Main_title_med>* </Main_title_med>
          </Star>
          <Main_title_med>사진 업로드 가이드 </Main_title_med>
        </Title>
        <Texts>
          <Desc_150_med>
            <TotalText>
              1.
              <Text width={170}>
                상의, 하의, 아우터 중 하나라도 완전히 나온 사진으로 올려주세요.
              </Text>
            </TotalText>
            <TotalText>
              2. <Text width={200}>얼굴은 나오지 않아도 됩니다.</Text>
            </TotalText>
            <TotalText>
              3.
              <Text width={220}>
                누적 50장의 사진을 업로드하면 날씨에 맞는 옷을 추천받을
                수있습니다.
              </Text>
            </TotalText>
          </Desc_150_med>
        </Texts>
      </GuideBox>
      <Button onClick={onClickBtn}>
        <UploadIcon stroke="black" />
        <CTA_button_med>사진 업로드하기</CTA_button_med>
      </Button>
      <Footer kind={'black'} />
    </Container>
  );
}
