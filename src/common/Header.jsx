import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';

import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { styled } from 'styled-components';
import { userAtom } from '../atoms/userAtom';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);

  const handleLogout = async () => {
    try {
      // 로그아웃 시 사용자에게 확인 메시지 표시
      const userConfirmed = window.confirm('로그아웃 하시겠습니까?');

      if (userConfirmed) {
        await signOut(auth); // Firebase에서 로그아웃 처리
        setUser(null); // Jotai의 userAtom을 null로 업데이트하여 로그아웃 상태로 변경
        alert('로그아웃 되었습니다.');
      }
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (
    <Box sx={{ width: '100%', minWidth: '1400px' }}>
      <AppBar position="static" sx={{ backgroundColor: '#000' }}>
        <StyleToolbar>
          <Box>
            <Button
              onClick={() => {
                navigate('/community');
              }}
              style={{ color: 'white' }}
            >
              <p>커뮤니티</p>
            </Button>
          </Box>
          <Box>
            <Button
              style={{ color: 'white' }}
              onClick={() => {
                navigate('/');
              }}
            >
              <p>고민해결책</p>
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {!user ? (
              <>
                <Button
                  style={{ color: 'white' }}
                  onClick={() => {
                    navigate('/login');
                  }}
                >
                  로그인
                </Button>
                <Button
                  onClick={() => {
                    navigate('/signup');
                  }}
                  style={{ color: 'white' }}
                >
                  회원가입
                </Button>
              </>
            ) : (
              <>
                <Button
                  style={{ color: 'white' }}
                  onClick={() => {
                    navigate(`/saved/${user.uid}`);
                  }}
                >
                  <p>내 보관함</p>
                </Button>
                <Button onClick={handleLogout} style={{ color: 'white' }}>
                  <p>로그아웃</p>
                </Button>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </StyleToolbar>
      </AppBar>
    </Box>
  );
};

export default Header;

const StyleToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64.44px;

  & > div {
    width: 33.333%;
    height: 100%;
  }

  & > div:nth-child(2) {
    text-align: center;
  }

  & > div:nth-child(2) > button > p {
    margin: 0;
    line-height: 64.43px;
    font-size: 28px;
    font-weight: 600;
    text-align: center;
  }

  & > div:last-child {
    text-align: right;
  }
`;
