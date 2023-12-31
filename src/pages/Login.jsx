import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import GoogleLogin from '../components/GoogleLogin';
import GithubLogin from '../components/GithubLogin';
import FacebookLogin from '../components/FacebookLogin';
import { styled } from 'styled-components';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

// Login 컴포넌트  ----------------------------------------------------------------------
const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  // Input 필드 상태 관리
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 로그인
  const onSubmitSignInHandler = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        alert('이메일을 입력해주세요.');
        return;
      }
      if (!password) {
        alert('비밀번호를 입력해주세요.');
        return;
      }
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert('로그인에 성공하셨습니다.');

      navigate('/');
    } catch (error) {
      alert(getErrorMessage(error.code));
    }
  };

  // 에러 코드에 따른 유효성 검사 한 번에 관리
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
      case 'auth/missing-email':
        return '잘못된 이메일입니다.';
      case 'auth/missing-password':
        return '잘못된 비밀번호입니다.';
      case 'auth/weak-password':
        return '비밀번호는 6글자 이상이어야 합니다.';
      case 'auth/network-request-failed':
        return '네트워크 연결에 실패 하였습니다.';
      case 'auth/invalid-email':
        return '잘못된 이메일 형식입니다.';
      case 'auth/internal-error':
        return '잘못된 요청입니다.';
      default:
        return '로그인에 실패하셨습니다.';
    }
  };

  return (
    <>
      <MainTitle>
        책을 펼쳐보고 싶으신가요?<br></br>우선 로그인이 필요합니다
      </MainTitle>
      <Container
        style={{ backgroundColor: 'white', width: '450px', height: '600px', paddingTop: '1px', borderRadius: '20px' }}
        component="main"
        maxWidth="xs"
      >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmitSignInHandler}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="이메일"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              // autoComplete="current-password"
            />
            {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              로그인
            </Button>
            <Grid container justifyContent="center">
              <Link href="/signup" variant="body2">
                회원가입
                {/* {"Don't have an account? Sign Up"} */}
              </Link>
            </Grid>
            {/* ------------ Google, Github, Facebook 로그인 연결 -------------*/}
            <SnsLoginBox>
              <GoogleLogin />
              <GithubLogin />
              <FacebookLogin />
            </SnsLoginBox>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Login;

const SnsLoginBox = styled.div`
  display: flex;
  padding: 65px;
  justify-content: center;
`;

const MainTitle = styled.h3`
  color: white;
  font-size: 32px;
  text-align: center;
`;
