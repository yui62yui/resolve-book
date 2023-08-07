import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Post from "../pages/Post";
import Saved from "../pages/Saved";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Post />} />
        <Route path="/:id" element={<Saved />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
