import test, { expect, request } from "@playwright/test";
import APIUtils from "./utils/APIUtils";

const loginPayload = { userEmail: "raultifrea@gmail.com", userPassword: "TestPass1!" }
let token: string;


test.beforeAll(async () => {
    //Initialize playwright requests context
    const apiContext = await request.newContext();
    //create new variable instance of APIUtils class using our login credentials
    const apiUtils = new APIUtils(apiContext, loginPayload);
    //get login token
    token = await apiUtils.getToken();
});

test('Security test request intercept', async ({page}) => {
    //locators
    const myOrders = page.locator("[routerlink*=myorders]");

    //Parse the token from the API login
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    //Go to dashboard directly as token is saved in Application/Local Storage
    await page.goto('https://rahulshettyacademy.com/client/');

    //Go to My Orders
    await myOrders.first().click();

    //intercept get order details request and feed it an inexistent orderId url to continue its completion
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", route => route.continue({
        //headers: optional headers update,
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=65c22222a86f8f74dc725222"
    }));

    //click the first View button from the first order to trigger the request
    await page.locator("button:has-text('View')").first().click();

    //asert the correct unauthorized text is displayed
    await expect(page.getByText('You are not authorize to view')).toBeVisible();

    
})