import {
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import {
  getAppAuth,
  getUserId,
  getUserName,
  createUserDocument,
  createUserWithEmail,
  loginWithEmail,
  loginGoogle,
  loginFacebook,
  logout,
  checkLoggedUser,
} from '../src/firebase/auth';
import {
  accessPost,
  hasUserLikedPost,
} from '../src/firebase/firestore';
import { db } from '../src/firebase/firebase';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');
jest.mock('../src/firebase/firebase');

describe('accessPost', () => {
  it('should access and print the posts', () => {
    const mockSnapshot = {
      forEach: jest.fn((callback) => {
        const mockPost = {
          data: jest.fn(() => ({
            id: 'post123',
            name: 'John Doe',
            description: 'This is a post.',
            likes: [],
          })),
        };
        callback(mockPost);
      }),
    };
    const mockCollectionRef = jest.fn();
    const mockQuery = jest.fn();
    const mockUpdateListPost = jest.fn();

    collection.mockReturnValue(mockCollectionRef);
    query.mockReturnValue({
      ...mockQuery,
      orderBy: jest.fn(() => mockQuery), // Mock do método orderBy para retornar o próprio mockQuery
    });
    onSnapshot.mockImplementation((callback) => {
      callback(mockSnapshot);
      return () => {}; // Mock return value for the unsubscribe function
    });

    accessPost(mockUpdateListPost);

    expect(collection).toHaveBeenCalledWith(db, 'posts');
    expect(orderBy).toHaveBeenCalledWith('createdAt', 'desc');
    expect(query).toHaveBeenCalledWith(mockCollectionRef);
    expect(onSnapshot).toHaveBeenCalledWith(mockQuery, expect.any(Function));
    expect(mockUpdateListPost).toHaveBeenCalledWith([
      {
        id: 'post123',
        name: 'John Doe',
        description: 'This is a post.',
        likes: [],
      },
    ]);
  });
});

describe('hasUserLikedPost', () => {
  it('should check if a user has liked a post', async () => {
    const mockPostId = 'post123';
    const mockUserId = 'user456';
    const mockDocSnap = {
      exists: true,
      data: jest.fn(() => ({
        whoLiked: ['user123', 'user456'],
      })),
    };
    const mockDocRef = jest.fn();

    getAppAuth.mockReturnValue({ currentUser: { uid: mockUserId } });
    doc.mockReturnValue(mockDocRef);
    getDocs.mockResolvedValue(mockDocSnap);

    const result = await hasUserLikedPost(mockPostId);

    expect(getAppAuth).toHaveBeenCalled();
    expect(doc).toHaveBeenCalledWith(db, 'posts', mockPostId);
    expect(getDocs).toHaveBeenCalledWith(mockDocRef);
    expect(result).toBe(true);
  });

  it('should return false if the post does not exist or the user has not liked it', async () => {
    const mockPostId = 'post123';
    const mockUserId = 'user456';
    const mockDocSnap = { exists: false };
    const mockDocRef = jest.fn();

    getAppAuth.mockReturnValue({ currentUser: { uid: mockUserId } });
    doc.mockReturnValue(mockDocRef);
    getDocs.mockResolvedValue(mockDocSnap);

    const result = await hasUserLikedPost(mockPostId);

    expect(getAppAuth).toHaveBeenCalled();
    expect(doc).toHaveBeenCalledWith(db, 'posts', mockPostId);
    expect(getDocs).toHaveBeenCalledWith(mockDocRef);
    expect(result).toBe(false);
  });
});

describe('Auth Functions', () => {
  // Mock the user object to be used in tests
  const mockUser = {
    uid: 'user123',
    displayName: 'John Doe',
    email: 'johndoe@example.com',
  };

  // Mock the auth object to be used in tests
  const mockAuth = {
    currentUser: mockUser,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    getAppAuth.mockReturnValue(mockAuth);
  });

  // Test getUserId function
  it('should get the user ID', () => {
    const userId = getUserId();
    expect(userId).toEqual(mockUser.uid);
  });

  // Test getUserName function
  it('should get the user name', () => {
    const userName = getUserName();
    expect(userName).toEqual(mockUser.displayName);
  });

  // Test createUserDocument function
  it('should create user document', async () => {
    const mockUserRef = { id: 'user123' };
    doc.mockReturnValueOnce(mockUserRef);
    await createUserDocument(mockUser);
    expect(doc).toHaveBeenCalledWith(mockAuth, 'users', mockUser.uid);
    expect(getDocs).toHaveBeenCalledWith(mockUserRef, {
      displayName: mockUser.displayName,
      email: mockUser.email,
    });
  });

  // Test createUserWithEmail function
  it('should create user with email and password', async () => {
    const mockName = 'John';
    const mockLastName = 'Doe';
    const mockEmail = 'johndoe@example.com';
    const mockPassword = 'password123';
    const mockUserCredential = { user: mockUser };
    createUserWithEmailAndPassword.mockResolvedValueOnce(mockUserCredential);
    await createUserWithEmail(mockName, mockLastName, mockEmail, mockPassword);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, mockEmail, mockPassword);
    expect(updateProfile).toHaveBeenCalledWith(mockUser, {
      displayName: `${mockName} ${mockLastName}`,
    });
    expect(createUserDocument).toHaveBeenCalledWith(mockUser);
  });

  // Test loginWithEmail function
  it('should login with email and password', async () => {
    const mockEmail = 'johndoe@example.com';
    const mockPassword = 'password123';
    await loginWithEmail(mockEmail, mockPassword);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, mockEmail, mockPassword);
  });

  // Test loginGoogle function
  it('should login with Google', async () => {
    const mockProvider = new GoogleAuthProvider();
    signInWithPopup.mockResolvedValueOnce({ user: mockUser });
    await loginGoogle();
    expect(signInWithPopup).toHaveBeenCalledWith(mockAuth, mockProvider);
    expect(createUserDocument).toHaveBeenCalledWith(mockUser);
  });

  // Test loginFacebook function
  it('should login with Facebook', async () => {
    const mockProvider = new FacebookAuthProvider();
    signInWithPopup.mockResolvedValueOnce({ user: mockUser });
    await loginFacebook();
    expect(signInWithPopup).toHaveBeenCalledWith(mockAuth, mockProvider);
    expect(createUserDocument).toHaveBeenCalledWith(mockUser);
  });

  // Test logout function
  it('should log out', async () => {
    await logout();
    expect(signOut).toHaveBeenCalledWith(mockAuth);
  });

  // Test checkLoggedUser function
  it('should check if the user is logged in', async () => {
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback({ currentUser: { displayName: 'John Doe', email: 'johndoe@example.com', uid: 'user123' } });
    });
    const isLoggedIn = await checkLoggedUser();
    expect(onAuthStateChanged).toHaveBeenCalledWith(mockAuth, expect.any(Function));
    expect(isLoggedIn).toBe(true);
  });
});
