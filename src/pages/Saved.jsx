import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MyPage from '../components/MyPage';
import SavedPage from '../components/SavedPage';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Saved = () => {
  const [data, setData] = useState([]);
  const [myButton, setMyButton] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get('http://localhost:4000/test');
      setData(data);
    };
    fetchPosts();
    setMyButton(true);
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
    console.log(e.currentTarget);
  };

  return (
    <Container>
      <Stack direction="row" spacing={2} sx={{ display: 'block', margin: '30px auto 100px' }}>
        <PageButton
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
  margin: 0 auto;

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
