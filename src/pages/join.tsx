import styled from 'styled-components';
import Header from 'components/Header';
import useImage from 'hooks/useImage';
import {
  Account_alert_reg,
  CTA_button_med,
  Main_title_med,
  Noto_Receipt,
  User_id_title_med,
} from 'styles/typography';
import { useEffect, useRef, useState } from 'react';
import default_profile from '../assets/images/default-profile.svg';
import { ReactComponent as CheckIcon } from '../assets/icons/circle-check.svg';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { checkServiceId, join } from 'apis/auth';
import { useLocation } from 'react-router-dom';
import { useUserStore } from 'store/user';

const Container = styled.div`
  width: 360px;
  height: 100%;
  background-color: black;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 70px 16px 48px 16px;
`;

const Title = styled.div`
  width: 100%;
  margin: 5px 0 40px 0;
  color: white;
`;

const NicknameInputBox = styled.div`
  width: 100%;
  margin-bottom: 64px;
  color: white;
`;

const IdInputBox = styled.div`
  width: 100%;
  margin-bottom: 31px;
  color: white;
`;

const InputTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  color: white;
  caret-color: white;
  font-family: 'Noto_Med';
  font-size: 14px;
  line-height: 120%;
  letter-spacing: -1.12px;
  height: 48px;
  background-color: #1d1d1d;
  margin-top: 32px;
  padding-left: 14px;
  &::placeholder {
    color: #3b3b3b;
  }
`;

const CheckBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  gap: 8px;
  margin: 8px 0 21px 0;
`;

