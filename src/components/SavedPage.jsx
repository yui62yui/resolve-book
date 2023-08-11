import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../common/Card';
import ListBackgroundImg from '../assets/images/list-bg.png';
import { useAtom } from 'jotai';
import { selectedPostAtom } from '../atoms/userAtom';

const SavedPage = () => {
  const [data, setData] = useState([]);
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const { data } = await axios.get('http://localhost:4000/test');
  //     setData(data);
  //   };
  //   fetchPosts();
  // }, [selectedPost]);

  const fetchPosts = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/test`);
    setData(data);
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedPost]);

  useEffect(() => {
    setSelectedPost(null);
  }, []);

  const showPostHandler = (post) => {
    setSelectedPost(post);
  };

  return (
    <Container>
      <LeftContainer>
        <Card />
      </LeftContainer>
      <RightContainer>
        {data.map((post) => {
          return post.saved ? (
            <ListBox
              key={post.id}
              onClick={() => {
                showPostHandler(post);
              }}
            >
              <p>{post.userConcern}</p>
            </ListBox>
          ) : (
            ''
          );
        })}
      </RightContainer>
    </Container>
  );
};

export default SavedPage;

const Container = styled.div`
  width: 80%;
  display: flex;
  margin: 0 auto;
`;

const LeftContainer = styled.div`
  width: 100%;
  padding-right: 30px;
`;

const RightContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 300px));
  column-gap: 20px;
  justify-content: center;
  row-gap: 30px;
  width: 100%;
  height: 600px;
  overflow: auto;
  padding-right: 30px;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #eee;
  }
  &::-webkit-scrollbar-track {
    background-color: #575757;
  }
`;

const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  width: 300px;
  height: 200px;
  max-height: 200px;
  padding: 40px 30px 20px;
  border-radius: 10px;
  background: center / cover no-repeat url(${ListBackgroundImg});
  cursor: pointer;

  & > p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;

    font-size: 16px;
    font-weight: 400;
    letter-spacing: -0.5px;
    line-height: 1.4;

    color: #333;
  }
`;
