import styled from 'styled-components';
import {
  CTA_button_med,
  Desc_120_med,
  Main_title_med,
} from 'styles/typography';
import data from '../../data/level.json';
import NicknameBox from 'components/NicknameBox';

const Container = styled.div`
  width: 360px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  z-index: 1000;
`;

const ModalBox = styled.div`
  width: 328px;
  height: 489px;
  background-color: #fff;
  border: none;
  border-radius: 16px;
  padding: 24px 16px;
`;

const CloseBtn = styled.text`
  display: flex;
  justify-content: end;
  margin: 0 8px 15px 0;
  cursor: pointer;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-bottom: 32px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 39px;
`;

const DataBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

const LevelBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  width: 85px;
`;

type InfoModalProps = {
  closeModal: () => void;
};

export default function InfoModal({ closeModal }: InfoModalProps) {
  return (
    <Container>
      <ModalBox>
        <CloseBtn onClick={closeModal}>
          <CTA_button_med>닫기</CTA_button_med>
        </CloseBtn>
        <TitleBox>
          <Main_title_med>WOT 패피로 성장하기</Main_title_med>
          <Desc_120_med>
            업로드한 왓 룩북 이미지를 통해 패피로 성장해보세요!
          </Desc_120_med>
        </TitleBox>
        <Box>
          {data.level.map((item, idx) => (
            <DataBox key={idx}>
              <LevelBox>
                <CTA_button_med>{`Lv ${item.id}`}</CTA_button_med>
                <Desc_120_med>
                  {item.max == -1
                    ? `${item.min}장 -`
                    : `${item.min} - ${item.max}장`}
                </Desc_120_med>
              </LevelBox>
              <NicknameBox nickname={item.nickname} />
            </DataBox>
          ))}
        </Box>
      </ModalBox>
    </Container>
  );
}
