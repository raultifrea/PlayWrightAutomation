import { test } from "@playwright/test";

export const customtest = test.extend(
{
    testDataForOrder: {
        email: "raultifrea@gmail.com",
        password: "TestPass1!",
        productName: "ADIDAS ORIGINAL",
        country: "Sweden"
        }
}
);