const Check = styled.div<{ isChecked: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 4px;
  color: ${(props) => (props.isChecked ? 'white' : '#3b3b3b')};
  .check {
    stroke: ${(props) => (props.isChecked ? 'white' : '#3b3b3b')};
  }
`;

const DuplicateCheck = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const ErrorBox = styled.div<{ isSeen: boolean }>`
  color: #ff6347;
  display: ${(props) => (props.isSeen ? 'block' : 'none')};
`;

const ProfileBox = styled.div`
  width: 100%;
  margin-bottom: 68px;
  color: white;
`;

const ImageBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const ShowImageBox = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  border: 1px solid #1d1d1d;
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextBtn = styled.div<{ isChecked: boolean }>`
  text-decoration: underline;
  text-underline-offset: 2px;
  color: ${(props) => (props.isChecked ? 'white' : '#3b3b3b')};
  cursor: pointer;
`;

const HiddenBtn = styled.input`
  display: none;
`;

const Button = styled.div<{ isChecked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  background-color: ${(props) => (props.isChecked ? 'white' : '#1d1d1d')};
  color: ${(props) => (props.isChecked ? 'black' : '#3b3b3b')};
  cursor: pointer;
`;

export default function JoinPage() {
  const [imgFile, setImgFile] = useState<string>('');
  const fileRef = useRef<HTMLInputElement>(null);
  const { handleClick, changeFile } = useImage({ setImgFile, fileRef });
  //유효성 검사
  const [nickname, setNickname] = useState<string>('');
  const [isNickname, setIsNickname] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const regEng = /[a-zA-Z]/;
  const regNum = /[0-9]/;
  const regSpe = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/;
  const resExc = /[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~ ]/g;
  const [isEng, setIsEng] = useState<boolean>(false);
  const [isNum, setIsNum] = useState<boolean>(false);
  const [isSpe, setIsSpe] = useState<boolean>(false);
  const [isLong, setIsLong] = useState<boolean>(false);
  const [isExc, setIsExc] = useState<boolean>(false);
  const [isOnly, setIsOnly] = useState<boolean>(false);
  const [isErrorSeen, setIsErrorSeen] = useState<boolean>(false);

  const navigation = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const accessToken = queryParams.get('accessToken');
  const refreshToken = queryParams.get('refreshToken');

  const setAccessToken = useUserStore((state) => state.setAccessToken);
  const setRefreshToken = useUserStore((state) => state.setRefreshToken);

  const formdata = {
    memberId: 0,
    serviceId: id,
    nickname: nickname,
    profileImage: imgFile,
  };

  const checkServiceIdMutation = useMutation(checkServiceId, {
    onSuccess: (data) => {
      setIsOnly(data);
      if (!data) {
        setIsErrorSeen(true);
      }
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const joinMutation = useMutation(join, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const onCheckServiceId = () => {
    checkServiceIdMutation.mutate({ serviceId: id, accessToken: accessToken });
  };

  const onClickBtn = () => {
    joinMutation.mutate({ formdata: formdata, accessToken: accessToken });
    if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    }
    console.log(accessToken);
    /*navigation('/home');*/
  };

  //닉네임 20이내로
  useEffect(() => {
    if (nickname.length > 0 && nickname.length <= 20) {
      setIsNickname(true);
    } else {
      setIsNickname(false);
    }
  }, [nickname]);

  //영문, 숫자, 특수문자 포함. 6-12자
  useEffect(() => {
    if (id.length >= 6 && id.length <= 12) {
      setIsLong(true);
    } else {
      setIsLong(false);
    }

    if (regEng.test(id)) {
      setIsEng(true);
    } else {
      setIsEng(false);
    }

    if (regNum.test(id)) {
      setIsNum(true);
    } else {
      setIsNum(false);
    }

    if (regSpe.test(id)) {
      setIsSpe(true);
    } else {
      setIsSpe(false);
    }

    if (id.match(resExc) == undefined) {
      setIsExc(true);
    } else {
      setIsExc(false);
    }
  }, [id]);

  //id 변경 시, isOnly, 에러 메시지 리셋
  useEffect(() => {
    setIsOnly(false);
    setIsErrorSeen(false);
  }, [id]);

  return (
    <Container>
      <Header type="black" />
      <Content>
        <Title>
          <User_id_title_med>회원가입</User_id_title_med>
        </Title>
        <NicknameInputBox>
          <InputTitleBox>
            <Main_title_med>닉네임</Main_title_med>
            <Account_alert_reg>
              다른 유저에게 보여질 닉네임을 20자 이내로 작성해주세요.
            </Account_alert_reg>
          </InputTitleBox>
          <Input
            type="text"
            placeholder="닉네임을 입력해주세요"
            onChange={(e) => setNickname(e.target.value)}
            value={nickname}
          />
        </NicknameInputBox>
        <IdInputBox>
          <InputTitleBox>
            <Main_title_med>아이디</Main_title_med>
            <Account_alert_reg>
              룩북 커뮤니티에서 사용할 아이디를 입력해주세요.
            </Account_alert_reg>
            <ErrorBox isSeen={isErrorSeen}>
              {!isOnly && <Noto_Receipt>중복된 아이디입니다.</Noto_Receipt>}
            </ErrorBox>
          </InputTitleBox>
          <Input
            type="text"
            placeholder="아이디를 입력해주세요"
            onChange={(e) => setId(e.target.value)}
            value={id}
          />
          <CheckBox>
            <Check isChecked={isEng}>
              <CheckIcon />
              <Account_alert_reg>영문</Account_alert_reg>
            </Check>
            <Check isChecked={isNum}>
              <CheckIcon />
              <Account_alert_reg>숫자</Account_alert_reg>
            </Check>
            <Check isChecked={isSpe}>
              <CheckIcon />
              <Account_alert_reg>특수문자</Account_alert_reg>
            </Check>
            <Check isChecked={isLong}>
              <CheckIcon />
              <Account_alert_reg>6~12자</Account_alert_reg>
            </Check>
          </CheckBox>
          <DuplicateCheck>
            <TextBtn
              isChecked={isOnly}
              onClick={(e) => {
                !(isEng && isNum && isSpe && isLong)
                  ? e.preventDefault
                  : onCheckServiceId();
              }}
            >
              <CTA_button_med>중복확인</CTA_button_med>
            </TextBtn>
          </DuplicateCheck>
        </IdInputBox>
        <ProfileBox>
          <Main_title_med>프로필 사진</Main_title_med>
          <ImageBox>
            <ShowImageBox src={imgFile ? imgFile : default_profile} />
            <BtnBox>
              <TextBtn onClick={handleClick} isChecked={true}>
                <CTA_button_med>사진 선택하기</CTA_button_med>
              </TextBtn>
              <TextBtn onClick={() => setImgFile('')} isChecked={true}>
                <CTA_button_med>기본이미지</CTA_button_med>
              </TextBtn>
            </BtnBox>
            <HiddenBtn
              type="file"
              accept="image/*"
              ref={fileRef}
              onChange={changeFile}
            />
          </ImageBox>
        </ProfileBox>
        <Button
          isChecked={isNickname && isOnly}
          onClick={(e) =>
            !(isNickname && isOnly) ? e.preventDefault() : onClickBtn()
          }
        >
          <CTA_button_med>회원가입하기</CTA_button_med>
        </Button>
      </Content>
    </Container>
  );
}
