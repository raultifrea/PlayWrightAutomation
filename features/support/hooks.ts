import { Before, BeforeStep, After, AfterStep, Status } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import POManager from "../../PageObjects/POManager";

/**
 * runs before each Scenario
 */
Before(async function() {
    const browser = await chromium.launch({headless: true});
    const context = await browser.newContext();
    //using the this. keyword makes the variable global throughout features
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

/**
 * runs after each Scenario
 */
After(async function () {
   console.log("I am executed in the After hook"); 
});

/**
 *  this step will be executed before each step
 */
BeforeStep(async function() {
});

/**
 * this step will be executed after each step
 */
AfterStep(async function ({result}) {
    if(result.status === Status.FAILED) {
        await this.page.screenshot({path: 'screenshots/feature.png'});
    }
});
