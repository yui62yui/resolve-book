import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import backgroundImg from '../assets/images/bg.png';
import styled from 'styled-components';

const Layout = () => {
  return (
    <>
      <Header />
      <BackgroundContainer>
        <Outlet />
      </BackgroundContainer>
    </>
  );
};

export default Layout;

const BackgroundContainer = styled.div`
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  width: 100%;
  min-height: 100vh;
  height: auto;
  padding: 100px 50px;
  box-sizing: border-box;
`;
