import { Page, expect } from '@playwright/test';
import { CartLocators } from './cart-locators';

export class CartPage {
    constructor(private page: Page) { }

    async AddProductCart() {
        await this.page.getByRole('button', { name: CartLocators.bntAddCart }).click();
        await expect (this.page.getByRole('heading', { name: CartLocators.messageProductAddCart })).toBeVisible();
        await this.page.getByRole('link', { name: CartLocators.btnViewCart }).click();
        await expect (this.page.getByText(CartLocators.messageShoppingCart)).toBeVisible();
    }
}