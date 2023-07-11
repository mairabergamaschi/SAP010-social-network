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

// autenticação
export const getAppAuth = () => getAuth(app);

// pega a Id do Usuário
export const getUserId = () => {
  const auth = getAppAuth();
  return auth.currentUser.uid;
};

// pega o nome do Usuário
export const getUserName = () => {
  const auth = getAppAuth();
  const user = auth.currentUser;
  if (user) {
    return user.displayName;
  }
  return 'Usuária';
};

// cria o documento na db com os dados do Usuário
export const createUserDocument = (user) => {
  const { uid, displayName, email } = user;
  const userRef = doc(db, 'users', uid);
  const userData = {
    displayName,
    email,
  };
  return setDoc(userRef, userData);
};

// Cria o acesso com email
export const createUserWithEmail = async (name, lastName, email, password) => {
  const auth = getAppAuth();
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await updateProfile(user, {
    displayName: `${name} ${lastName}`,
  });
  return createUserDocument(user);
};

// faz o login com email
export const loginWithEmail = (email, password) => {
  const auth = getAppAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

// login com o google
export const loginGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAppAuth();
  const userCredential = await signInWithPopup(auth, provider);
  const user = userCredential.user;
  return createUserDocument(user);
};

// login com o facebook - verificar
export const loginFacebook = async () => {
  const provider = new FacebookAuthProvider();
  const auth = getAppAuth();
  const userCredential = await signInWithPopup(auth, provider);
  const user = userCredential.user;
  return createUserDocument(user);
};

// função de logout
export const logout = () => {
  const auth = getAppAuth();
  return signOut(auth);
};

// função de checar se o Usuário tá logado
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
