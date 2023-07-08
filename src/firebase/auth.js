import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  FacebookAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { app, db } from './firebase.js';

export const getAppAuth = () => getAuth(app);

export const getUserId = () => {
  const auth = getAppAuth();
  return auth.currentUser.uid;
};

export const getUserName = () => {
  const auth = getAppAuth();
  const user = auth.currentUser;
  if (user) {
    return user.displayName;
  }
  return 'Usuária';
};

export const createUserDocument = (user) => {
  const { uid, displayName, email } = user;
  const userRef = doc(db, 'users', uid);
  const userData = {
    displayName,
    email,
  };
  return setDoc(userRef, userData);
};

export const createUserWithEmail = async (name, lastName, email, password) => {
  const auth = getAppAuth();
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await updateProfile(user, {
    displayName: `${name} ${lastName}`,
  });
  return createUserDocument(user);
};

export const loginWithEmail = (email, password) => {
  const auth = getAppAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

export const loginGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAppAuth();
  const userCredential = await signInWithPopup(auth, provider);
  const user = userCredential.user;
  return createUserDocument(user);
};

export const loginFacebook = async () => {
  const provider = new FacebookAuthProvider();
  const auth = getAppAuth();
  const userCredential = await signInWithPopup(auth, provider);
  const user = userCredential.user;
  return createUserDocument(user);
};

export const logout = () => {
  const auth = getAppAuth();
  return signOut(auth);
};

export function checkLoggedUser() {
  const auth = getAppAuth();
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}
