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
    const { data } = await axios.get('http://localhost:4000/test');
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
  min-width: 1000px;
  display: flex;
  gap: 80px;
  margin: 0 auto;
`;

const LeftContainer = styled.div`
  width: 100%;
`;

const RightContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 320px));
  gap: 30px;
  width: 100%;
  height: 100%;
`;

const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

    color: #333;
  }
`;
