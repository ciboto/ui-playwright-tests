import { test } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterAccount/RegisterPage';
import { registerUserViaAPI } from '../helpers/registerUserApi';
import { LoginPage } from '../pages/Login/LoginPage';

test.describe('End-to-End API and UI Scenarios', () => {
  test('API + UI: Create user, login and delete account @APIandUI', async ({ request, page }) => {
    // cria usuário via api
    const user = await registerUserViaAPI({ request, page });
    const register = new RegisterPage(page);
    const login = new LoginPage(page)
    // loga e deleta a conta via UI
    await login.Login(user.email, user.password)
    await register.DeleteAccount()
  });

})
