import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Configurações do seu projeto do Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyD8t4N-aXbeJKMNRkOGgLyBCJc8ueg4VEo',
  authDomain: 'ladiesonthego-13672.firebaseapp.com',
  projectId: 'ladiesonthego-13672',
  storageBucket: 'ladiesonthego-13672.appspot.com',
  messagingSenderId: '1007461661764',
  appId: '1:1007461661764:web:7a2f80e07f36d1dc4a5011',
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

const signInUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

const signInWithFacebook = () => {
  const provider = new FacebookAuthProvider();
  return signInWithPopup(auth, provider);
};

export { app, auth };
export {
  createUser, signInUser, signInWithGoogle, signInWithFacebook,
};
