import styled from 'styled-components';
import data from '../../data/category.json';
import { CTA_button_med } from 'styles/typography';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 164px;
  flex-wrap: wrap;
`;

const Box = styled.div<{ isClicked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 76px;
  height: 42px;
  border: ${(props) =>
    props.isClicked ? '1px solid #ffffff' : '1px solid #4d4d4d'};
  border-radius: 7px;
  background-color: #121212;
  color: ${(props) => (props.isClicked ? '#ffffff' : '#9f9f9f')};
  cursor: pointer;
  &:hover {
    border: 1px solid #ffffff;
    color: #ffffff;
  }
`;

export default function ButtonBox() {
  const categoryList = data.category;
  const [isClicked, setIsClicked] = useState<boolean[]>([]);

  const onClickBox = (id: number) => {
    isClicked[id] = !isClicked[id];
    setIsClicked([...isClicked]);
  };

  return (
    <Container>
      {categoryList.map((category) => (
        <Box
          key={category.id}
          onClick={() => onClickBox(category.id)}
          isClicked={isClicked[category.id]}
        >
          <CTA_button_med>{category.name}</CTA_button_med>
        </Box>
      ))}
    </Container>
  );
}
