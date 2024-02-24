import { expect } from "@playwright/test";
import {customtest} from "../utils/test-base.js"
import POManager from "../PageObjects/POManager";

customtest.skip(`@Web Go to checkout using UI using fixtures for test Data`, async ({page,testDataForOrder}) => {

    const poManager = new POManager(page);

    //initialise classes using Page Object Manager class
    const loginPage = await poManager.getLoginPage();
    const dashboardPage = await poManager.getDashboardPage();
    const cartPage = await poManager.getCartPage();

    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.email, testDataForOrder.password);
    
    //Waits for first element to load
    await dashboardPage.items.first().waitFor({timeout: 5000})
    //Print first item text
    console.log(await dashboardPage.items.first().textContent());
    //Print all items texts
    console.log(await dashboardPage.items.allTextContents());

    //E2E Scenario eCommerce purchase and confirmation
    await dashboardPage.searchProductAddToCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    await expect(cartPage.cartElement).toHaveCount(1);
    //same as:
    expect(cartPage.cartElement.isVisible()).toBeTruthy();

    await cartPage.goToCheckout();

});
