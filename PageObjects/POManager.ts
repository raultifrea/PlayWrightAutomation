import { Page } from "@playwright/test";
import DashboardPage from "./ClientApp/DashboardPage";
import LoginPage from "./ClientApp/LoginPage";
import CartPage from "./ClientApp/CartPage";
import OrderPage from "./ClientApp/OrderPage";
import ConfirmationPage from "./ClientApp/ConfirmationPage";
import MyOrdersPage from "./ClientApp/MyOrdersPage";
import OrderSummaryPage from "./ClientApp/OrderSummaryPage";
import LoginPagePractise from "./LoginPagePractise";

export default class POManager{
    loginPage: LoginPage;
    loginPractisePage: LoginPagePractise;
    dashboardPage: DashboardPage;
    page: Page;
    cartPage: CartPage;
    orderPage: OrderPage;
    confirmationPage: ConfirmationPage;
    myOrdersPage: MyOrdersPage;
    orderSummaryPage: OrderSummaryPage;

    constructor(page: Page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.loginPractisePage = new LoginPagePractise(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.orderPage = new OrderPage(this.page);
        this.confirmationPage = new ConfirmationPage(this.page);
        this.myOrdersPage = new MyOrdersPage(this.page);
        this.orderSummaryPage = new OrderSummaryPage(this.page);
    }

    async getLoginPage() {
        return this.loginPage;
    }

    async getLoginPractisePage() {
        return this.loginPractisePage;
    }

    async getDashboardPage() {
        return this.dashboardPage;
    }

    async getCartPage() {
        return this.cartPage;
    }

    async getOrderPage() {
        return this.orderPage;
    }

    async getConfirmationPage() {
        return this.confirmationPage;
    }

    async getMyOrdersPage() {
        return this.myOrdersPage;
    }

    async getOrderSummaryPage() {
        return this.orderSummaryPage;
    }
}

