import { Page, expect } from '@playwright/test';
import { RegisterLocators } from './register-locators';
import { HomeLocators } from '../Home/home-locators';

export class RegisterPage {
    constructor(private page: Page) { }

    async SignupInit(name: string, email: string) {
        await expect(this.page.getByRole('heading', { name: RegisterLocators.titleSignup })).toBeVisible()
        await this.page.getByRole('textbox', { name: RegisterLocators.nameInput }).click();
        await this.page.getByRole('textbox', { name: RegisterLocators.nameInput }).fill(name);
        await this.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder(RegisterLocators.emailInput).fill(email);
        await this.page.getByRole('button', { name: RegisterLocators.signupConfirmBtn }).click();
    }

    async FillAccountInformation(firstName: string, lastName: string, passwordInput: string, company: string, street: string, state: string, city: string, zipCode: string, phone: string) {
        await expect(this.page.getByRole('heading', { name: RegisterLocators.messageAccountInformation })).toBeVisible()
        await this.page.getByRole('radio', { name: RegisterLocators.chkFemale }).check();
        await this.page.getByRole('textbox', { name: RegisterLocators.passwordInput }).fill(passwordInput);
        await this.page.locator(RegisterLocators.dayBithIput).selectOption('15');
        await this.page.locator(RegisterLocators.monthBirthInput).selectOption('11');
        await this.page.locator(RegisterLocators.yearBirthInput).selectOption('2005');
        await this.page.getByRole('checkbox', { name: RegisterLocators.chkReceiveOffer }).check();
        await this.page.getByRole('checkbox', { name: RegisterLocators.chkNewsLetter }).check();
        await this.page.getByRole('textbox', { name: RegisterLocators.fistNameInput }).fill(firstName);
        await this.page.getByRole('textbox', { name: RegisterLocators.lastNameInput }).fill(lastName);
        await this.page.getByRole('textbox', { name: RegisterLocators.companyInput, exact: true }).fill(company);
        await this.page.getByRole('textbox', { name: RegisterLocators.addressInput }).fill(street);
        await this.page.getByRole('textbox', { name: RegisterLocators.stateInput }).fill(state);
        await this.page.getByRole('textbox', { name: RegisterLocators.cityInput }).fill(city);
        await this.page.locator(RegisterLocators.zipCodeInput).fill(zipCode);
        await this.page.getByRole('textbox', { name: RegisterLocators.mobileNumberInput }).fill(phone);
        await this.page.getByRole('button', { name: RegisterLocators.btnCreateAccount }).click();
        await expect(this.page.getByText(RegisterLocators.messageAccountCreated)).toBeVisible();
    }

    async ValidateUserLogged(fullName: string) {
        await this.page.getByRole('link', { name: RegisterLocators.btnContinue }).click();
        await expect(this.page.getByText(`Logged in as ${fullName}`)).toBeVisible();
    }

    async DeleteAccount() {
        await this.page.getByRole('link', { name: HomeLocators.deleteAccountBtn }).click();
        await expect (this.page.getByText(RegisterLocators.messageAccountDeleted)).toBeVisible();
    }
}
