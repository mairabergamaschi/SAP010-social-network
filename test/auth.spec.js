import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  auth,
  signOut,
  getAuth,
} from 'firebase/auth';

import {
  checkLoggedUser, getUserId, getUserName, loginFacebook, loginGoogle, loginWithEmail, logout,
} from '../src/firebase/auth.js';

jest.mock('firebase/auth');
jest.mock('../src/firebase/firebase.js');

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
    await loginWithEmail(email, password);
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
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

describe('getUserId', () => {
  it('should return the current user ID', () => {
    const userId = 'user123';
    const authMock = {
      currentUser: {
        uid: userId,
      },
    };
    getAuth.mockReturnValue(authMock);
    const result = getUserId();
    expect(result).toBe(userId);
  });
});

describe('getUserName', () => {
  it('deve retornar o nome de usuário se o usuário for autenticado', () => {
    const displayName = 'Testando';
    const authMock = {
      currentUser: {
        displayName,
      },
    };
    getAuth.mockReturnValue(authMock);

    const result = getUserName();

    expect(result).toBe(displayName);
  });
});

describe('logout', () => {
  it('Deveria deslogar', async () => {
    await logout();
    expect(signOut).toHaveBeenCalled();
  });
});
