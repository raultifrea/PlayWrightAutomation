import test, { expect } from "@playwright/test";

test("Popup validations", async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // //Go back to rahulshetty.com
    // await page.goBack();
    // //Go forward to google.com
    // await page.goForward();

    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();

    //Alerts & Popups
    page.on('dialog', dialog => {
        dialog.accept();
        // dialog.dismiss();
    });
    await page.locator('#confirmbtn').click();

    //Hover
    await page.locator('#mousehover').hover();

    //iFrames
    const framesPage = page.frameLocator('#courses-iframe');
    framesPage.locator('li > a[href*="lifetime-access"]:visible').click();
    const textCheck = await framesPage.locator('.text > h2').textContent();
    console.log(textCheck?.split(' ')[1]);
});
