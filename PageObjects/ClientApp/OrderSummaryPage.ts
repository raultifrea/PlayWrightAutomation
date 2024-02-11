import { Locator, Page } from "@playwright/test";

export default class OrderSummaryPage {
    page: Page;
    orderIdDetails: Locator;

    constructor(page:Page) {
        this.page = page;
        this.orderIdDetails = page.locator('.col-text');
    }
}