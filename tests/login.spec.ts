import { expect } from '@playwright/test';
import { registerUserViaAPI } from '../helpers/registerUserApi';
import { TestUser } from '../helpers/types'
import { test } from '../pages/basePage'

let user: TestUser;

test.describe('Login Account Suite', () => {
  test.beforeEach(async ({ request, page }) => {
     user = await registerUserViaAPI({ request, page });
  })


  test('Login With Sucess @login', async ({loginPage, page }) => {
    await loginPage.Login(user.email, user.password)
    await expect(page.getByRole('link', { name: ' Logout' })).toBeVisible()

  })

  test('Login With Wrong Credentials @errorLogin', async ({ loginPage }) => {
    await loginPage.LoginError('email_nao_existente@mail.com', '12345')
  })

  test('Logout With Sucess @logout', async ({ loginPage }) => {
    await loginPage.Login(user.email, user.password)
    await loginPage.Logout()
  })
})