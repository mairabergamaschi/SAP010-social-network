import {
  collection,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';

import { accessPost } from '../src/firebase/firestore';

jest.mock('firebase/firestore');
jest.mock('../src/firebase/firebase');

describe('firestore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('function accessPost', () => {
    it('deve acessar a publicacao criada e retornar um array', async () => {
      const mockOrderBy = 'order';
      orderBy.mockReturnValueOnce(mockOrderBy);
      const mockQuery = 'query';
      query.mockReturnValueOnce(mockQuery);
      const mockCollection = 'collection';
      collection.mockReturnValueOnce(mockCollection);
      getDocs.mockResolvedValueOnce([
        {
          id: '1',
          data: () => ({ texto: 'Primeiro post' }),
        },
        {
          id: '2',
          data: () => ({ texto: 'Segundo Post' }),
        },
        {
          id: '3',
          data: () => ({ texto: 'Terceiro Post' }),
        },
      ]);
      const acessoPost = accessPost();
      expect(acessoPost).toEqual([
        { id: '1', texto: 'Primeiro post' },
        { id: '2', texto: 'Segundo Post' },
        { id: '3', texto: 'Terceiro Post' },
      ]);
      expect(orderBy).toHaveBeenCalledTimes(1);
      expect(orderBy).toHaveBeenCalledWith('data');
      expect(collection).toHaveBeenCalledTimes(1);
      expect(collection).toHaveBeenCalledWith(undefined, 'posts');
      expect(query).toHaveBeenCalledTimes(1);
      expect(query).toHaveBeenCalledWith(mockCollection, mockOrderBy);
      expect(getDocs).toHaveBeenCalledTimes(1);
      expect(getDocs).toHaveBeenCalledWith(mockQuery);
    });
  });
});
