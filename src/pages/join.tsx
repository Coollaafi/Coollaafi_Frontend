import styled from 'styled-components';
import Header from 'components/Header';
import useImage from 'hooks/useImage';
import {
  Account_alert_reg,
  CTA_button_med,
  Main_title_med,
  User_id_title_med,
} from 'styles/typography';
import { useEffect, useRef, useState } from 'react';
import default_profile from '../assets/images/default-profile.svg';
import { ReactComponent as CheckIcon } from '../assets/icons/circle-check.svg';

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

const TextBtn = styled.div`
  text-decoration: underline;
  text-underline-offset: 2px;
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
  const [isEng, setIsEng] = useState<boolean>(false);
  const [isNum, setIsNum] = useState<boolean>(false);
  const [isSpe, setIsSpe] = useState<boolean>(false);
  const [isLong, setIsLong] = useState<boolean>(false);
  const [isOnly, setIsOnly] = useState<boolean>(false);

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
            <TextBtn>
              <CTA_button_med>중복확인</CTA_button_med>
            </TextBtn>
          </DuplicateCheck>
        </IdInputBox>
        <ProfileBox>
          <Main_title_med>프로필 사진</Main_title_med>
          <ImageBox>
            <ShowImageBox src={imgFile ? imgFile : default_profile} />
            <BtnBox>
              <TextBtn onClick={handleClick}>
                <CTA_button_med>사진 선택하기</CTA_button_med>
              </TextBtn>
              <TextBtn onClick={() => setImgFile('')}>
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
        <Button isChecked={isNickname && isOnly}>
          <CTA_button_med>회원가입하기</CTA_button_med>
        </Button>
      </Content>
    </Container>
  );
}
