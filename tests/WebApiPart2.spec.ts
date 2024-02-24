import {test, expect, BrowserContext } from "@playwright/test";

const country: string = 'Sweden'
const email = 'raultifrea@gmail.com';
const password = 'TestPass1!';
let webContext: BrowserContext;

test.beforeAll( async({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    //login locators
    const userName = page.locator('#userEmail');
    const userPassword = page.locator('#userPassword');
    const loginBtn = page.locator('#login');  
    
    //Initialize playwright requests context
    await page.goto('https://rahulshettyacademy.com/client/');
    await userName.fill(email);
    await userPassword.fill(password);
    await loginBtn.click();
    //Might be flaky
    await page.waitForLoadState('networkidle');
    //save local storage information in a json file at root level
    await context.storageState({path: 'state.json'});
    //pass the storage state to a new context of a browser
    webContext = await browser.newContext({storageState: 'state.json'});
});


test('@Api Make full e2e purchase and assertions using UI ', async () => {

    //reuse the new Context with the current storage
    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    //variables
    const productName = 'ADIDAS ORIGINAL';
    const addToCart = ' Add To Cart';
    
    //locators
    const products = page.locator('.card-body');
    const loadingBall = page.locator('.la-ball-scale-multiple');
    const cart = page.locator("[routerlink*=cart]")
    const myOrders = page.locator("[routerlink*=myorders]")
    const cartElement = page.locator(`h3:has-text('ADIDAS ORIGINAL')`); //does not work with const `productName` as it expects single string, no spaces
    const checkout = page.locator('.totalRow > .btn-primary');
    const countriesInput = page.locator('[placeholder*=Country]');
    const countriesDropdown = page.locator('.ta-results')
    const mailLabel = page.locator('.user__name > label');
    const placeOrder = page.locator('.action__submit');
    const thankForOrder = page.locator('.hero-primary');
    const orderTableBody = page.locator('table > tbody');
    const orderRows = page.locator('tbody > tr');

    const count = await products.count();
    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator('b').textContent() === productName) {
            await products.nth(i).locator(`text=${addToCart}`).click();
            await expect(loadingBall).toHaveCount(0);
            break;
        }
    }
    await cart.click();
    //wait for cart page page to load, does not work for multiple elements found
    await page.locator('div li').first().waitFor();
    
    await expect(cartElement).toHaveCount(1);
    //same as:
    expect(cartElement.isVisible()).toBeTruthy();

    await checkout.click();

    // fill in credit card info
    await page.locator('input[type="text"]').nth(1).fill('123');
    await page.locator('input[type="text"]').nth(2).fill('Raul Tifrea');

    //fill shipping info
    await countriesInput.pressSequentially(country);
    await countriesDropdown.waitFor();
    const optionsCount = await countriesDropdown.locator('button').count();
    for (let i = 0; i < optionsCount; i++) {
        let text = await countriesDropdown.locator('button').nth(i).textContent();
        if (text?.trim() === country) {
            await countriesDropdown.locator('button').nth(i).click();
            break;
        }
    } 

    // Verify email is correctly displayed
    await expect(mailLabel).toHaveText(email);
    // Place order
    await placeOrder.click();

    //Verify confirmation page details
    await expect(thankForOrder).toHaveText(' Thankyou for the order. ');
    const orderID: any = await page.locator('.em-spacer-1 > .ng-star-inserted').textContent()!;
    console.log(orderID);

    //Go to My Orders
    await myOrders.first().click();
    await orderTableBody.waitFor();

    for (let i = 0; i < await orderRows.count(); i++) {
        const rowOrderID = await orderRows.nth(i).locator('th').textContent();
        if (orderID?.includes(rowOrderID)) {
            //Click View button on the selected row that matches the order ID
            orderRows.nth(i).locator('.btn-primary').click();
            break;
        }
    }

    //On Order Summary page
    const orderIdDetails = await page.locator('.col-text').textContent();
    expect(orderID.includes(orderIdDetails)).toBeTruthy();

    // await page.pause();
});

test('@Api Print all titles', async () => {

    //reuse the new Context with the current storage
    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    const products = page.locator('.card-body');
    const count = await products.count();
    console.log(count);


});