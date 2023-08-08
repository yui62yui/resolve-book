import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MyPage from '../components/MyPage';
import SavedPage from '../components/SavedPage';

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

  return (
    <Container>
      <PageButton
        onClick={() => {
          setMyButton(true);
        }}
      >
        나의 글 모아보기
      </PageButton>
      <PageButton
        onClick={() => {
          setMyButton(false);
        }}
      >
        보관한 글 모아보기
      </PageButton>
      {myButton === true ? <MyPage /> : <SavedPage />}
    </Container>
  );
};

export default Saved;

const Container = styled.div`
  color: #999;
  font-size: 100px;
`;

const PageButton = styled.button`
  width: 180px;
  height: 50px;
  color: black;
`;
