import {
  collection,
  deleteDoc, doc, getDocs, updateDoc,
} from 'firebase/firestore';

import {
  createPost, deletePost, updatePost,
} from '../src/firebase/firestore.js';

const mockAuth = {
  currentUser: {
    name: 'auth.displayName',
    email: 'thais@example.com',
    password: '123456',
  },
};

jest.mock('firebase/firestore');

afterEach(() => {
  jest.clearAllMocks();
});

describe('createPost', () => {
  it('Deveria criar um post do usuario e add na collection', async () => {
    const querySnapshot = getDocs.mockResolvedValueOnce([mockAuth.currentUser]);
    const addDoc = {
      name: mockAuth.currentUser.displayName,
      author: mockAuth.currentUser.uid,
      description: [],
      createdAt: new Date(),
      likes: [],
      whoLiked: [],
    };
    await createPost(addDoc);
    expect(querySnapshot).toHaveBeenCalled();
    expect(collection).toHaveBeenCalledWith(addDoc);
    expect(addDoc).toHaveBeenCalledWith(collection(), addDoc);
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
