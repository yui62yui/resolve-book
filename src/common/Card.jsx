import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import CardBackgroundImg from '../assets/images/card-bg.png';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useAtom, useAtomValue } from 'jotai';
import axios from 'axios';
import { bookmarkedPostAtom, selectedPostAtom, userAtom } from '../atoms/userAtom';
import { nanoid } from 'nanoid';

const Card = () => {
  const user = useAtomValue(userAtom);
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom);
  const [bookmarkedPost, setBookmarkedPost] = useAtom(bookmarkedPostAtom);

  const bookmarkedPostHandler = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/bp`);
    setBookmarkedPost(data);
  };

  useEffect(() => {
    setSelectedPost(null);
  }, []);

  useEffect(() => {
    bookmarkedPostHandler();
  }, [selectedPost]);

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
      await axios.put(`${process.env.REACT_APP_SERVER_URL}/test/${post.id}`, updatedPost);
      setSelectedPost(updatedPost);

      alert('공감 완료! 당신의 따뜻한 마음을 전달했어요!🥰');
    } catch (error) {
      alert('에러로 인해 동작을 수행하지 못했어요 :( 다시 시도해 주세요!');
    }
  };

  const savePostHandler = async (post) => {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/bp`, {
      id: nanoid(),
      uid: user.uid,
      postId: post.id,
      userConcern: post.userConcern
    });
    alert('북마크 설정 완료');
    bookmarkedPostHandler();
  };

  const deletePostHandler = async (selectedPost) => {
    alert('정말 삭제하시겠습니까?');
    try {
      const wantedPost = await bookmarkedPost.find((bp) => user.uid === bp.uid && selectedPost.id === bp.postId);
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/bp/${wantedPost.id}`);
      alert('북마크 해제 완료');
      bookmarkedPostHandler();
    } catch (error) {
      alert('에러발생');
    }
  };

  return (
    <CardContainer>
      <ContentsBox>
        {!!selectedPost === true ? (
          <div>
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
            <span style={{ paddingBottom: '20px', fontSize: '14px' }}>{selectedPost?.registrationDate}</span>
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
          </div>
        ) : (
          <div>
            <span>글을 선택해 주세요.</span>
          </div>
        )}
      </ContentsBox>
      <BookMarkContainer>
        {!!selectedPost?.uid === true && selectedPost?.uid !== user.uid ? (
          <div>
            {bookmarkedPost?.find((bp) => bp?.uid === user.uid && bp?.postId === selectedPost?.id) ? (
              <BookmarkIcon
                onClick={() => {
                  deletePostHandler(selectedPost);
                }}
                sx={{ fontSize: '80px', color: '#46380e' }}
              />
            ) : (
              <BookmarkBorderOutlinedIcon
                onClick={() => {
                  savePostHandler(selectedPost);
                }}
                sx={{ fontSize: '80px', color: '#46380e' }}
              />
            )}
          </div>
        ) : null}
      </BookMarkContainer>
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 400px;
  height: 600px;
  margin: 0 0 0 auto;
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

  font-size: 14px;
  color: #4d4323;

  & > div > div {
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
    font-size: 18px;
    font-weight: 600;
    font-style: italic;
  }
`;

const BookMarkContainer = styled.div`
  position: absolute;
  top: -17px;
  left: 5px;
  cursor: pointer;
`;

const BottomContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 30px;
`;

const LikedButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  & > button {
    padding: 5px 15px;
    border-radius: 15px;
    font-size: 13px;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      background-color: #cdcdcd;
    }
  }
`;
