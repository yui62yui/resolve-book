import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Post from '../pages/Post';
import Saved from '../pages/Saved';
import Layout from '../common/Layout';
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
          <Route path="/:id" element={<Saved />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
