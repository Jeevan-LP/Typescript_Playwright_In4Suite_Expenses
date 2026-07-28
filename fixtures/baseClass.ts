import { test as base, Locator, expect } from "@playwright/test";
import { AppDependent } from "../utilities/appDependent.spec";
import dotenv from "dotenv";
export { expect };

dotenv.config({path:"./configuration/credentials/loginCredential.env", override:true});

export const test = base;

    test.beforeAll("Framework Setup", async()=>{

        console.log("========== In4Suite ERP Framework Started ==========");

    });

        test.beforeEach("Application Setup", async({page})=>{
            //await page.goto(process.env.URL!, {waitUntil:'networkidle'}); //directly access from .env file
            await page.goto('/', {waitUntil:'networkidle'}); //networkidle: Wait until the page has finished loading
            await page.locator("#txtLoginId").fill(process.env.USERNAME!);
            await page.locator("#txtPassword").fill(process.env.PASSWORD!);
            await page.locator("#cmbLogin").click();

            //If multi login yes button visible
            const YesBtn:Locator=page.locator("#btnYes");
                if(await YesBtn.isVisible() && await YesBtn.isEnabled()){
                    await YesBtn.click();
                }
            
            //Verify In4Suite Application title
/*Expect*/  await expect(page).toHaveTitle("Real Estate Enterprise Information Portal");
        });

        test.afterEach("Application Cleanup", async ({page}) => {
            let app=new AppDependent(page);

            //Verify In4Suite Application logout icon
            const logoutBtn=(await app.TopFrame()).locator("#lnkLogout>img");
/*Expect*/  await expect(logoutBtn).toBeVisible();
                if(await logoutBtn.isDisabled() && await logoutBtn.isEnabled()){
                    await logoutBtn.click();
                }
        });

    test.afterAll("Framework Cleanup", async()=>{

        console.log("========== In4Suite ERP Framework Ended ============")

    });