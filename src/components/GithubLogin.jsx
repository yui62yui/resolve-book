import React from 'react';
import { styled } from 'styled-components';
import GithubButton from '../assets/images/Github.png';
import { auth, githubProvider } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';

const GithubLogin = () => {
  const navigate = useNavigate();
  const handleGithubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      console.log('Logged in with GitHub:', user);
      navigate('/');
    } catch (error) {
      console.error('GitHub login error:', error);
    }
  };
  return (
    <div>
      <StButton type="button" onClick={handleGithubLogin} />
    </div>
  );
};

export default GithubLogin;

const StButton = styled.button`
  background-image: url(${GithubButton});
  /* box-shadow: 1px 2.5px 4px #8d8c8c; */
  background-color: white;
  background-size: cover;
  border-radius: 100%;
  width: 35px;
  height: 35px;
  border: none;
  margin-right: 50px;
  cursor: pointer;
`;
