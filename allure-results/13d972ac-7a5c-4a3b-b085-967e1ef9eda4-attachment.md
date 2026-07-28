# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: expensesFullFlowTestCase.spec.ts >> In4Suite Expenses Full Flow Testcases
- Location: tests\expensesFullFlowTestCase.spec.ts:4:5

# Error details

```
Error: locator.innerText: Target page, context or browser has been closed
Call log:
  - waiting for locator('#erpContainer').contentFrame().locator('[name=\'mainFrame\']').contentFrame().locator('[name=\'rightframe\']').contentFrame().locator('#lblExpReqId')

```

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('#erpContainer').contentFrame().locator('[name=\'topFrame\']').contentFrame().locator('#lnkLogout>img')
Expected: visible
Received: undefined

```

# Test source

```ts
  1  | import { test as base, Locator, expect } from "@playwright/test";
  2  | import { AppDependent } from "../utilities/appDependent.spec";
  3  | import dotenv from "dotenv";
  4  | export { expect };
  5  | 
  6  | dotenv.config({path:"./configuration/credentials/loginCredential.env", override:true});
  7  | 
  8  | export const test = base;
  9  | 
  10 |     test.beforeAll("Framework Setup", async()=>{
  11 | 
  12 |         console.log("========== In4Suite ERP Framework Started ==========");
  13 | 
  14 |     });
  15 | 
  16 |         test.beforeEach("Application Setup", async({page})=>{
  17 |             //await page.goto(process.env.URL!, {waitUntil:'networkidle'}); //directly access from .env file
  18 |             await page.goto('/', {waitUntil:'networkidle'}); //networkidle: Wait until the page has finished loading
  19 |             await page.locator("#txtLoginId").fill(process.env.USERNAME!);
  20 |             await page.locator("#txtPassword").fill(process.env.PASSWORD!);
  21 |             await page.locator("#cmbLogin").click();
  22 | 
  23 |             //If multi login yes button visible
  24 |             const YesBtn:Locator=page.locator("#btnYes");
  25 |                 if(await YesBtn.isVisible() && await YesBtn.isEnabled()){
  26 |                     await YesBtn.click();
  27 |                 }
  28 |             
  29 |             //Verify In4Suite Application title
  30 | /*Expect*/  await expect(page).toHaveTitle("Real Estate Enterprise Information Portal");
  31 |         });
  32 | 
  33 |         test.afterEach("Application Cleanup", async ({page}) => {
  34 |             let app=new AppDependent(page);
  35 | 
  36 |             //Verify In4Suite Application logout icon
  37 |             const logoutBtn=(await app.TopFrame()).locator("#lnkLogout>img");
> 38 | /*Expect*/  await expect(logoutBtn).toBeVisible();
     |                                     ^ Error: expect(locator).toBeVisible() failed
  39 |                 if(await logoutBtn.isDisabled() && await logoutBtn.isEnabled()){
  40 |                     await logoutBtn.click();
  41 |                 }
  42 |         });
  43 | 
  44 |     test.afterAll("Framework Cleanup", async()=>{
  45 | 
  46 |         console.log("========== In4Suite ERP Framework Ended ============")
  47 | 
  48 |     });
```