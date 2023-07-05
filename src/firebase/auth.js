import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, updateProfile } from 'firebase/auth';
import { app } from './firebase.js';

// Inicialize o módulo de autenticação do Firebase
const auth = getAuth(app);

// Função para criar um novo usuário com e-mail e senha
export const createUserWithEmail = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName });
    console.log('Usuário criado:', user);
  } catch (error) {
    console.log('Erro ao criar usuário:', error);
  }
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Usuário logado:', user);
      // Redirecionar para a página desejada
      window.location.hash = '#feed';
    })
    .catch((error) => {
      console.log('Erro de login com o Google:', error);
      alert('Erro ao fazer login com o Google. Verifique suas credenciais e tente novamente.');
    });
};

export const signInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  return signInWithPopup(auth, provider)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Usuário logado:', user);
      // Redirecionar para a página desejada
      window.location.hash = '#feed';
    })
    .catch((error) => {
      console.log('Erro de login com o Facebook:', error);
      alert('Erro ao fazer login com o Facebook. Verifique suas credenciais e tente novamente.');
    });
};

// Função para realizar o login com email e senha
export const loginWithEmail = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    // O login foi realizado com sucesso
  } catch (error) {
    throw error;
  }
};

// Função para realizar o logout
export const logout = async () => {
  try {
    await firebase.auth().signOut();
    // O logout foi realizado com sucesso
  } catch (error) {
    throw error;
  }
};

// Função para verificar se um usuário está logado
export const checkLoggedUser = () => {
  const auth = getAuth();

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // O usuário está logado
        resolve(user);
      } else {
        // O usuário não está logado
        resolve(null);
      }
    });
  });
};

// Obtém o usuário atualmente autenticado
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error('Nenhum usuário autenticado.'));
      }
    });
  });
};

// Função para atualizar a senha do usuário atualmente logado
export const updatePassword = async (newPassword) => {
  try {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      await currentUser.updatePassword(newPassword);
      // A senha foi atualizada com sucesso
    }
  } catch (error) {
    throw error;
  }
};
