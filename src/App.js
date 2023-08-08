import React, { useEffect } from 'react';
import Router from './shared/Router';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const App = () => {
  // 옵저버 : 새로고침 하더라도 로그인 상태 유지
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     // dispatch(loginSuccess(user.email));
  //   });
  // }, []);

  return <Router />;
};

export default App;
