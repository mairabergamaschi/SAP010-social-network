// Este es el punto de entrada de tu aplicacion

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { myFunction } from './lib/index.js';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD8t4N-aXbeJKMNRkOGgLyBCJc8ueg4VEo',
  authDomain: 'ladiesonthego-13672.firebaseapp.com',
  projectId: 'ladiesonthego-13672',
  storageBucket: 'ladiesonthego-13672.appspot.com',
  messagingSenderId: '1007461661764',
  appId: '1:1007461661764:web:7a2f80e07f36d1dc4a5011',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const email = 'ladiesonthego@gmail.com';
const password = 'ladie123';
createUserWithEmailAndPassword(auth, email, password);

myFunction();
