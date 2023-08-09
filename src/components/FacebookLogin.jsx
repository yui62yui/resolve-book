import React from 'react';
import { styled } from 'styled-components';
import FacebookButton from '../assets/images/Facebook.png.webp';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, facebookProvier } from '../firebaseConfig';

const FacebookLogin = () => {
  const navigate = useNavigate();
  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvier);
      const user = result.user;
      console.log('Logged in with Facebook:', user);
      navigate('/');
    } catch (error) {
      console.error('Facebook login error:', error);
    }
  };
  return (
    <div>
      <StButton type="button" onClick={handleFacebookLogin} />
    </div>
  );
};

export default FacebookLogin;

const StButton = styled.button`
  background-image: url(${FacebookButton});
  background-color: white;
  background-size: cover;
  border-radius: 100%;
  width: 35px;
  height: 35px;
  border: none;
  cursor: pointer;
`;
