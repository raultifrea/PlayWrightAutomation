import test, { expect } from "@playwright/test";

test('@Web UI Controls',async ({page}) => {

    const dropdown = page.locator('select.form-control');
    const radioBtn = page.locator('.radiotextsty');
    const okBtn = page.locator('#okayBtn');
    const termsBtn = page.locator('#terms');
    const documentLink = page.locator("[href*='documents-request']");

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    //selects the dropdown value within the select element with the 'consult' value
    await dropdown.selectOption('consult')
    // await page.pause();

    //selects the last radio button found on the page
    await radioBtn.last().click();
    await expect((radioBtn).last()).toBeChecked();
    // returns True of False
    console.log(await radioBtn.last().isChecked());

    await okBtn.click();
    await termsBtn.click();

    //await is scoped outside as toBeChecked() is called outside
    await expect(termsBtn).toBeChecked();
    await termsBtn.uncheck();
    //await is scoped inside because the isChecked() is called inside
    expect(await termsBtn.isChecked()).toBeFalsy();

    await expect(documentLink).toHaveAttribute('class', 'blinkingText');
});

test('@Web Child Windows handling', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    //Aborts an intercepted request, this example will not load the css request. Test will still pass
    // page.route('**/*.css', route => route.abort());

    const documentLink = page.locator("[href*='documents-request']");
    const userName = page.locator('#username');
    
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const [newPage] = await Promise.all([
        //promise states: pending/rejected/fulfilled
        context.waitForEvent('page'),  //listen for any new pages to open
        documentLink.click() //new page is opened
    ]);

    //locator existent only in newPage
    const text: any = await  newPage.locator('.red').textContent(); //Please email us at mentor@rahulshettyacademy.com with below template to receive response 
    const arrayText: string[]= text.split("@")
    const domain = arrayText[1].split(' ')[0]; //rahulshettyacademy.com
    // console.log(domain);

    //focus back on parent window/tab
    await userName.fill(domain);
    console.log(await userName.textContent());

})

