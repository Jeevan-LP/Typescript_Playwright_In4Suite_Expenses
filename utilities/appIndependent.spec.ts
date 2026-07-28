import { Page, Locator ,expect} from "@playwright/test";

export class AppIndependent {

    public page:Page;
    private dropdownTimeoutMs:number = 1500;
    private inputTimeoutMs:number = 1500;
    private clickTimeoutMs:number = 7000;
    private buttonTimeoutMs:number = 5000;
    
    constructor(page:Page){
        this.page=page;
    }

    async waitAndSelectOption(locator: Locator, value: string): Promise<void> {
        await locator.waitFor({
            state: "visible",
            timeout: this.dropdownTimeoutMs
        });

        await locator.selectOption(value);

        await this.page.waitForTimeout(this.dropdownTimeoutMs);
    }


    async waitAndFill(locator: Locator, value: string): Promise<void> {
        await locator.waitFor({
            state: "visible",
            timeout: this.inputTimeoutMs
        });

        await locator.fill(value);
        await this.page.waitForTimeout(this.inputTimeoutMs);
    }

    async waitAndMenuClick(locator: Locator): Promise<void> {
        await locator.waitFor({
            state: "visible",
            timeout: this.clickTimeoutMs
        });

        await locator.click();

        await this.page.waitForTimeout(this.clickTimeoutMs);
    }

    async waitAndButtonClick(locator: Locator): Promise<void> {
        await locator.waitFor({
            state: "visible",
            timeout: this.buttonTimeoutMs
        });

        await locator.click();

        await this.page.waitForTimeout(this.buttonTimeoutMs);
    }
    
}