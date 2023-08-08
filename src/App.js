import React, { useEffect } from 'react';
import Router from './shared/Router';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useAtom } from 'jotai';
import { userAtom } from './store';

const App = () => {
  const [, setUser] = useAtom(userAtom); // userAtom 사용

  // 옵저버 : 새로고침 하더라도 로그인 상태 유지
  useEffect(() => {
    // onAuthStateChanged 함수를 사용하여 인증 상태 변화 감지
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // 로그인된 사용자가 있으면 user.email 업데이트, 그게 아니라면 로그아웃 처리
      user ? setUser(user.email) : setUser(null);
    });
    // 컴포넌트가 언마운트될 때 옵저버 해제
    return () => unsubscribe();
    // setUser 함수가 업데이트될 때만 이펙트가 실행됨
  }, [setUser]);

  return <Router />;
};

export default App;
