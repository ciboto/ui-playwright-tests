import { registerUserViaAPI } from './registerUserApi';
import { userExists, loadUser, saveUser } from './userStorage';
import { TestUser } from './types';

export const getOrCreateUser = async (): Promise<TestUser> => {
  if (userExists()) {
    return loadUser();
  }

  const user = await registerUserViaAPI();
  saveUser(user);
  return user;
};