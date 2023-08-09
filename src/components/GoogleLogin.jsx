import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { auth, provider } from '../firebaseConfig';
import { styled } from 'styled-components';
import googleButton from '../assets/images/Google.svg.webp';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = () => {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Logged in with Google:', user);
      // IdP data available using getAdditionalUserInfo(result)
      navigate('/');
    } catch (error) {
      console.error('Google login error:', error);
    }
  };
  return (
    <div>
      <StButton type="button" onClick={handleGoogleLogin} />
    </div>
  );
};

export default GoogleLogin;

const StButton = styled.button`
  background-image: url(${googleButton});
  background-color: white;
  background-size: cover;
  border-radius: 100%;
  width: 35px;
  height: 35px;
  border: none;
  margin-right: 50px;
  cursor: pointer;
`;
