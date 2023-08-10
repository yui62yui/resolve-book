import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Post from '../pages/Post';
import Saved from '../pages/Saved';
import Layout from '../common/Layout';
import Community from '../pages/Community';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Post />} />
          <Route path="/saved/:id" element={<Saved />} />
          <Route path="/community" element={<Community />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
