// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBZ_4G7RZ3ESzkLPUHqI5ykMe_FgXSKDRM',
  authDomain: 'resolve-book-59350.firebaseapp.com',
  projectId: 'resolve-book-59350',
  storageBucket: 'resolve-book-59350.appspot.com',
  messagingSenderId: '486509422091',
  appId: '1:486509422091:web:ea77e33d4b49a28de2090e'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
