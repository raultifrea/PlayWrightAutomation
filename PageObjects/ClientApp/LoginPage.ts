import { Locator, Page } from "@playwright/test";

export default class LoginPage {
    userName: Locator;
    userPassword: Locator;
    loginBtn: Locator;
    page: Page

    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator('#userEmail');
        this.userPassword = page.locator('#userPassword');
        this.loginBtn = page.locator('#login');
    }

    async validLogin(email: string, password: string) {
        await this.userName.fill(email);
        await this.userPassword.fill(password);
        await this.loginBtn.click();
        //Might be flaky
        await this.page.waitForLoadState('networkidle');
    }

    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/client/');
    }
}