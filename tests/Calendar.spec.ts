import test, { expect } from "@playwright/test";

test('Calendar validation', async ({page}) => {

    const monthNumber = '6';
    const date = '15';
    const year = '2027';
    const expectedList = [monthNumber, date, year];

    //takes a CSS selector and returns a Promise that resolves to an array of ElementHandle objects
    const inputs = await page.$$('.react-date-picker__inputGroup > input');

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');

    //select calendar input
    await page.locator('.react-date-picker__inputGroup').click();
    //double click center label to zoom out to decade view
    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label').click();
    //click the year tile by text
    await page.getByText(year).click();
    //click the 6th month of the year tile. Starts from 0
    await page.locator('.react-calendar__tile').nth(Number(monthNumber)-1).click();
    //click the day of the month using xpath locators
    await page.locator(`//abbr[text()="${date}"]`).click();

    for (let index = 0; index < inputs.length; index++) {
        const value = inputs[index].getAttribute['value'];
        expect(value).toEqual(expectedList[index]);
    }
    
})