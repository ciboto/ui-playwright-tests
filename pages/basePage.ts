import { test as base, expect } from '@playwright/test';
import { HomePage } from './Home/HomePage';
import { RegisterPage } from './RegisterAccount/RegisterPage';
import { LoginPage } from './Login/LoginPage';
import { ProductsPage } from './Products/ProductsPage';
import { CartPage } from './Cart/CartPage';
import { CheckoutPage } from './Checkout/CheckoutPage';

export const test = base.extend<{
  homePage: HomePage,
  registerPage: RegisterPage,
  loginPage: LoginPage,
  productPage: ProductsPage,
  cartPage: CartPage,
  checkoutPage: CheckoutPage,
}>({
  // Instancia a homePage antes do teste
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});