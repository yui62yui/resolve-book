import React from 'react';
import { styled } from 'styled-components';
import CardBackgroundImg from '../assets/images/card-bg.png';

const Card = (data) => {
  const selectedPost = data?.selectedData;
  console.log({ data });
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
      <LikedContainer>공감컨테이너</LikedContainer>
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

const LikedContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 650px;
  height: 40px;
  background-color: #666;
`;
