import { test as base, Locator, expect, chromium } from "@playwright/test";
import { AppDependent } from "../utilities/appDependent.spec";
import dotenv from "dotenv";
export { expect };

dotenv.config({path:"./configuration/credentials/loginCredential.env", override:true});

//export let context:BrowserContext;
//export let page:Page;
export const test = base;

    test.beforeAll("Framework Setup", async()=>{
        console.log("========== In4Suite ERP Framework Started ==========");
        //context=await browser.newContext();
        //page=await context.newPage();
    });

        test.beforeEach("Application Setup", async({page})=>{
            await page.goto(process.env.URL!, {waitUntil:'networkidle'});
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

        // if(page){
        // await page.close();
        // }

        // if(context){
        // await context.close();
        // }
    });