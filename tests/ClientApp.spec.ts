import { expect, test } from '@playwright/test';
import LoginPagePractise from '../PageObjects/LoginPagePractise';

test('@Web Browser Context Playwright test', async ({browser}) => {
    
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const loginPage = new LoginPagePractise(page);

    const cardTitles = page.locator('.card-title > a');

    //Intercept requests that contain any image type extension, then abort the images loading. Test will still pass
    // page.route('**/*{jpg,png,jpeg}', route => route.abort());

    //print to console all urls from all requests made in this test
    // page.on('request', request => console.log(request.url()));

    //print to console all urls and their status code from all the resposnes in this test
    page.on('response', response => console.log(response.url(), response.status()));

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    // console.log(await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

    //Try login with incorrect credentials and assert
    await loginPage.validLogin('rahulshetty','learning')

    // both .alert-danger AND [style*='block'] finds the same element
    await expect(page.locator('.alert-danger')).toHaveCSS('display', 'block');
    const errorText = await page.locator("[style*='block']").textContent();

    expect(errorText).toContain('Incorrect');
    expect(errorText).toEqual('Incorrect username/password.');

    //Login with correct credentials
    await loginPage.validLogin('rahulshettyacademy','learning')

    
    //first element text
    console.log(await cardTitles.nth(0).textContent()); //iphone X
    console.log(await cardTitles.first().textContent()); //iphone X
    //second element text
    console.log(await cardTitles.nth(1).textContent()); //Samsung Note 8
    const allTitles = await cardTitles.allTextContents(); //[ 'iphone X', 'Samsung Note 8', 'Nokia Edge', 'Blackberry' ]
    console.log(allTitles);

});

test('@Web First Playwright test', async ({page}) => {
    
    await page.goto('https://google.com');
    // console.log(await page.title());
    await expect(page).toHaveTitle('Google');

});