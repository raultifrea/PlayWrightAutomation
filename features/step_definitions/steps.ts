import { When, Then, Given } from '@cucumber/cucumber';
import LoginPagePractise from '../../PageObjects/LoginPagePractise';
const { expect } = require('@playwright/test'); //does not recognise correctly using import

Given('a login to Eccommerce application with {string} and {string}', {timeout: 100*1000}, async function (email, password) {
    const loginPage = await this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(email, password);
  });

When('adding {string} to Cart', async function (productName) {
    //using the this. keyword makes the variable global throughout features
    this.dashboardPage = await this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddToCart(productName);
    await this.dashboardPage.navigateToCart();
});

Then('Verify product is displayed in the Cart', async function () {
    const cartPage = await this.poManager.getCartPage();
    expect(cartPage.cartElement.isVisible()).toBeTruthy();
    await cartPage.goToCheckout();
});

When('Enter valid details and place the Order', async function () {
    const country = "Sweden";
    const orderPage = await this.poManager.getOrderPage();
    const confirmationPage = await this.poManager.getConfirmationPage();
    await orderPage.fillInCreditCardInfo('123', 'Raul Tifrea')
    await orderPage.fillInShippingInfo(country);
    await orderPage.clickPlaceOrder();
    await expect(confirmationPage.thankForOrder).toHaveText(' Thankyou for the order. ');
    this.orderID = await confirmationPage.title.textContent()!;
});

Then('Verify order is present in the Order History', async function () {
    const myOrdersPage = await this.poManager.getMyOrdersPage();
    const orderSummaryPage = await this.poManager.getOrderSummaryPage();
    await this.dashboardPage.myOrders.first().click();
    await myOrdersPage.orderTableBody.waitFor();
    await myOrdersPage.viewOrderDetails(this.orderID);
    const orderIdDetails = await orderSummaryPage.orderIdDetails.textContent();
    expect(this.orderID.includes(orderIdDetails)).toBeTruthy();
});

Given('a login to LoginPractisePage application with {string} and {string}', async function (username, password) {
    const loginPage = await this.poManager.getLoginPractisePage();
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(this.page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    //Try login with incorrect credentials and assert
    await loginPage.validLogin(username,password)
  });

Then('Verify Error message is displayed', async function () {
    await expect(this.page.locator('.alert-danger')).toHaveCSS('display', 'block');
    const errorText = await this.page.locator("[style*='block']").textContent();
    expect(errorText).toContain('Incorrect');
    expect(errorText).toEqual('Incorrect username/password.');
});
