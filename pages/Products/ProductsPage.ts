import { Page, expect } from '@playwright/test';
import { ProductsLocators } from './products-locators';

export class ProductsPage {
    constructor(private page: Page) {}

    async ViewProductCategoryWoman(){
        await expect (this.page.getByRole('img', { name: ProductsLocators.imgProducts })).toBeVisible()
        await this.page.getByRole('link', { name: ProductsLocators.categoryWomen }).click()
        await this.page.getByRole('link', { name: ProductsLocators.subCategoryWomen }).click()
        await expect (this.page.getByRole('heading', { name: ProductsLocators.titleCategoryDress })).toBeVisible()
        await this.page.getByRole('link', { name: ProductsLocators.btnViewProduct}).first().click()
}
}