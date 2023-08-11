import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import HTMLFlipBook from 'react-pageflip';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { useAtom, useAtomValue } from 'jotai';
import { postAtom, userAtom } from '../atoms/userAtom';
import { Button, Input } from '@mui/material';

import axios from 'axios';
import page1Img from '../assets/images/main_cover.png';
import page2Img from '../assets/images/cover02.png';
import page3Img from '../assets/images/cover01.png';
import { kadvice } from 'kadvice';
import { FormGroup } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const Post = (props) => {
  // useRef를 사용하여 HTMLFlipBook
  const navigate = useNavigate();
  
  const [, setFlipEnabled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userConcern, setUserConcern] = useAtom(postAtom);

  const [, setMenuTitle] = useAtom(menuTitleAtom);
  const [randomAdvice, setRandomAdvice] = useState(null);
  const [remainingCharacters, setRemainingCharacters] = useState(50); // 글자 수 50자 제한
  const [submittedConcern, setSubmittedConcern] = useState(userConcern);
  
  const user = useAtomValue(userAtom);
  // useRef를 사용하여 HTMLFlipBook
  const flipBookRef = useRef(null);

  useEffect(() => {
    setMenuTitle('고민해결책');
  }, []);

  const handleKeyPress = (e) => {
    if (userConcern.trim().length > 50 && e.key === 'Enter') {
      // 글자 수가 50자를 초과하고 Enter 키가 눌렸을 때 경고창 띄우기
      alert('50자 이내로 작성해주세요.');
    }
  };

  const formattedTimestamp = new Date().toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  // "연도, 월, 일 : 2023. 08. 10" 형식으로 변환
  const parts = formattedTimestamp.split('.').map((part) => part.trim());
  const formattedResult = parts.slice(0, 3).join('.');

  // 고민 등록 및 데이터 전송 처리
  const handleShowRandomAdvice = async (event) => {
    event.preventDefault();

    const trimmedUserConcern = userConcern.trim(); // trim된 값 할당

    // 0자일 때도 경고창을 띄우도록 수정
    if (trimmedUserConcern.length === 0) {
      alert('고민을 입력해주세요.');
      return;
    }

    // 글자 수가 50자를 초과할 때 경고창 띄우기
    if (trimmedUserConcern.length > 51) {
      alert('50자 이내로 작성해주세요.');
      return;
    }

    try {
      setSubmitted(true);
      // 받아온 조언을 상태에 업데이트
      const advice = kadvice.getOne();
      setRandomAdvice(advice);
      setFlipEnabled(true);
      // 등록된 고민 내용을 새로운 상태 변수에 저장 및 초기화
      setSubmittedConcern(trimmedUserConcern);
      setUserConcern('');

      // 현재 날짜 가져오기
      const currentDate = new Date();
      // 날짜를 "2023.08.10" 형식으로 변환
      const formattedDate = currentDate
        .toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
        .replace(/-/g, '.'); // 날짜 형식을 변경

      if (flipBookRef.current) {
        flipBookRef.current.pageFlip().flip(3);
      }

      // 서버로 데이터 전송
      await axios.post('http://localhost:4000/test', {
        uid: user.uid,
        id: '',
        userConcern: trimmedUserConcern,
        matchedAdvice: {
          author: advice.author,
          authorProfile: advice.authorProfile,
          message: advice.message
        },
        saved: false,
        liked: {
          cheer: 0,
          sad: 0,
          empathy: 0
        },
        registrationDate: formattedDate // 년.월.일 형식 : 2023.08.10
      });
    } catch (error) {
      console.error('Error saving concern:', error);
    }
  };

  // 고민 내용 변경 처리
  const handleTextareaChange = (event) => {
    const inputValue = event.target.value;
    setUserConcern(inputValue);

    // 글자 수가 50자를 초과할 경우 경고창 띄우기
    if (inputValue.length > 50) {
      alert('50자 이내로 작성해주세요.');
      return;
    }
    setUserConcern(inputValue);

    // 남은 글자 수 계산
    const charactersLeft = 50 - inputValue.length;
    setRemainingCharacters(charactersLeft);
  };

  // 또 다른 고민 버튼 클릭 처리
  const handleLinkClick = () => {
    setTimeout(() => {
      setRandomAdvice(null);
      setFlipEnabled(false);
      setSubmitted(false);
      setUserConcern('');
    }, 480);
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  return (
    <>
      <BackgroundContainer>
        <StyledContainer>
          <CssBaseline />
          <Container>
            <StyledMaxWidthContainer>
              {/* 고민 등록 폼 */}
              {!submitted && (
                <StyledFormGroup>
                  <StyledH2>고민을 말해주세요</StyledH2>
                  <StyledCustomInput
                    value={userConcern}
                    onChange={handleTextareaChange}
                    placeholder="고민을 작성하세요"
                    maxLength={50}
                    onKeyPress={handleKeyPress}
                  />
                  <RemainingCharacters>{remainingCharacters}자 남음</RemainingCharacters>
                  <Button onClick={handleShowRandomAdvice} style={{ marginTop: '10px' }}>
                    등록하기
                  </Button>
                </StyledFormGroup>
              )}

              <StyledFlipBook ref={flipBookRef} width={400} height={500} disableFlipByClick useMouseEvents={false}>
                <Page>
                  <PageContent>
                    <PageText></PageText>
                    <StyledImage src={page1Img} alt="Page 1" />
                  </PageContent>
                </Page>
                <Page>
                  <PageContent>
                    <PageText2>고민해결책</PageText2>
                    <StyledImage src={page2Img} alt="Page 2" />
                  </PageContent>
                </Page>
                <Page>
                  <PageContent>
                    <PageText3>
                      <StyledSubmittedConcern>{submittedConcern}</StyledSubmittedConcern>
                      <StyledFormattedResult>{formattedResult}</StyledFormattedResult>
                    </PageText3>
                    <StyledImage src={page3Img} alt="Page 3" />
                  </PageContent>
                </Page>
                <Page>
                  <PageContent>
                    <PageText4>
                      <StyledH3>조언</StyledH3>
                      {randomAdvice && (
                        <>
                          <StyledParagraph>{randomAdvice.message}</StyledParagraph>
                          <StyledParagraph>{randomAdvice.author}</StyledParagraph>
                          <StyledParagraph>{randomAdvice.authorProfile}</StyledParagraph>
                        </>
                      )}
                    </PageText4>
                    <StyledImage src={page2Img} alt="Page 4" />
                  </PageContent>
                </Page>
              </StyledFlipBook>

              {/* 다른 고민 버튼 */}
              {submitted && (
                <StyledLinkContainer>
                  <StyledLinkButton onClick={handleLinkClick}>또 다른 고민이 있나요?</StyledLinkButton>
                </StyledLinkContainer>
              )}
            </StyledMaxWidthContainer>
          </Container>
        </StyledContainer>
      </BackgroundContainer>
    </>
  );
};

export default Post;

const BackgroundContainer = styled.div``;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const StyledMaxWidthContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
  overflow: hidden;
`;

const StyledFormGroup = styled(FormGroup)`
  position: absolute;
  z-index: 1;
  transform: translate(50%, 105%);
  width: 200px;
  text-align: center;
`;

const StyledH2 = styled.h2`
  color: #fff;
`;

const StyledCustomInput = styled(Input)`
  position: relative;
  &:before {
    border-bottom: none;
  }
  width: 100%;
  color: #fff;

  ::placeholder {
    color: #fff;
  }

  input {
    color: #fff;
  }
`;

const RemainingCharacters = styled.div`
  color: #fff;
  font-size: 12px;
  text-align: right;
`;

const StyledFlipBook = styled(HTMLFlipBook)`
  margin: 0 auto;
`;

const Page = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const PageContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const PageText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-62%, -50%);
  word-break: keep-all;
  letter-spacing: -0.5px;
  line-height: 1.4;
`;

const PageText2 = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-80%, -50%);
`;

const PageText3 = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-40%, -50%);
  text-align: center;
  width: 50%;

  h3 {
    font-size: 24px;
    font-weight: normal;
    white-space: pre-wrap;
    width: 100%;
    letter-spacing: -0.5px;
    line-height: 1.4;
    overflow-wrap: break-word;
  }
`;

const PageText4 = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-62%, -50%);
  text-align: center;

  h3 {
    font-size: 24px;
    font-weight: normal;
    white-space: pre-wrap;
    width: 100%;
    letter-spacing: -0.5px;
    line-height: 1.4;
    overflow-wrap: break-word;
  }
`;

const StyledH3 = styled.h3`
  margin: 0;
  font-size: 20px;
  text-align: center;
  font-weight: 600;
  font-style: italic;
`;

const StyledParagraph = styled.p`
  text-align: center;
`;

const StyledImage = styled.img`
  width: 400px;
  height: 500px;
`;

const StyledSubmittedConcern = styled.h3`
  font-size: 24px;
  font-weight: normal;
  white-space: pre-wrap;
  width: 100%;
  letter-spacing: -0.5px;
  line-height: 1.4;
  overflow-wrap: break-word;
`;

const StyledFormattedResult = styled.p``;

const StyledLinkContainer = styled.div`
  position: absolute;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  transition: transform 0.3s ease-in-out;
`;

const StyledLinkButton = styled(Button)`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  text-decoration: underline;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;
