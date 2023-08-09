import axios from 'axios';
import React, { useEffect, useId, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import CardBackgroundImg from '../assets/images/card-bg.png';
import { styled } from 'styled-components';
import { userAtom } from '../store';
import { useAtomValue } from 'jotai';

const Community = () => {
  const user = useAtomValue(userAtom);
  console.log(user);
  const [open, setOpen] = React.useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState();
  const fetchPosts = async () => {
    const { data } = await axios.get('http://localhost:4000/test');
    console.log({ data });
    setPosts(data);
  };
  const onDeleteButtonClickHandler = async (postId) => {
    try {
      await axios.delete(`http://localhost:4000/test/${postId}`);
      fetchPosts(); // 다시 패치
      setOpen(false); // 모달 닫기
      setSelectedPost(null); // Clear selected post after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>community 고민의 장</h1>
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
                    // console.log(selectedPost.uid);
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
                {post.uid === '유이' ? (
                  <button onClick={() => onDeleteButtonClickHandler(post.id)}>삭제하기</button>
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
              <div style={{ position: 'relative' }}>
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
                          <span> - {selectedPost?.matchedAdvice.author} -</span>
                        </p>
                      </div>
                      <span>2023.08.08</span>
                      {/* {selectedPost.uid === user ? <button>삭제하기</button> : ''} */}
                      {selectedPost.uid === '유이' ? (
                        <button onClick={() => onDeleteButtonClickHandler(selectedPost.id)}>삭제하기</button>
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
                <LikedContainer>공감컨테이너</LikedContainer>
              </div>
            </CardContainer>
            <ModalClose
              // variant="outlined"
              sx={{
                boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.2)',
                borderRadius: '50%',
                bgcolor: 'background.surface'
              }}
            />
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
  margin: 260px auto;

  font-size: 18px;
  color: #333;

  & > div > div {
    padding-bottom: 10px;
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

const LikedContainer = styled.div`
  /* position: absolute; */
  left: 0;
  bottom: 0;
  width: 650px;
  height: 40px;
  background-color: #666;
`;
