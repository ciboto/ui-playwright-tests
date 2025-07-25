import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/Home/HomePage';
import { LoginPage } from '../pages/Login/LoginPage'
import { ProductsPage } from '../pages/Products/ProductsPage';
import { CartPage } from '../pages/Cart/CartPage';
import { CheckoutPage } from '../pages/Checkout/CheckoutPage';
import { TestUser } from '../helpers/types'
import { getOrCreateUser } from '../helpers/getOrCreateUser'

let user: TestUser;

test.describe('Place Order Suite', () => {

  test.beforeEach(async ({ request, page }) => {
    user = await getOrCreateUser({ request, page });
    const login = new LoginPage(page);
    const home = new HomePage(page)
    await login.Login(user.email, user.password);
    await home.goToProducts()
  });


  test('Place Order with Success @order', async ({ page }) => {
    const product = new ProductsPage(page)
    const cart = new CartPage(page)
    const checkout = new CheckoutPage(page)
    await product.ViewProductCategoryWoman()
    await cart.AddProductCart()
    await checkout.PlaceOrder()
    await checkout.PayAndConfirmOrder()
  })
})