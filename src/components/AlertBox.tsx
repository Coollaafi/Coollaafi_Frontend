import styled from 'styled-components';
import { Desc_150_med } from 'styles/typography';

const Box = styled.div<{ type: string }>`
  width: 100%;
  height: ${(props) => (props.type == 'dark' ? '70px' : '45px')};
  background-color: ${(props) =>
    props.type == 'dark' ? '#121212' : '#ffffff'};
  border: 1px dashed #4d4d4d;
  color: ${(props) => (props.type == 'dark' ? '#ffffff' : '#0000000')};
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => (props.type == 'dark' ? '20px' : '-20px')};
  margin-top: ${(props) => (props.type == 'dark' ? '0px' : '5px')};
`;

const Star = styled.div`
  width: 8.5px;
  color: #ff0000;
  height: 35px;
`;

export default function AlertBox(type: { type: string }) {
  return (
    <Box type={type.type}>
      <Star>
        <Desc_150_med>* </Desc_150_med>
      </Star>
      <Desc_150_med>
        AI 분석 시간이 소요됩니다.
        <br /> 잠시만 기다려주세요.
      </Desc_150_med>
    </Box>
  );
}
