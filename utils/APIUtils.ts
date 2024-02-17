import { APIRequestContext, expect } from "@playwright/test";

export default class APIUtils {
    apiContext: APIRequestContext;
    loginPayload: object;

    constructor(apiContext: APIRequestContext, loginPayload: object) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    //request to logs in and saves the token
    async getToken() {
        const loginResponse = await this.apiContext.post('https://www.rahulshettyacademy.com/api/ecom/auth/login',
        {
           data: this.loginPayload
       });
       expect(loginResponse.ok()).toBeTruthy(); //200-299
       let loginResponseJson = await loginResponse.json();
       let token = loginResponseJson.token;
       return token;
    }

    //request to create an order given the orderPayload defined in the test file
    async createOrder(orderPayload: object) {
        let response: any = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post('https://www.rahulshettyacademy.com/api/ecom/order/create-order',
        {
            data: orderPayload,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            },
        });
        
        const orderResponseJson = await orderResponse.json();
        let orderID = orderResponseJson.orders[0];
        response.orderID = orderID;
        return response;
    }
}