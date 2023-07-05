import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  FacebookAuthProvider,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { app } from './firebase.js';

// Inicialize o módulo de autenticação do Firebase
const auth = getAuth(app);

// criar usuário com email e senha
export const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
// criar promessa e callback caso o cadastro dê erro, e o updatProfile

// usuário entra com email e senha
export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
// callback e promessa, ir para o feed

// entrar e cadastrar com google - verificar se está funcionando quando arrumar a pagina de login
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithRedirect(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(token);
      const user = result.user;
      if (credential) {
        if (user) {
          console.log('novo usuário criado');
        } else {
          console.log('usuário existente');
        }
      }
      console.log('Usuário logado:', user);
      // Redirecionar para a página desejada
      window.location.hash = '#feed';
    })
    .catch((error) => {
      console.log('Erro de login com o Google:', error);
      console.log('Erro ao fazer login com o Google. Verifique suas credenciais e tente novamente.');
    });
};

// entrar e cadastrar com o facebook - verificar se está funcionando quando arrumar a page login
export const signInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  return signInWithRedirect(auth, provider)
    .then((result) => {
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(token);
      const user = result.user;
      if (credential) {
        if (user) {
          console.log('novo usuário criado');
        } else {
          console.log('usuário existente');
        }
      }
      console.log('Usuário logado:', user);
      // Redirecionar para a página desejada
      window.location.hash = '#feed';
    })
    .catch((error) => {
      console.log('Erro de login com o Facebook:', error);
      console.log('Erro ao fazer login com o Facebook. Verifique suas credenciais e tente novamente.');
    });
};

// Função para realizar o logout
export const logout = () => signOut(auth);


// falta esses abaixo

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
export const getCurrentUser = () => new Promise((resolve, reject) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      resolve(user);
    } else {
      reject(new Error('Nenhum usuário autenticado.'));
    }
  });
});

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
