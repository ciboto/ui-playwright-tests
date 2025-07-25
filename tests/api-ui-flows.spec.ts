import { registerUserViaAPI } from '../helpers/registerUserApi';
import { TestUser } from '../helpers/types';
import { test } from '../pages/basePage'
let user: TestUser;

test.describe('End-to-End API and UI Scenarios', () => {
  test.beforeEach(async ({ request, page }) => {
    user = await registerUserViaAPI({ request, page });
  });

  test('API + UI: Create user, login and delete account @APIandUI', async ({ loginPage, registerPage }) => {
    await loginPage.Login(user.email, user.password);
    await registerPage.DeleteAccount();
  });
});
