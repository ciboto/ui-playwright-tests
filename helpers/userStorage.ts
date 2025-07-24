import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import path from 'path';
import { TestUser } from './types';

const userPath = path.resolve(__dirname, 'Data/user.json');

export const userExists = (): boolean => existsSync(userPath);

export const loadUser = (): TestUser =>
  JSON.parse(readFileSync(userPath, 'utf-8'));

export const saveUser = (user: TestUser) => {
  const dir = path.dirname(userPath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(userPath, JSON.stringify(user, null, 2));
};