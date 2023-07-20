import { getAuth, libAuth } from 'firebase/auth';
import { getUserId, getUserName } from '../src/firebase/auth';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');

describe('User functions', () => {
  it('getUserId needs to be a function', () => {
    expect(typeof getUserId).toBe('function');
  });

  it('getUserId returns current user id', () => {
    const expectedUserId = 'USER_1';
    const authMock = {
      currentUser: {
        uid: expectedUserId
      }
    };

    getAuth.mockReturnValue(authMock);

    const userId = getUserId();
    expect(userId).toBe(expectedUserId);
  });

  it('getUserId returns null when current user does not work', () => {
    getAuth.mockReturnValue({});

    const userId = getUserId();
    expect(userId).toBe(null);
  });

  it('getUserName returns user name when current user exists', () => {
    const expectedUserName = 'CURRENT_USER_NAME';
    const authMock = {
      currentUser: {
        displayName: expectedUserName
      }
    };

    getAuth.mockReturnValue(authMock);

    const userName = getUserName();
    expect(userName).toBe(expectedUserName);
  });

  it('getUserName returns "Usuária" when current user does not exist', () => {
    getAuth.mockReturnValue({});

    const userName = getUserName();
    expect(userName).toBe('Usuária');
  });


});
