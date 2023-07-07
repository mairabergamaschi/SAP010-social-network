import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  FacebookAuthProvider,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { app } from './firebase.js';

// Inicialize o módulo de autenticação do Firebase
const auth = getAuth(app);

// criar usuário com email e senha
export const signUp = async (username, email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    // Atualizar o perfil do usuário com o displayName
    await updateProfile(user, { displayName: username });

    // Adicionar o usuário ao banco de dados
    await addDoc(collection(db, 'usuarios'), {
      userId: user.uid,
      username: user.displayName,
      email: user.email
      // Outras informações do usuário
    });

    console.log('Usuário cadastrado com sucesso:', user);
    return user;
  } catch (error) {
    console.log('Erro ao cadastrar usuário:', error);
    throw error;
  }
};

// usuário entra com email e senha
export const signIn = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    console.log('Usuário autenticado com sucesso:', user);
    return user;
  } catch (error) {
    console.log('Erro ao autenticar usuário:', error);
    throw error;
  }
};

// entrar e cadastrar com google - verificar se está funcionando quando arrumar a página de login
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithRedirect(auth, provider);
    // Redirecionar para a página desejada
    window.location.hash = '#feed';
  } catch (error) {
    console.log('Erro de login com o Google:', error);
    console.log('Erro ao fazer login com o Google. Verifique suas credenciais e tente novamente.');
  }
};
   
// entrar e cadastrar com o facebook - verificar se está funcionando quando arrumar a página de login
export const signInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  try {
    await signInWithRedirect(auth, provider);
    // Redirecionar para a página desejada
    window.location.hash = '#feed';
  } catch (error) {
    console.log('Erro de login com o Google:', error);
    console.log('Erro ao fazer login com o Google. Verifique suas credenciais e tente novamente.');
  }
};

// Callback para tratar o retorno após o redirecionamento do Google
export const handleGoogleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    const user = result.user;
    if (user) {
      // Adicionar o usuário ao banco de dados
      const userData = {
        userId: user.uid,
        username: user.displayName,
        email: user.email,
        profilePhoto: user.photoURL,
      };
      await addUser(userData);
      console.log('Usuário adicionado ao banco de dados:', userData);
    }
  } catch (error) {
    console.log('Erro ao tratar o resultado do redirecionamento do Google:', error);
  }
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
