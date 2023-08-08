import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '../common/Card';

const SavedPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get('http://localhost:4000/test');
      setData(data);
    };
    fetchPosts();
  }, []);

  return (
    <Container>
      <LeftContainer>
        <Card />
      </LeftContainer>
      <RightContainer>
        {data.map((post) => {
          if (post.saved === true) {
            return (
              <ListBox>
                <p>{post.userConcern}</p>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#868686',
                    transition: '0.3s',
                    ':hover': { backgroundColor: '#666' }
                  }}
                >
                  <IconButton aria-label="delete" size="small">
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                  <span style={{ paddingRight: '10px' }}>삭제</span>
                </Button>
              </ListBox>
            );
          }
        })}
      </RightContainer>
    </Container>
  );
};

export default SavedPage;

const Container = styled.div`
  width: 80%;
  display: flex;
  gap: 150px;
  margin: 0 auto;
`;

const LeftContainer = styled.div`
  width: 100%;
`;

const RightContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
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
  padding: 5px 20px 20px;
  border-radius: 10px;
  background-color: white;
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
