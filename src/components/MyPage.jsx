import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../common/Card';
import ListBackgroundImg from '../assets/images/list-bg.png';

import { useAtom, useAtomValue } from 'jotai';
import { selectedPostAtom, userAtom } from '../atoms/userAtom';

const MyPage = () => {
  const [data, setData] = useState([]);
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom);

  const user = useAtomValue(userAtom);

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

  const deletePostHandler = async (id) => {
    alert('정말 삭제하시겠습니까?');
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/test/${id}`);
      fetchPosts();
      setSelectedPost(null);
    } catch (error) {
      alert('에러발생');
    }
  };

  return (
    <Container>
      <LeftContainer>
        <Card />
      </LeftContainer>
      <RightContainer>
        {data?.map((post) => {
          if (post?.uid === user?.uid) {
            return (
              <ListBoxContainer key={post.id}>
                <ListBox
                  key={post.id}
                  onClick={() => {
                    showPostHandler(post);
                  }}
                >
                  <p>{post?.userConcern}</p>
                </ListBox>
                <DeleteButton
                  onClick={() => {
                    deletePostHandler(post.id);
                  }}
                >
                  <span>삭제</span>
                </DeleteButton>
              </ListBoxContainer>
            );
          } else {
            return null;
          }
        })}
      </RightContainer>
    </Container>
  );
};

export default MyPage;

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

const ListBoxContainer = styled.div`
  position: relative;

  & > button {
    position: absolute;
    bottom: 20px;
    left: 0px;
    right: 0px;
    margin: 0 auto;
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
const DeleteButton = styled.button`
  margin: 0px auto 20px;
  width: 80px;
  height: 30px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  border: 2px solid #9e9e9e;
  color: #666;
  background-color: #fff;
  box-shadow: 1px 1px 1px #686868;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #9e9e9e;
  }
`;
