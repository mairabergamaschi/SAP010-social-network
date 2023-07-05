// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
