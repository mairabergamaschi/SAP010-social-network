import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  auth,
  signOut,
} from 'firebase/auth';

import {
  deleteDoc, doc, getDocs, setDoc, updateDoc,
} from 'firebase/firestore';

import {
  createPost, deletePost, updatePost,
} from '../src/firebase/firestore.js';

import {
  checkLoggedUser, loginFacebook, loginGoogle, loginWithEmail, logout,
} from '../src/firebase/auth.js';

const mockAuth = {
  currentUser: {
    name: 'auth.displayName',
    email: 'thais@example.com',
    password: '123456',
  },
};

jest.mock('firebase/auth');
jest.mock('firebase/firestore');

afterEach(() => {
  jest.clearAllMocks();
});

describe('loginGoogle', () => {
  it('deveria ser uma função', () => {
    expect(typeof loginGoogle).toBe('function');
  });

  it('Deveria logar o usuário com a conta do google', async () => {
    signInWithPopup.mockResolvedValueOnce();
    await loginGoogle();
    expect(GoogleAuthProvider).toHaveBeenCalledTimes(1);
  });
});

describe('loginFacebook', () => {
  it('deveria ser uma função', () => {
    expect(typeof loginFacebook).toBe('function');
  });

  it('Deveria logar o usuário com a conta do google', async () => {
    signInWithPopup.mockResolvedValueOnce();
    await loginFacebook();
    expect(FacebookAuthProvider).toHaveBeenCalledTimes(1);
  });
});

describe('checkLoggedUser', () => {
  it('deve verificar se o usuário logado está autenticado', () => {
    checkLoggedUser();
    expect(onAuthStateChanged).toHaveBeenCalledTimes(1);
  });
});

describe('loginWithEmail', () => {
  it('Deveria logar com email e senha corretos', async () => {
    const email = 'thais@gmail.com';
    const password = '123456';
    signInWithEmailAndPassword.mockResolvedValueOnce();
    await loginWithEmail(email, password);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
    expect(onAuthStateChanged).toHaveBeenCalled();
  });

  it('Deveria mostrar um erro e falhar ao logar o usuario', async () => {
    signInWithEmailAndPassword.mockRejectedValueOnce(new Error('Erro ao logar usuário'));
    try {
      await loginWithEmail();
    } catch (e) {
      expect(e.message).toEqual('Erro ao logar usuário');
    }
  });
});

describe('logout', () => {
  it('Deveria deslogar', async () => {
    await logout();
    expect(signOut).toHaveBeenCalled();
  });
});

describe('createPost', () => {
  it('Deveria criar um post do usuario e add na collection', async () => {
    const querySnapshot = getDocs.mockResolvedValueOnce([mockAuth.currentUser]);
    const addDoc = {
      name: [],
      author: [],
      description: [],
      createdAt: new Date(),
      likes: [],
      whoLiked: [],
    };
    await createPost(addDoc, auth);
    expect(querySnapshot).toHaveBeenCalled();
    expect(setDoc).toHaveBeenCalledWith(addDoc, auth);
    expect(setDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(addDoc, auth);
  });
}); // erro no currentUser

describe('deletePost', () => {
  it('Deveria deletar o post do usuario', () => {
    deletePost();
    expect(deleteDoc).toHaveBeenCalled();
    expect(doc).toHaveBeenCalled();
  });
});

describe('updatePost', () => {
  it('Deveria atualizar o post do usuario', () => {
    updatePost();
    expect(updateDoc).toHaveBeenCalled();
    expect(doc).toHaveBeenCalled();
  });
});
