import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../common/Card';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ListBackgroundImg from '../assets/images/list-bg.png';
import { selectedPostAtom, userAtom } from '../store';
import { useAtomValue, useSetAtom } from 'jotai';

const MyPage = () => {
  const [data, setData] = useState([]);
  const setSelectedPost = useSetAtom(selectedPostAtom);

  const user = useAtomValue(userAtom);

  const fetchPosts = async () => {
    const { data } = await axios.get('http://localhost:4000/test');
    setData(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const showPostHandler = (post) => {
    setSelectedPost(post);
  };

  const deletePostHandler = async (id) => {
    alert('정말 삭제하시겠습니까?');
    try {
      await axios.delete(`http://localhost:4000/test/${id}`);
      fetchPosts();
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
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#868686',
                    transition: '0.3s',
                    ':hover': { backgroundColor: '#666' }
                  }}
                  onClick={() => {
                    deletePostHandler(post.id);
                  }}
                >
                  <DeleteIcon sx={{ fontSize: '18px', marginRight: '5px' }} />
                  <span>삭제</span>
                </Button>
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

const ListBoxContainer = styled.div`
  position: relative;

  & > button {
    position: absolute;
    bottom: 20px;
    left: 0px;
    right: 0px;
    margin: 0 auto;
    width: 100px;
    height: 40px;
  }
`;

const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  height: 200px;
  max-height: 200px;
  padding: 5px 30px 20px;
  border-radius: 10px;
  background: center / cover no-repeat url(${ListBackgroundImg});
  cursor: pointer;

  & > p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;

    font-size: 18px;
    font-weight: 400;
    letter-spacing: -0.5px;
    line-height: 1.4;

    color: #333;
  }
`;
