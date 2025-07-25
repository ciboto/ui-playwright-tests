import { test } from '../pages/basePage'
import { TestUser } from '../helpers/types'
import { registerUserViaAPI } from '../helpers/registerUserApi';

let user: TestUser;

test.describe('Place Order Suite', () => {
  test.beforeEach(async ({ request, page, loginPage, homePage }) => {
    user = await registerUserViaAPI({ request, page });
    await loginPage.Login(user.email, user.password);
    await homePage.goToProducts()
  });

  test('Place Order with Success @order', async ({productPage, cartPage, checkoutPage }) => {
    await productPage.ViewProductCategoryWoman()
    await cartPage.AddProductCart()
    await checkoutPage.PlaceOrder()
    await checkoutPage.PayAndConfirmOrder()
  })
})