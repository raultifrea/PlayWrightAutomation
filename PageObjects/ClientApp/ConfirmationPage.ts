import { Locator, Page } from "@playwright/test";

export default class ConfirmationPage {
    page: Page;
    thankForOrder: Locator;
    title: Locator;

    constructor(page: Page) {
        this.page = page;
        this.thankForOrder = page.locator('.hero-primary');
        this.title = page.locator('.em-spacer-1 > .ng-star-inserted');
    }
}