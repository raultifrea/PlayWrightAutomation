import { Locator, Page } from "@playwright/test";

export default class MyOrdersPage {
    page: Page;
    orderTableBody: Locator;
    orderRows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.orderTableBody = page.locator('table > tbody');
        this.orderRows = page.locator('tbody > tr');
    }

    async viewOrderDetails(orderID: string) {
        for (let i = 0; i < await this.orderRows.count(); i++) {
            const rowOrderID: any = await this.orderRows.nth(i).locator('th').textContent();
            if (orderID?.includes(rowOrderID)) {
                //Click View button on the selected row that matches the order ID
                this.orderRows.nth(i).locator('.btn-primary').click();
                break;
            }
        }
    }
}