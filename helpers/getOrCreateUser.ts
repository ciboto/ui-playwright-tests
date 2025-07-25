import { registerUserViaAPI } from './registerUserApi';
import { userExists, loadUser, saveUser } from './userStorage';
import { TestUser } from './types';
import { APIRequestContext, Page } from '@playwright/test';

export const getOrCreateUser = async (
  context: { request: APIRequestContext; page: Page }
): Promise<TestUser> => {
  const { request, page } = context;

  if (userExists()) {
    return loadUser();
  }

  const user = await registerUserViaAPI({ request, page });
  saveUser(user);
  return user;
};