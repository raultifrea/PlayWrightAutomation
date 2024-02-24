import test, { expect } from "@playwright/test";
import POManager from "../PageObjects/POManager";
import placeOrderTestData from "../utils/placeOrderTestData.json";

//runs test case twice using two different sets of data
for (const data of (placeOrderTestData as Array<any>)) {
    const { email, password, productName, country } = data;

    test(`@Web Make full e2e purchase and assertions using UI for ${country}`, async ({page}) => {

        const poManager = new POManager(page);
    
        //initialise classes using Page Object Manager class
        const loginPage = await poManager.getLoginPage();
        const dashboardPage = await poManager.getDashboardPage();
        const cartPage = await poManager.getCartPage();
        const orderPage = await poManager.getOrderPage();
        const confirmationPage = await poManager.getConfirmationPage();
        const myOrdersPage = await poManager.getMyOrdersPage();
        const orderSummaryPage = await poManager.getOrderSummaryPage();
    
        await loginPage.goTo();
        await loginPage.validLogin(email, password);
        
        //Waits for first element to load
        await dashboardPage.items.first().waitFor({timeout: 5000})
        //Print first item text
        console.log(await dashboardPage.items.first().textContent());
        //Print all items texts
        console.log(await dashboardPage.items.allTextContents());
    
        //E2E Scenario eCommerce purchase and confirmation
        await dashboardPage.searchProductAddToCart(productName);
        await dashboardPage.navigateToCart();
    
        await expect(cartPage.cartElement).toHaveCount(1);
        //same as:
        expect(cartPage.cartElement.isVisible()).toBeTruthy();
    
        await cartPage.goToCheckout();
    
        // fill in credit card info
        await orderPage.fillInCreditCardInfo('123', 'Raul Tifrea')
    
        //fill shipping info
        await orderPage.fillInShippingInfo(country);
    
        // Verify email is correctly displayed
        await expect(orderPage.mailLabel).toHaveText(email);
        // Place order
        await orderPage.clickPlaceOrder();
    
        //Verify confirmation page details
        await expect(confirmationPage.thankForOrder).toHaveText(' Thankyou for the order. ');
        const orderID: any = await confirmationPage.title.textContent()!;
        console.log(orderID);
    
        //Go to My Orders
        await dashboardPage.myOrders.first().click();
        await myOrdersPage.orderTableBody.waitFor();
    
        await myOrdersPage.viewOrderDetails(orderID);
    
        //On Order Summary page
        const orderIdDetails = await orderSummaryPage.orderIdDetails.textContent();
        expect(orderID.includes(orderIdDetails)).toBeTruthy();
    
        // await page.pause();
    
    });
}
