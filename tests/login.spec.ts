import { test, expect } from '@playwright/test';
import { getOrCreateUser } from '../helpers/getOrCreateUser'
import { LoginPage } from '../pages/Login/LoginPage'
import { TestUser } from '../helpers/types'
import { HomeLocators } from '../pages/Home/home-locators';

let user: TestUser;

test.describe('Login Account Suite', () => {
  test.beforeAll(async () => {
    user = await getOrCreateUser();
  })

  test('Login With Sucess @login', async ({ page }) => {
    const login = new LoginPage(page)
    await login.Login(user.email, user.password)
    await expect (page.getByRole('link', { name: ' Logout'})).toBeVisible()
    
  })

  test('Login With Wrong Credentials @errorLogin', async ({ page }) => {
    const login = new LoginPage(page);
    await login.Login('email_nao_existente@mail.com', '12345')
    await login.ValidadeErrorLogin()
  })
})