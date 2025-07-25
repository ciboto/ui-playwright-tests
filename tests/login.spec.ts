import { test, expect } from '@playwright/test';
import { registerUserViaAPI } from '../helpers/registerUserApi';
import { LoginPage } from '../pages/Login/LoginPage'
import { TestUser } from '../helpers/types'

let user: TestUser;

test.describe('Login Account Suite', () => {
  test.beforeEach(async ({ request, page }) => {
     user = await registerUserViaAPI({ request, page });
  })


  test('Login With Sucess @login', async ({ page }) => {
    const login = new LoginPage(page)
    await login.Login(user.email, user.password)
    await expect(page.getByRole('link', { name: ' Logout' })).toBeVisible()

  })

  test('Login With Wrong Credentials @errorLogin', async ({ page }) => {
    const login = new LoginPage(page);
    await login.LoginError('email_nao_existente@mail.com', '12345')
  })

  test('Logout With Sucess @logout', async ({ page }) => {
    const login = new LoginPage(page)
    await login.Login(user.email, user.password)
    await login.Logout()
  })
})