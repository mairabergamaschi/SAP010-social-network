// Funções SDK
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Configuração Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyD8t4N-aXbeJKMNRkOGgLyBCJc8ueg4VEo',
  authDomain: 'ladiesonthego-13672.firebaseapp.com',
  projectId: 'ladiesonthego-13672',
  storageBucket: 'ladiesonthego-13672.appspot.com',
  messagingSenderId: '1007461661764',
  appId: '1:1007461661764:web:7a2f80e07f36d1dc4a5011',
};
firebase.initializeApp(firebaseConfig);
// Inicialização do Firebase
const app = firebase.app();
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
// exportação do Firebase
export {
  app, auth, db, storage,
};
