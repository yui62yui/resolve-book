import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Post from '../pages/Post';
import Saved from '../pages/Saved';
import Layout from '../common/Layout';
import Community from '../pages/Community';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Post />} />
          <Route path="/:id" element={<Saved />} />
          <Route path="/community" element={<Community />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
