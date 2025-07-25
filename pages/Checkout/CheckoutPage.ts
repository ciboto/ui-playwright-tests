import { Page, expect } from '@playwright/test';
import { CheckoutLocators } from './checkout-locators';
import { fakerPT_BR } from '@faker-js/faker';
const faker = fakerPT_BR

export class CheckoutPage {
    constructor(private page: Page) { }

    async PlaceOrder() {
        await this.page.getByText(CheckoutLocators.bntProceedCheckout).click();
        await expect(this.page.getByText(CheckoutLocators.titleAdressInfos)).toBeVisible();
        await this.page.locator(CheckoutLocators.noteOrderInput).fill('Teste QA SDET SAMY');
        await this.page.getByRole('link', { name: CheckoutLocators.btnPlaceOrder }).click();
    }

    async PayAndConfirmOrder() {
        await this.page.locator(CheckoutLocators.nameCreditCardInput).fill(faker.person.fullName());
        await this.page.locator(CheckoutLocators.numberCreditCardInput).fill(faker.finance.creditCardNumber());
        await this.page.getByRole('textbox', { name: CheckoutLocators.cvvCreditCardInput }).fill(faker.finance.creditCardCVV());
        await this.page.getByRole('textbox', { name: CheckoutLocators.monthCreditCardInput }).fill('10');
        await this.page.getByRole('textbox', { name: CheckoutLocators.yearCreditCardInput }).fill('2040');
        await this.page.getByRole('button', { name: CheckoutLocators.confirmOrderBtn }).click();
        await expect (this.page.getByText(CheckoutLocators.messageOrderPlaced)).toBeVisible();
    }
}