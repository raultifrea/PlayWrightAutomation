import test, { expect } from "@playwright/test";

test('Make full e2e purchase and assertions using UI', async ({page}) => {

    //variables
    const productName = 'ADIDAS ORIGINAL';
    const addToCart = ' Add To Cart';
    const email = 'raultifrea@gmail.com';
    const password = 'TestPass1!';
    const country = 'Sweden';

    //locators
    const userName = page.locator('#userEmail');
    const userPassword = page.locator('#userPassword');
    const loginBtn = page.locator('#login');
    const products = page.locator('.card-body');
    const items = page.locator('.card-body b');
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

    await page.goto('https://rahulshettyacademy.com/client/');

    await userName.fill(email);
    await userPassword.fill(password);
    await loginBtn.click();
    //Might be flaky
    await page.waitForLoadState('networkidle');
    //Waits for first element to load
    await items.first().waitFor({timeout: 5000})
    //Print first item text
    console.log(await items.first().textContent());
    //Print all items texts
    console.log(await items.allTextContents());

    //E2E Scenario eCommerce purchase and confirmation

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