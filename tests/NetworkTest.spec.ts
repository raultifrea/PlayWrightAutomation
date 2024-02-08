import { test, expect, request } from "@playwright/test";
import APIUtils from "./utils/APIUtils";

const country: string = 'Romania'
const sneakersId: string = '6581ca979fd99c85e8ee7faf'
const loginPayload = { userEmail: "raultifrea@gmail.com", userPassword: "TestPass1!" }
const orderPayload = { orders: [{ country: country, productOrderedId: sneakersId }] };
let response: { token: any; orderID: string | any[]; };
const fakePayLoadOrders: any = { message: "No Product in Cart" }

test.beforeAll(async () => {
    //Initialize playwright requests context
    const apiContext = await request.newContext();
    //create new variable instance of APIUtils class using our login credentials
    const apiUtils = new APIUtils(apiContext, loginPayload);
    //create an order with our details and store it in a variable
    response = await apiUtils.createOrder(orderPayload);
});


test('Intercept route and fake response', async ({ page }) => {

    //locators
    const myOrders = page.locator("[routerlink*=myorders]");
    const noOrders = page.locator('.mt-4');

    //Parse the token from the API login
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    //Go to dashboard directly as token is saved in Application/Local Storage
    await page.goto('https://rahulshettyacademy.com/client/');

    //Routing provides the capability to modify network requests that are made by a page.
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*', async route => {
        //Sends HTTP(S) request and returns its response. 
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayLoadOrders);
        //Fulfills route's request with given response.
        route.fulfill({
            response,
            body,
        });
    })
    //Go to My Orders
    await myOrders.first().click();
    //wait for response to fulfill
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');
    //assert the fake empty body was sent
    let noOrdersText = await noOrders.textContent();
    expect(noOrdersText).toEqual(' You have No Orders to show at this time. Please Visit Back Us ');

});