import React from 'react';
import { styled } from 'styled-components';
import CardBackgroundImg from '../assets/images/card-bg.png';

const Card = () => {
  return (
    <CardContainer>
      <ContentsBox>
        <div>
          <span>나의 고민은...</span>
          <br></br>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus sequi molestias minus minima? Animi saepe
            cumque nesciunt mollitia sed. Architecto, quis iure. Voluptatum hic non consequatur explicabo atque id sit.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed sequi ipsa eius doloremque. Placeat, maiores
            cupiditate nam porro ab omnis tempore voluptas illum voluptatem unde sequi dicta magnam ex velit?
          </p>
        </div>
        <div>
          <span>당신을 위한 조언</span>
          <br></br>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus sequi molestias minus minima? Animi saepe
            cumque nesciunt mollitia sed. Architecto, quis iure. Voluptatum hic non consequatur explicabo atque id sit.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed sequi ipsa eius doloremque. Placeat, maiores
            cupiditate nam porro ab omnis tempore voluptas illum voluptatem unde sequi dicta magnam ex velit?
          </p>
        </div>
        <span>2023.08.08</span>
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

  & > div {
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

  & span {
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
