import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MyPage from '../components/MyPage';
import SavedPage from '../components/SavedPage';
import Stack from '@mui/material/Stack';

const Saved = () => {
  const [myButton, setMyButton] = useState(true);

  useEffect(() => {
    setMyButton(true);
    const btn = document.querySelector('.myButton');
    btn.classList.add(`active`);
  }, []);

  const buttonActiveHandler = (e) => {
    const btns = document.querySelectorAll('button');
    btns.forEach((btn) => {
      if (e.currentTarget === btn) {
        btn.classList.add(`active`);
      } else {
        btn.classList.remove(`active`);
      }
    });
  };

  return (
    <Container>
      <MainTitle>내 보관함</MainTitle>
      <Stack direction="row" spacing={5} sx={{ display: 'block', margin: '0px auto 50px' }}>
        <PageButton
          className="myButton"
          onClick={(event) => {
            setMyButton(true);
            buttonActiveHandler(event);
          }}
        >
          나의 글 모아보기
        </PageButton>
        <PageButton
          onClick={(event) => {
            setMyButton(false);
            buttonActiveHandler(event);
          }}
        >
          보관한 글 모아보기
        </PageButton>
      </Stack>
      {myButton === true ? <MyPage /> : <SavedPage />}
    </Container>
  );
};

export default Saved;

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  text-align: center;

  color: #999;
`;

const PageButton = styled.button`
  width: 200px;
  height: 50px;

  font-size: 18px;
  font-weight: 600;
  letter-spacing: -1px;

  border-radius: 25px;
  background-color: #fff;
  cursor: pointer;

  transition: 0.3s;

  &:hover {
    background-color: #edeacb;
  }

  &.active {
    background-color: #d4cc7c;
  }
`;

const MainTitle = styled.h3`
  color: white;
  font-size: 26px;
  margin: 0px 0px 32px;
  text-align: center;
`;
