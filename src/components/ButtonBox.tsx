import styled from 'styled-components';
import data from '../data/category.json';
import { CTA_button_med } from 'styles/typography';
import React, { useEffect } from 'react';

const Container = styled.div<{ type: string }>`
  display: flex;
  flex-direction: row;
  gap: ${(props) => (props.type == 'black' ? '10px' : '4px')};
  width: ${(props) => (props.type == 'black' ? '164px' : '140px')};
  flex-wrap: wrap;
`;

const Box = styled.div<{ isClicked: boolean; type: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.type == 'black' ? '76px' : '68px')};
  height: ${(props) => (props.type == 'black' ? '42px' : '47px')};
  border: ${(props) =>
    props.type == 'black'
      ? props.isClicked
        ? '1px solid #ffffff'
        : '1px solid #4d4d4d'
      : props.isClicked
        ? '1px solid #000000'
        : '1px solid #F4F4F4'};
  border-radius: 7px;
  background-color: ${(props) =>
    props.type == 'black' ? '#121212' : '#FBFBFB'};
  color: ${(props) =>
    props.type == 'black'
      ? props.isClicked
        ? '#ffffff'
        : '#9f9f9f'
      : props.isClicked
        ? '#000000'
        : '#9F9F9F'};
  cursor: pointer;
  &:hover {
    border: ${(props) =>
      props.type == 'black' ? '1px solid #ffffff' : '1px solid #000000'};
    color: ${(props) => (props.type == 'black' ? '#ffffff' : '#000000')};
  }
`;

type ButtonBoxType = 'black' | 'white';

type ButtonBoxProps = {
  type: ButtonBoxType;
  isClicked: boolean[];
  setIsClicked: React.Dispatch<React.SetStateAction<boolean[]>>;
  categoryList: string[];
  setCategoryList: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function ButtonBox({
  type,
  isClicked,
  setIsClicked,
  categoryList,
  setCategoryList,
}: ButtonBoxProps) {
  const categories = data.category;

  const onClickBox = (id: number) => {
    isClicked[id] = !isClicked[id];
    setIsClicked([...isClicked]);

    if (isClicked[id]) {
      setCategoryList([...categoryList, categories[id].key]);
    } else {
      const updatedCategoryList = categoryList.filter(
        (item) => item !== categories[id].key,
      );
      setCategoryList(updatedCategoryList);
    }
  };

  useEffect(() => {
    setCategoryList(categoryList);
  }, [isClicked]);

  return (
    <Container type={type}>
      {categories.map((category) => (
        <Box
          key={category.id}
          type={type}
          onClick={() => onClickBox(category.id)}
          isClicked={isClicked[category.id]}
        >
          <CTA_button_med>{category.name}</CTA_button_med>
        </Box>
      ))}
    </Container>
  );
}
