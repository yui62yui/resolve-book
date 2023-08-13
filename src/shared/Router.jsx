import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Post from '../pages/Post';
import Saved from '../pages/Saved';
import Layout from '../common/Layout';
import Community from '../pages/Community';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import { useAtomValue } from 'jotai';
import { userAtom } from '../atoms/userAtom';

const Router = () => {
  const user = useAtomValue(userAtom); // user 상태 가져오기

  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Post />} />
            <Route path="/saved/:id" element={<Saved />} />
            <Route path="/community" element={<Community />} />
          </Route>
        ) : (
          <Route element={<Layout />}>
            <Route path="/*" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
