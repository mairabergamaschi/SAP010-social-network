// Funções SDK
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuração Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyD8t4N-aXbeJKMNRkOGgLyBCJc8ueg4VEo',
  authDomain: 'ladiesonthego-13672.firebaseapp.com',
  projectId: 'ladiesonthego-13672',
  storageBucket: 'ladiesonthego-13672.appspot.com',
  messagingSenderId: '1007461661764',
  appId: '1:1007461661764:web:7a2f80e07f36d1dc4a5011',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
// exportação do Firebase
export { app, auth, db };
