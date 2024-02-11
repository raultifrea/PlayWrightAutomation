import { Locator, Page } from "@playwright/test";

export default class LoginPagePractise {
    signInBtn: Locator;
    userName: Locator;
    passWord: Locator;
    page: Page;

    constructor(page: Page){
        this.page = page;
        this.signInBtn = page.locator('#signInBtn');
        this.userName = page.locator('#username');
        this.passWord = page.locator('[type="password"]');
    }

    async validLogin(userName: string, password: string) {
        await this.userName.fill(userName);
        await this.passWord.fill(password);
        await this.signInBtn.click();
    }

}