import { Page, expect } from '@playwright/test';
import { HomeLocators } from "./home-locators";

export class HomePage {
  constructor(private page: Page) {}

  async goToHome() {
    await this.page.goto('/');
    await expect (this.page.getByRole('heading', { name: HomeLocators.homeTitle }).locator('span')).toBeVisible()
  }

  async goToSignupLogin() {
    await this.page.getByRole('link', { name: HomeLocators.signupOrLoginBtn }).click();
  }

  async goToProducts() {
    await this.page.getByRole('link', { name: HomeLocators.productBtn }).click();
  }

  async goToCart() {
    await this.page.getByRole('link', { name: HomeLocators.cartBtn }).click();
  }
}
