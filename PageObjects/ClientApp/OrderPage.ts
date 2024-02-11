import { Locator, Page } from "@playwright/test";

export default class OrderPage{
    page: Page;
    input: Locator;
    countriesInput: Locator;
    countriesDropdown: Locator;
    mailLabel: Locator;
    placeOrder: Locator;

    constructor(page: Page) {
        this.page = page;
        this.input = page.locator('input[type="text"]');
        this.countriesInput = page.locator('[placeholder*=Country]');
        this.countriesDropdown = page.locator('.ta-results')
        this.mailLabel = page.locator('.user__name > label');
        this.placeOrder = page.locator('.action__submit');
    }

    async fillInCreditCardInfo(threeDigits: string, name: string) {
        await this.input.nth(1).fill(threeDigits);
        await this.input.nth(2).fill(name);
    }

    async fillInShippingInfo(country: string) {
        await this.countriesInput.pressSequentially(country);
        await this.countriesDropdown.waitFor();
        const optionsCount = await this.countriesDropdown.locator('button').count();
        for (let i = 0; i < optionsCount; i++) {
            let text = await this.countriesDropdown.locator('button').nth(i).textContent();
            if (text?.trim() === country) {
                await this.countriesDropdown.locator('button').nth(i).click();
                break;
            }
        } 
    }

    async clickPlaceOrder() {
        await this.placeOrder.click();
    }
}