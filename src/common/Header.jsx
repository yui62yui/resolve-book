import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { menuTitleAtom, userAtom } from '../store';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { styled } from 'styled-components';

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // Atom을 읽고 상태 업데이트
  const [user, setUser] = useAtom(userAtom);
  const [rightMenuText, setRightMenuText] = useState('');
  const [menuTitle, setMenuTitle] = useAtom(menuTitleAtom);

  useEffect(() => {
    let text = '';

    if (pathname === '/community' || pathname === '/') {
      text = '내 보관함';
    } else {
      text = '새 고민 올리기';
    }
    setRightMenuText(text);
  }, [pathname]);

  const rightMenuClickHandler = () => {
    if (pathname === '/community' || pathname === '/') {
      navigate(`/saved/${user.uid}`);
    } else {
      navigate(`/`);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase에서 로그아웃 처리
      setUser(null); // Jotai의 userAtom을 null로 업데이트하여 로그아웃 상태로 변경
      alert('로그아웃 되었습니다.');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  const [setMobileMoreAnchorEl] = React.useState(null);

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (
    <Box sx={{ width: '100%', minWidth: '1400px' }}>
      <AppBar position="static" sx={{ backgroundColor: '#000' }}>
        <StyleToolbar>
          <Box>
            {pathname === '/community' ? (
              <Button
                onClick={() => {
                  navigate('/');
                }}
                style={{ color: 'white' }}
              >
                <p>새 고민 올리기</p>
              </Button>
            ) : (
              <Button
                onClick={() => {
                  navigate('/community');
                }}
                style={{ color: 'white' }}
              >
                <p>커뮤니티</p>
              </Button>
            )}
          </Box>
          <Box>
            <p>{menuTitle}</p>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {!user ? (
              <>
                <Button
                  onClick={() => {
                    navigate('/login');
                  }}
                  style={{ color: 'white' }}
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
                <Button style={{ color: 'white' }} onClick={rightMenuClickHandler}>
                  {rightMenuText}
                </Button>
                <Button onClick={handleLogout} style={{ color: 'white' }}>
                  로그아웃
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
              onClick={handleMobileMenuOpen}
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
    /* background-color: white; */
    width: 33.333%;
    height: 100%;
  }

  & > div:nth-child(2) > p {
    margin: 0;
    line-height: 64.43px;
    font-size: 24px;
    font-weight: 400;
    text-align: center;
  }

  & > div:last-child {
    text-align: right;
  }
`;
