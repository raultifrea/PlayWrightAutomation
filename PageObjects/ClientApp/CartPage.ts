import { Locator, Page } from "@playwright/test";

export default class CartPage{
    page: Page;
    cartElement: Locator;
    checkout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartElement = page.locator(`h3:has-text('ADIDAS ORIGINAL')`); //does not work with const `productName` as it expects single string, no spaces
        this.checkout = page.locator('.totalRow > .btn-primary');
    }

    async goToCheckout() {
        await this.checkout.click();
    }
}