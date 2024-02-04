import {test, expect, request } from "@playwright/test";
import APIUtils from "./utils/APIUtils";

const country: string = 'Romania'
const sneakersId: string = '6581ca979fd99c85e8ee7faf'
const loginPayload = {userEmail: "raultifrea@gmail.com", userPassword: "TestPass1!"}
const orderPayload = {orders: [{country: country, productOrderedId: sneakersId}]};
let response: { token: any; orderID: string | any[]; };

test.beforeAll( async() => {

    //Initialize playwright requests context
    const apiContext = await request.newContext();
    //create new variable instance of APIUtils class using our login credentials
    const apiUtils = new APIUtils(apiContext, loginPayload);
    //create an order with our details and store it in a variable
    response = await apiUtils.createOrder(orderPayload);
});


test('Make full e2e purchase and assertions using UI + API', async ({page}) => {

    //locators
    const myOrders = page.locator("[routerlink*=myorders]")
    const orderTableBody = page.locator('table > tbody');
    const orderRows = page.locator('tbody > tr');
    const address = page.locator('.address .text');   //multiple results

    //Parse the token from the API login
    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    }, response.token);

    //Go to dashboard directly as token is saved in Application/Local Storage
    await page.goto('https://rahulshettyacademy.com/client/');

    //Go to My Orders
    await myOrders.first().click();
    await orderTableBody.waitFor();

    for (let i = 0; i < await orderRows.count(); i++) {
        const rowOrderID: any = await orderRows.nth(i).locator('th').textContent();
        if (response.orderID.includes(rowOrderID)) {
            //Click View button on the selected row that matches the order ID
            orderRows.nth(i).locator('.btn-primary').click();
            break;
        }
    }

    //On Order Summary page
    const orderIdDetails: any = await page.locator('.col-text').textContent();
    expect(response.orderID.includes(orderIdDetails)).toBeTruthy();
    //Verify the country is the one from the Create Order request
    expect(address.last()).toContainText(country);
});