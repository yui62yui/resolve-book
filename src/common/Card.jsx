import React from 'react';
import { styled } from 'styled-components';
import CardBackgroundImg from '../assets/images/card-bg.png';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { userAtom } from '../store';
import { useAtomValue } from 'jotai';

const Card = (data) => {
  const user = useAtomValue(userAtom);

  const selectedPost = data?.selectedData;

  const likedButtonClickHandler = () => {
    alert('공감 완료! 당신의 따뜻한 마음을 전달했어요!🥰');
  };
  const changeSavedHandler = (saved) => {
    alert('북마크 설정이 변경되었습니다.');
    // 이쪽에 saved 를 서로 반대로 바꾸는 로직 넣기, alert도 if문 써서 반대로
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
                <span> - {selectedPost?.matchedAdvice.author} -</span>
              </p>
            </div>
            <span>2023.08.08</span>
          </div>
        ) : (
          <div>
            <span>글을 선택해 주세요.</span>
          </div>
        )}
      </ContentsBox>
      {selectedPost?.saved === true && selectedPost?.uid !== user.uid ? (
        <BookMarkContainer>
          {selectedPost?.saved === true ? (
            <BookmarkIcon
              sx={{ fontSize: '150px', color: '#218942' }}
              onClick={() => {
                changeSavedHandler(selectedPost);
              }}
            />
          ) : (
            <BookmarkBorderOutlinedIcon
              sx={{ fontSize: '150px', color: '#218942' }}
              onClick={() => {
                changeSavedHandler(selectedPost);
              }}
            />
          )}
        </BookMarkContainer>
      ) : (
        <></>
      )}
      <BottomContainer>
        <LikedButtonContainer>
          <button onClick={likedButtonClickHandler}>
            <span>🙌 </span>
            {!!selectedPost === true ? <span>{selectedPost.liked.cheer}</span> : <span>0</span>}
          </button>
          <button onClick={likedButtonClickHandler}>
            <span>😥 </span>
            {!!selectedPost === true ? <span>{selectedPost.liked.sad}</span> : <span>0</span>}
          </button>
          <button onClick={likedButtonClickHandler}>
            <span>💛 </span>
            {!!selectedPost === true ? <span>{selectedPost.liked.empathy}</span> : <span>0</span>}
          </button>
        </LikedButtonContainer>
      </BottomContainer>
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
