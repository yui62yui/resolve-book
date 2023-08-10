import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../common/Card';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ListBackgroundImg from '../assets/images/list-bg.png';
import { useAtomValue } from 'jotai';
import { userAtom } from '../atoms/userAtom';

const MyPage = () => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState();

  const user = useAtomValue(userAtom);

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

  const deletePostHandler = (post) => {
    alert('정말 삭제하시겠습니까?');
  };

  return (
    <Container>
      <LeftContainer>
        {/* 이쪽에 선택된 데이터를 기반으로 정보를 보여 주면 됨 */}
        <Card selectedData={selectedData} />
      </LeftContainer>
      <RightContainer>
        {data.map((post) => {
          if (post.uid === user.uid) {
            return (
              <ListBox
                key={post.id}
                onClick={() => {
                  showPostHandler(post);
                }}
              >
                <p>{post.userConcern}</p>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#868686',
                    transition: '0.3s',
                    ':hover': { backgroundColor: '#666' }
                  }}
                  onClick={() => {
                    deletePostHandler(post);
                  }}
                >
                  <DeleteIcon sx={{ fontSize: '18px', marginRight: '5px' }} />
                  <span>삭제</span>
                </Button>
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

  & > button {
    margin: 0 auto;
    width: 100px;
    height: 40px;
  }
`;
