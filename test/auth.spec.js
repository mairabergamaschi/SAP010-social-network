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

describe('checkLoggedUser', () => {
  it('deve verificar se o usuário logado está autenticado', () => {
    checkLoggedUser();
    expect(onAuthStateChanged).toHaveBeenCalledTimes(1);
  });
});

describe('createUserWithEmail', () => {
  it('should create a new user', async () => {
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
