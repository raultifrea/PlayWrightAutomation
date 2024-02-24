import test, { expect } from "@playwright/test";

// set tests within the spec to run in parallel
test.describe.configure({ mode: 'parallel' });

/* set tests with the spec to run incrementaly, and to be dependant on the previous test block,
if the first test block fails, the next will be skipped */
// test.describe.configure({ mode: 'serial' });

test("@Web Popup validations", async ({page}) => {

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

test("@Web Screenshots", async ({page}) => {
    
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await expect(page.locator('#displayed-text')).toBeVisible();

    //takes screenshot of the element we need and saves it in the root folder
    await page.locator('#displayed-text').screenshot({path: 'screenshots/partialScreenshot.png'});

    await page.locator('#hide-textbox').click();

    //takes page screenshot and saves it in the root folder
    await page.screenshot({path: 'screenshots/fullScreenshot.png'});

    await expect(page.locator('#displayed-text')).toBeHidden();

});

test('@Web Visual comparison', async ({page}) => {

    await page.goto('https://www.google.com/');

    //compares screenshot with baseline. First time fails and creates baseline
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
});
