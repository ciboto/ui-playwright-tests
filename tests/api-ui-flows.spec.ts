import { test } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterAccount/RegisterPage';
import { registerUserViaAPI } from '../helpers/registerUserApi';
import { LoginPage } from '../pages/Login/LoginPage';
import { TestUser } from '../helpers/types';

let user: TestUser;

test.describe('End-to-End API and UI Scenarios', () => {
  test.beforeEach(async ({ request, page }) => {
    user = await registerUserViaAPI({ request, page });
  });

  test('API + UI: Create user, login and delete account @APIandUI', async ({ page }) => {
    const register = new RegisterPage(page);
    const login = new LoginPage(page);

    await login.Login(user.email, user.password);
    await register.DeleteAccount();
  });
});
