import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import backgroundImg from '../assets/images/bg.jpg';
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
  min-width: 1400px;
  min-height: 100vh;
  height: auto;
  padding: 50px 50px 100px;
  box-sizing: border-box;
`;
