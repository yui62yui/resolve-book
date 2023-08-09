import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../store';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Header = () => {
  const navigate = useNavigate();
  // Atom을 읽고 상태 업데이트
  const [user, setUser] = useAtom(userAtom);
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#000' }}>
        <Toolbar>
          <Button style={{ color: 'white' }}>커뮤니티</Button>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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
                <Button
                  style={{ color: 'white' }}
                  onClick={() => {
                    navigate(`/saved/${user.uid}`);
                  }}
                >
                  내 보관함
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
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
