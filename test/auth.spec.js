/* eslint-disable no-shadow */
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  auth,
  signOut,
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

import {
  checkLoggedUser,
  createUserWithEmail,
  getUserId,
  getUserName,
  loginFacebook,
  loginGoogle,
  loginWithEmail,
  logout,
} from '../src/firebase/auth.js';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');
jest.mock('../src/firebase/firebase.js');

const mockUserCredential = {
  user: {
    displayName: 'Thais Alves',
    uid: 'uid7865',
  },
};

const mockUpdateUserProfile = {
  uid: 'uid7865',
  email: 'exemplo@example.com',
  displayName: 'Thais Alves',
};

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

describe('createUserWithEmail', () => {
  it('deve criar um novo usuário', async () => {
    const authMock = getAuth();
    createUserWithEmailAndPassword.mockResolvedValue(mockUserCredential);
    updateProfile.mockResolvedValue(mockUpdateUserProfile);
    const name = 'Thais';
    const lastName = 'Alves';
    const email = 'exemplo@exemplo.com';
    const password = '123456';

    await createUserWithEmail(name, lastName, email, password);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      authMock,
      email,
      password,
    );
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
  it('deve retornar o user ID', () => {
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
  it('deve retornar o nome se for autenticado', () => {
    const displayName = 'Thais Alves';
    const authMock = {
      currentUser: {
        displayName,
      },
    };
    getAuth.mockReturnValue(authMock);

    const result = getUserName();

    expect(result).toBe(displayName);
  });

  it('deve retornar "Usuária" se não estiver autenticado', () => {
    const authMock = 'Usuária';
    getAuth.mockReturnValue(authMock);

    const result = getUserName();

    expect(result).toBe('Usuária');
  });
});

describe('logout', () => {
  it('deve deslogar o usuario', () => {
    const authMock = getAuth();
    signOut.mockResolvedValue({
      user: {},
    });
    logout();
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(signOut).toHaveBeenCalledWith(authMock);
  });
});

describe('checkLoggedUser', () => {
  it('dever ser uma função', () => {
    expect(typeof checkLoggedUser).toBe('function');
  });

  it('deve retornar true se estiver logado', async () => {
    const authMock = getAuth();
    const onAuthStateChangedMock = jest.fn((auth, callback) => {
      callback({ uid: 'user1234' });
    });
    onAuthStateChanged.mockImplementation(onAuthStateChangedMock);

    const result = await checkLoggedUser();

    expect(result).toBe(true);
    expect(onAuthStateChangedMock).toHaveBeenCalledWith(
      authMock,
      expect.any(Function),
    );
  });

  it('deve retornar false se não estiver logado', async () => {
    const authMock = getAuth();
    const onAuthStateChangedMock = jest.fn((auth, callback) => {
      callback(null);
    });
    onAuthStateChanged.mockImplementation(onAuthStateChangedMock);

    const result = await checkLoggedUser();

    expect(result).toBe(false);
    expect(onAuthStateChangedMock).toHaveBeenCalledWith(
      authMock,
      expect.any(Function),
    );
  });
});
