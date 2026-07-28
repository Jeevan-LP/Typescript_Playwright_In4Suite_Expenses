import {test, expect, Locator, Page} from "@playwright/test";

export class AppDependent{

    private page:Page;

    constructor(page:Page){
        this.page=page;
    }

    //Application frames
    async MainParentFrame(){
        return this.page.frameLocator("#erpContainer");
    }

    async LeftFrame(){
        return this.page.frameLocator("#erpContainer").frameLocator("[name='mainmenuFrame']");
    }

    async MiddleFrame(){
        return this.page.frameLocator("#erpContainer").frameLocator("#slideleft");
    }

    async RightFrame(){
        return this.page.frameLocator("#erpContainer").frameLocator("[name='mainFrame']").frameLocator("[name='rightframe']");
    }

    async TopFrame(){
        return this.page.frameLocator("#erpContainer").frameLocator("[name='topFrame']");
    }

    async TabFrame(){
        return this.page.frameLocator("#erpContainer").frameLocator("[name='mainFrame']").frameLocator("[name='rightframe']").
        frameLocator("[name='TabFrame']");
    }

    async FinancePaymentDetailsFrame(){
        return this.page.frameLocator("#erpContainer").frameLocator("[name='mainFrame']").frameLocator("[name='rightframe']").
        frameLocator("[name='mainDn']");
    }

    //Application expenses menu's
    async getExpenses(){
            return (await this.LeftFrame()).locator("//span[text()='Expenses']").click();
    }

    async getWorkOrder(){
            return (await this.MiddleFrame()).locator("//a[text()='Work Order ']").click();
    }

    async getPayments(){
            return (await this.MiddleFrame()).locator("//a[text()='Payments ']").click();
    }

    async getPayment(){
            return (await this.MiddleFrame()).locator("//a[text()='Payment']").click();
    }

    async getApprovals(){
            return (await this.MiddleFrame()).locator("//a[text()='Approvals ']").click();
    }

    async getWorkOrderApproval(){
            return (await this.MiddleFrame()).locator("//a[text()='Work Order']").click();
    }

    //Application finance menu's
    async getFinance(){
            return (await this.LeftFrame()).locator("//span[text()='Finance']").click();
    }

    async getFinExpense(){
            return (await this.MiddleFrame()).locator("//a[text()='Expense']").first().click();
    }

    async getFinPayment(){
            return (await this.TabFrame()).locator("//a[text()='Payments']").click();
    }

}