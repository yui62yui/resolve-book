import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import backgroundImg from '../assets/images/bg.png';
import { kadvice } from 'kadvice';
import { Input } from '@mui/material';
import { useAtom } from 'jotai';
import { menuTitleAtom } from '../store';

const Post = () => {
  const [randomAdvice, setRandomAdvice] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [userConcern, setUserConcern] = useState('');

  const [menuTitle, setMenuTitle] = useAtom(menuTitleAtom);

  useEffect(() => {
    setMenuTitle('고민해결책');
  }, []);

  const handleShowRandomAdvice = () => {
    const advice = kadvice.getOne();
    console.log(advice);
    setRandomAdvice(advice);
    setIsFormSubmitted(true);
  };

  const handleTextareaChange = (event) => {
    setUserConcern(event.target.value);
  };

  return (
    <>
      <BackgroundContainer>
        <StyledContainer>
          <CssBaseline />
          <StyledMaxWidthContainer>
            <Box sx={{ bgcolor: '#cfe8fc', height: '650px', display: 'flex' }}>
              {!isFormSubmitted && (
                <LeftColumn>
                  <h2>고민을 말해주세요</h2>
                  <Input value={userConcern} onChange={handleTextareaChange} placeholder="고민을 작성하세요" />
                  <SubmitButton onClick={handleShowRandomAdvice}>등록하기</SubmitButton>
                </LeftColumn>
              )}
              {isFormSubmitted && (
                <RightColumn>
                  <h3>고민</h3>
                  <p>{userConcern}</p>
                </RightColumn>
              )}
              {isFormSubmitted && (
                <RightColumn>
                  <h3>조언</h3>
                  <p>{randomAdvice.message}</p>
                </RightColumn>
              )}
            </Box>
          </StyledMaxWidthContainer>
        </StyledContainer>
      </BackgroundContainer>
    </>
  );

  // 미로그인 시에는 바로 로그인 페이지로 이동
  // 로그인 시에만 포스트 페이지 정상적으로 보이도록 함
};

export default Post;

const BackgroundContainer = styled.div`
  /* background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: calc(100vh - 64px); */

  // 이 부분 다 지우면 됩니다!
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const StyledMaxWidthContainer = styled(Container)`
  width: 100%;
  max-width: 550px;

  @media (min-width: 1200px) {
    max-width: 550px !important;
  }
`;

const LeftColumn = styled.div`
  flex: 1;
  padding: 20px;

  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  textarea {
    width: 100%;
    height: 150px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const RightColumn = styled.div`
  flex: 1;
  padding: 20px;
  border-left: 1px solid #ccc;

  h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    font-style: italic;
  }
`;

const SubmitButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
