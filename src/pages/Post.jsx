import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import HTMLFlipBook from 'react-pageflip';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { useAtom, useAtomValue } from 'jotai';
import { menuTitleAtom, postAtom, userAtom } from '../atoms/userAtom';
import { Button, Input, Modal } from '@mui/material';
import axios from 'axios';
import backgroundImg from '../assets/images/bg.png';
import page1Img from '../assets/images/main_cover.png';
import page2Img from '../assets/images/cover02.png';
import page3Img from '../assets/images/cover01.png';
import { kadvice } from 'kadvice';
import { FormGroup } from '@material-ui/core';

const Post = (props) => {
  // State
  const [randomAdvice, setRandomAdvice] = useState(null);
  const [flipEnabled, setFlipEnabled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userConcern, setUserConcern] = useAtom(postAtom);
  const [submittedConcern, setSubmittedConcern] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [menuTitle, setMenuTitle] = useAtom(menuTitleAtom);

  useEffect(() => {
    setMenuTitle('고민해결책');
  }, []);

  // useRef를 사용하여 HTMLFlipBook
  const flipBookRef = useRef(null);
  const user = useAtomValue(userAtom);

  // 고민 등록 및 데이터 전송 처리
  const handleShowRandomAdvice = async (event) => {
    event.preventDefault();
    if (!userConcern) {
      // 사용자가 고민을 작성하지 않았을 때 모달 열기
      setShowModal(true);
      return;
    }
    try {
      setSubmitted(true);
      // 받아온 조언을 상태에 업데이트
      const advice = kadvice.getOne();
      setRandomAdvice(advice);
      setFlipEnabled(true);
      // 등록된 고민 내용을 새로운 상태 변수에 저장 및 초기화
      setSubmittedConcern(userConcern);
      setUserConcern('');
      if (flipBookRef.current) {
        flipBookRef.current.pageFlip().flip(3);
      }
      // 서버로 데이터 전송
      await axios.post('http://localhost:4000/test', {
        uid: user.uid,
        id: '',
        userConcern: userConcern,
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
        }
      });
    } catch (error) {
      console.error('Error saving concern:', error);
    }
  };

  // 고민 내용 변경 처리
  const handleTextareaChange = (event) => {
    setUserConcern(event.target.value);
  };

  // 또 다른 고민 버튼 클릭 처리
  const handleLinkClick = () => {
    setTimeout(() => {
      setRandomAdvice(null);
      setFlipEnabled(false);
      setSubmitted(false);
      setUserConcern('');
      setShowModal(false);
    }, 480);
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setShowModal(false);
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
                <FormGroup
                  style={{
                    position: 'absolute',
                    zIndex: '1',
                    transform: 'translate(50%, 105%)',
                    width: '200px',
                    textAlign: 'center'
                  }}
                >
                  <h2 style={{ color: '#fff' }}>고민을 말해주세요</h2>
                  <CustomInput
                    value={userConcern}
                    onChange={handleTextareaChange}
                    placeholder="고민을 작성하세요"
                    style={{ width: '100%', color: '#fff' }}
                  />
                  <Button onClick={handleShowRandomAdvice} style={{ marginTop: '10px' }}>
                    등록하기
                  </Button>
                </FormGroup>
              )}

              <StyledFlipBook ref={flipBookRef} width={400} height={500} disableFlipByClick useMouseEvents={false}>
                <Page>
                  <PageBackground>
                    <img src={backgroundImg} alt="Background" />
                  </PageBackground>
                  <PageContent>
                    <PageText></PageText>
                    <img src={page1Img} alt="Page 1" width={400} height={500} />
                  </PageContent>
                </Page>
                <Page>
                  <PageBackground>
                    <img src={backgroundImg} alt="Background" />
                  </PageBackground>
                  <PageContent>
                    <PageText style={{ transform: 'translate(-80%, -50%)' }}>고민해결책</PageText>
                    <img src={page2Img} alt="Page 2" width={400} height={500} />
                  </PageContent>
                </Page>
                <Page>
                  <PageBackground>
                    <img src={backgroundImg} alt="Background" />
                  </PageBackground>
                  <PageContent>
                    <PageText style={{ width: '50%', transform: 'translate(-45%, -50%)', textAlign: 'center' }}>
                      {submittedConcern}
                    </PageText>
                    <img src={page3Img} alt="Page 3" width={400} height={500} />
                  </PageContent>
                </Page>
                <Page>
                  <PageBackground>
                    <img src={backgroundImg} alt="Background" />
                  </PageBackground>
                  <PageContent>
                    <PageText>
                      <h3
                        style={{
                          margin: '0',
                          fontSize: '20px',
                          textAlign: 'center',
                          fontWeight: '600',
                          fontStyle: 'italic'
                        }}
                      >
                        조언
                      </h3>
                      {randomAdvice && (
                        <>
                          <p style={{ textAlign: 'center' }}>{randomAdvice.message}</p>
                          <p style={{ textAlign: 'center' }}>{randomAdvice.author}</p>
                          <p style={{ textAlign: 'center' }}>{randomAdvice.authorProfile}</p>
                        </>
                      )}
                    </PageText>
                    <img src={page2Img} alt="Page 4" width={400} height={500} />
                  </PageContent>
                </Page>
              </StyledFlipBook>

              {/* 다른 고민 버튼 */}
              {submitted && (
                <div
                  style={{
                    position: 'absolute',
                    zIndex: '1',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease-in-out'
                  }}
                >
                  <SubmitButton
                    onClick={handleLinkClick}
                    style={{
                      margin: '10px 0 0',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease-in-out'
                    }}
                  >
                    또 다른 고민이 있나요?
                  </SubmitButton>
                </div>
              )}
            </StyledMaxWidthContainer>
          </Container>
        </StyledContainer>
      </BackgroundContainer>
      {/* 모달 */}
      <Modal open={showModal} onClose={handleCloseModal}>
        <ModalContent>
          <h2>고민을 작성해주세요</h2>
          <Button onClick={handleCloseModal} style={{ marginTop: '10px' }}>
            확인
          </Button>
        </ModalContent>
      </Modal>
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

const StyledMaxWidthContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
  overflow: hidden;
`;

const StyledFlipBook = styled(HTMLFlipBook)`
  margin: 0 auto;
`;

const Page = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const PageBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  // background: rgba(255, 255, 255, 0.8);
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
  // transform: translate(-50%);
  transform: translate(-62%, -50%);
  // font-size: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  word-break: keep-all;
  letter-spacing: -0.5px;
  line-height: 1.4;
`;

const SubmitButton = styled(Button)`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
`;

const CustomInput = styled(Input)`
  position: relative;
  &:before {
    border-bottom: none;
  }
`;
