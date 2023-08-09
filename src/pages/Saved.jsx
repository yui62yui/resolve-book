import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MyPage from '../components/MyPage';
import SavedPage from '../components/SavedPage';
import Stack from '@mui/material/Stack';
import { useAtom } from 'jotai';
import { menuTitleAtom } from '../store';

const Saved = () => {
  const [myButton, setMyButton] = useState(true);
  const [menuTitle, setMenuTitle] = useAtom(menuTitleAtom);

  useEffect(() => {
    setMyButton(true);
    const btn = document.querySelector('.myButton');
    btn.classList.add(`active`);
    setMenuTitle('글 보관함');
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
      <Stack direction="row" spacing={2} sx={{ display: 'block', margin: '30px auto 100px' }}>
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
