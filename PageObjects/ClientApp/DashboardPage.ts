import { Locator, Page, expect } from "@playwright/test";

export default class DashboardPage {
    page: Page;
    products: Locator;
    items: Locator;
    cart: Locator;
    myOrders: Locator;
    loadingBall: Locator;
    

    constructor(page: Page){
        this.page = page;
        this.products = page.locator('.card-body');
        this.items = page.locator('.card-body b');
        this.cart = page.locator("[routerlink*=cart]")
        this.myOrders = page.locator("[routerlink*=myorders]")
        this.loadingBall = page.locator('.la-ball-scale-multiple');
    }

    async searchProductAddToCart(productName: string) {
        const addToCart = ' Add To Cart';
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator('b').textContent() === productName) {
                await this.products.nth(i).locator(`text=${addToCart}`).click();
                await expect(this.loadingBall).toHaveCount(0);
                break;
            }
        }
    }

    async navigateToCart() {
        await this.cart.click();
        //wait for cart page page to load, does not work for multiple elements found
        await this.page.locator('div li').first().waitFor();
    }
}