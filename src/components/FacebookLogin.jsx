import React from 'react';
import { styled } from 'styled-components';
import FacebookButton from '../assets/images/Facebook.png.webp';

const FacebookLogin = () => {
  const handleFacebookLogin = () => {};
  return (
    <div>
      <StButton type="button" onClick={handleFacebookLogin} />
    </div>
  );
};

export default FacebookLogin;

const StButton = styled.button`
  background-image: url(${FacebookButton});
  /* box-shadow: 1px 2.5px 4px #8d8c8c; */
  background-color: white;
  background-size: cover;
  border-radius: 100%;
  width: 35px;
  height: 35px;
  border: none;
  cursor: pointer;
`;
