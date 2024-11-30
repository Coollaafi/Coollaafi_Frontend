import styled from 'styled-components';
import { Desc_150_med } from 'styles/typography';
import { PulseLoader } from 'react-spinners';

const Box = styled.div<{ type: string }>`
  width: 100%;
  height: ${(props) => (props.type == 'dark' ? '70px' : '45px')};
  background-color: ${(props) =>
    props.type == 'dark' ? '#121212' : '#ffffff'};
  border: 1px dashed #4d4d4d;
  color: ${(props) => (props.type == 'dark' ? '#ffffff' : '#0000000')};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => (props.type == 'dark' ? '20px' : '-20px')};
  margin-top: ${(props) => (props.type == 'dark' ? '0px' : '5px')};
  gap: ${(props) => (props.type == 'dark' ? '8px' : '3px')};
`;

const Text = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Star = styled.div`
  width: 8.5px;
  color: #ff0000;
`;

export default function AlertBox(type: { type: string }) {
  return (
    <Box type={type.type}>
      <Text>
        <Star>
          <Desc_150_med>* </Desc_150_med>
        </Star>
        <Desc_150_med>AI 분석 중 입니다</Desc_150_med>
      </Text>
      <PulseLoader
        color={type.type == 'dark' ? '#ffffff' : '#4d4d4d'}
        size={6}
      />
    </Box>
  );
}
