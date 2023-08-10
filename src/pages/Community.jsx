import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import CardBackgroundImg from '../assets/images/card-bg.png';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ListBackgroundImg from '../assets/images/list-bg.png';
import { styled } from 'styled-components';

import { useAtom, useAtomValue } from 'jotai';
import { selectedPostAtom, userAtom } from '../atoms/userAtom';

const Community = () => {
  const user = useAtomValue(userAtom);

  const [open, setOpen] = React.useState(false);

  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom);
  // jotai로 selectedPost관리
  const [posts, setPosts] = useState();

  const fetchPosts = async () => {
    const { data } = await axios.get('http://localhost:4000/test');
    setPosts(data);
  };

  const onDeleteButtonClickHandler = async (postId) => {
    try {
      await axios.delete(`http://localhost:4000/test/${postId}`);
      fetchPosts(); // 다시 패치
      setOpen(false); // 모달 닫기
      setSelectedPost(null);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const likedCounter = async (post, emotion) => {
    try {
      const updatedLiked = {
        ...post.liked,
        [emotion]: post.liked[emotion] + 1
      };

      const updatedPost = {
        ...post,
        liked: updatedLiked
      };
      await axios.put(`http://localhost:4000/test/${post.id}`, updatedPost);
      setSelectedPost(updatedPost);

      alert('공감 완료! 당신의 따뜻한 마음을 전달했어요!🥰');
    } catch (error) {
      alert('에러로 인해 동작을 수행하지 못했어요 :( 다시 시도해 주세요!');
    }
  };

  const changeSavedHandler = async (post) => {
    try {
      const updatedPost = {
        ...post,
        saved: !post.saved
      };

      await axios.put(`http://localhost:4000/test/${post.id}`, updatedPost);

      setSelectedPost(updatedPost);

      post.saved
        ? alert('북마크 설정이 해제되었습니다.')
        : alert('북마크가 설정되었습니다. 보관하신 글은 내 보관함 - 보관한 글 모아보기에서 확인 가능합니다.');
    } catch (error) {
      alert('에러로 인해 동작을 수행하지 못했어요 :( 다시 시도해 주세요!');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedPost]);

  useEffect(() => {
    setSelectedPost(null);
  }, []);

  return (
    <div>
      <MainTitle>커뮤니티 : 고민의 장</MainTitle>
      <div>
        {posts?.map((post) => {
          return (
            <div
              key={post.id}
              style={{
                border: '1px solid white',
                margin: '10px',
                padding: '10px',
                color: 'white'
              }}
            >
              <div
                onClick={() => {
                  const selectPost = posts?.find((item) => post.id === item.id);
                  setOpen(true);
                  if (selectPost) {
                    setSelectedPost(selectPost);
                  }
                }}
              >
                <div>{post.userConcern}</div>
                <div>{post.matchedAdvice.message}</div>
                <div>
                  {post.matchedAdvice.author}&nbsp;-{post.matchedAdvice.authorProfile}
                </div>
              </div>
              <div>
                {post?.uid === user?.uid ? (
                  <DeleteButton onClick={() => onDeleteButtonClickHandler(post.id)}>삭제하기</DeleteButton>
                ) : (
                  ''
                )}
              </div>
            </div>
          );
        })}
      </div>
      <React.Fragment>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <>
            <CardContainer>
              <ContentsBox>
                {!!selectedPost === true ? (
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div>
                      <span>나의 고민은...</span>
                      <br></br>
                      <p>{selectedPost?.userConcern}</p>
                    </div>
                    <div>
                      <span>당신을 위한 조언</span>
                      <br></br>
                      <p>
                        {selectedPost?.matchedAdvice.message}
                        <br></br>
                        <span>
                          {' '}
                          - {selectedPost?.matchedAdvice.author} / {selectedPost?.matchedAdvice.authorProfile} -
                        </span>
                      </p>
                    </div>
                    <span>2023.08.08</span>{' '}
                    <BottomContainer>
                      <LikedButtonContainer>
                        <button
                          onClick={() => {
                            likedCounter(selectedPost, 'cheer');
                          }}
                        >
                          <span>🙌 </span>
                          {!!selectedPost === true ? <span>{selectedPost?.liked.cheer}</span> : <span>0</span>}
                        </button>
                        <button
                          onClick={() => {
                            likedCounter(selectedPost, 'sad');
                          }}
                        >
                          <span>😥 </span>
                          {!!selectedPost === true ? <span>{selectedPost.liked.sad}</span> : <span>0</span>}
                        </button>
                        <button
                          onClick={() => {
                            likedCounter(selectedPost, 'empathy');
                          }}
                        >
                          <span>💛 </span>
                          {!!selectedPost === true ? <span>{selectedPost.liked.empathy}</span> : <span>0</span>}
                        </button>
                      </LikedButtonContainer>
                    </BottomContainer>
                    {/* {selectedPost.uid === user ? <button>삭제하기</button> : ''} */}
                    {selectedPost?.uid === user?.uid ? (
                      <DeleteButton onClick={() => onDeleteButtonClickHandler(selectedPost.id)}>삭제하기</DeleteButton>
                    ) : (
                      ''
                    )}
                  </div>
                ) : (
                  <div>
                    <span>글을 선택해 주세요.</span>
                  </div>
                )}
              </ContentsBox>
              <BookMarkContainer>
                {!!selectedPost?.uid === true && selectedPost?.uid !== user.uid ? (
                  <div
                    onClick={(event) => {
                      event.stopPropagation();
                      changeSavedHandler(selectedPost);
                    }}
                  >
                    {selectedPost?.saved ? (
                      <BookmarkIcon sx={{ fontSize: '150px', color: '#218942' }} />
                    ) : (
                      <BookmarkBorderOutlinedIcon sx={{ fontSize: '150px', color: '#218942' }} />
                    )}
                  </div>
                ) : null}
              </BookMarkContainer>
              <StyleModalClose
                variant="outlined"
                sx={{
                  borderRadius: '50%',
                  bgcolor: 'background.surface',
                  top: '20px',
                  right: '20px'
                }}
              />
            </CardContainer>
          </>
        </Modal>
      </React.Fragment>
    </div>
  );
};

export default Community;

const CardContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 650px;
  height: 950px;
  margin: 0 auto;
  border-radius: 10px;
  background: center / cover no-repeat url(${CardBackgroundImg});
`;
const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 50%;
  height: 100%;
  margin: 0 auto;

  font-size: 18px;
  text-align: center;
  color: #333;

  & > div > div {
    margin: 0 auto;
    padding-bottom: 10px;
  }

  & > div > div:last-of-type {
    padding-bottom: 0px;
  }

  & p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    word-break: keep-all;

    letter-spacing: -0.5px;
    line-height: 1.4;
  }

  & div > span {
    font-size: 20px;
    font-weight: 600;
    font-style: italic;
  }
`;

const DeleteButton = styled.button`
  margin: 20px auto 0;
  width: 120px;
  height: 40px;
  font-size: 16px;
  font-weight: 400;
  border-radius: 20px;
  border: 3px solid #9e9e9e;
  color: #333;
  background-color: #fff;
  box-shadow: 2px 2px 2px #686868;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #9e9e9e;
  }
`;

const BookMarkContainer = styled.div`
  position: absolute;
  top: 30px;
  left: 10px;
  cursor: pointer;
`;

const BottomContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 650px;
  height: 60px;
  background-color: #666;
`;

const LikedButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  & > button {
    padding: 5px 15px;
    border-radius: 15px;
    font-size: 16px;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      background-color: #cdcdcd;
    }
  }
`;

const StyleModalClose = styled(ModalClose)`
  width: 50px;
  height: 50px;
  position: absolute;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
`;

const MainTitle = styled.h3`
  color: white;
  font-size: 32px;
  text-align: center;
`;

// const ListBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   box-sizing: border-box;
//   height: 200px;
//   max-height: 200px;
//   padding: 5px 30px 10px;
//   border-radius: 10px;
//   background: center / cover no-repeat url(${ListBackgroundImg});
//   cursor: pointer;

//   & > p {
//     overflow: hidden;
//     text-overflow: ellipsis;
//     display: -webkit-box;
//     -webkit-line-clamp: 6;
//     -webkit-box-orient: vertical;

//     font-size: 18px;
//     font-weight: 400;
//     letter-spacing: -0.5px;
//     line-height: 1.4;

//     color: #333;
//   }
// `;
