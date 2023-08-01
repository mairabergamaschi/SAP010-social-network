import {
  collection,
  deleteDoc, doc, onSnapshot, orderBy, query, updateDoc,
} from 'firebase/firestore';

import {
  accessPost,
  deletePost, updatePost,
} from '../src/firebase/firestore.js';
import { db } from '../src/firebase/firebase.js';

jest.mock('firebase/firestore');

afterEach(() => {
  jest.clearAllMocks();
});

describe('accessPost', () => {
  it('deve acessar e imprimir os posts', () => {
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
      orderBy: jest.fn(() => mockQuery),
    });
    onSnapshot.mockImplementation((callback) => {
      callback(mockSnapshot);
      return () => {};
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
