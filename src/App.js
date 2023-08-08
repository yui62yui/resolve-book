import React from 'react';
import Router from './shared/Router';
import axios from 'axios';

const App = () => {
  const fetchPosts = async () => {
    const { data } = await axios.get('http://localhost:4000/test');
  };
  return <Router />;
};

export default App;
