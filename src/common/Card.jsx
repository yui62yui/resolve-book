import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import CardBackgroundImg from '../assets/images/card-bg.png';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { selectedPostAtom, userAtom } from '../store';
import { useAtom, useAtomValue } from 'jotai';
import axios from 'axios';

const Card = () => {
  const user = useAtomValue(userAtom);
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom);

  useEffect(() => {
    setSelectedPost(null);
  }, []);

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

      setSelectedPost(null);
    } catch (error) {
      alert('에러로 인해 동작을 수행하지 못했어요 :( 다시 시도해 주세요!');
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
            <span>2023.08.08</span>
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
          <div
            onClick={() => {
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
    </CardContainer>
  );
};

export default Card;

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
  color: #333;

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
    font-size: 20px;
    font-weight: 600;
    font-style: italic;
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
