import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../common/Card';
import ListBackgroundImg from '../assets/images/list-bg.png';

const MyPage = () => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get('http://localhost:4000/test');
      setData(data);
    };
    fetchPosts();
  }, []);

  const showPostHandler = async (post) => {
    await setSelectedData(post);
  };

  return (
    <Container>
      <LeftContainer>
        {/* 이쪽에 선택된 데이터를 기반으로 정보를 보여 주면 됨 */}
        <Card />
      </LeftContainer>
      <RightContainer>
        {data.map((post) => {
          if (post.uid === '유이') {
            return (
              <ListBox
                key={post.id}
                onClick={() => {
                  showPostHandler(post);
                }}
              >
                <p>{post.userConcern}</p>
              </ListBox>
            );
          }
        })}
      </RightContainer>
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  width: 80%;
  min-width: 1100px;
  display: flex;
  gap: 80px;
  flex-shrink: 0;
  margin: 0 auto;
`;

const LeftContainer = styled.div`
  width: 50%;
`;

const RightContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 320px));
  gap: 30px;
  width: 50%;
  height: 100%;
`;

const ListBox = styled.div`
  box-sizing: border-box;
  height: 200px;
  max-height: 200px;
  padding: 5px 30px 10px;
  border-radius: 10px;
  background: center / cover no-repeat url(${ListBackgroundImg});
  cursor: pointer;

  & > p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;

    font-size: 18px;
    font-weight: 400;
    letter-spacing: -0.5px;
    line-height: 1.4;
    word-break: keep-all;

    color: #333;
  }
`;
