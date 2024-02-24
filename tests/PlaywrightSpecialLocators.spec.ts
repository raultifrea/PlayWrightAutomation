import test, { expect } from "@playwright/test";

test('@Web Playwright special locators',async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/angularpractice/');

    //Selects a label<> element by its text and clicks its checkbox .check() also works
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    //Selects a label<> element by its text and clicks its radio button .check() also works
    await page.getByLabel('Employed').click();
    //Select a dropdown option based on option
    await page.getByLabel('Gender').selectOption('Female');
    //Select by placeholder
    await page.getByPlaceholder("Password").fill("TestPassword1!");
    //Select by different roles
    await page.getByRole("button", {name: 'Submit'}).click();
    //Select by text
    expect(page.getByText('Success! The Form has been submitted successfully!.').isVisible()).toBeTruthy();
    //Select by different roles
    await page.getByRole('link', {name: 'Shop'}).click();
    //Filter by text. Actually applie getByText(). Click Add to cart furthermore
    await page.locator('app-card').filter({ hasText: 'Nokia Edge'}).getByRole('button').click();
    //Assert item was added to cart
    await expect(page.locator('a.nav-link').last()).toContainText('( 1 )');

})