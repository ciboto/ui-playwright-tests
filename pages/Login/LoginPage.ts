import { Page, expect } from '@playwright/test';
import { LoginLocators } from './login-locators';
import { HomeLocators } from '../Home/home-locators';

export class LoginPage {
    constructor(private page: Page) { }

    async Login(email: string, password: string,) {
        await this.page.goto('/');
        await this.page.getByRole('link', { name: HomeLocators.signupOrLoginBtn }).click();
        await this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder(LoginLocators.emailLoginInput).fill(email);
        await this.page.getByRole('textbox', { name: LoginLocators.passwordLoginInput }).fill(password);
        await this.page.getByRole('button', { name: LoginLocators.btnLogin }).click();
    }

    async ValidadeErrorLogin() {
        await expect(this.page.getByText(LoginLocators.messageError)).toBeVisible();
    }

    async ValidateUserLogged(fullName: string) {
        await expect(this.page.getByText(`Logged in as ${fullName}`)).toBeVisible();
    }
}