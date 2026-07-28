# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: expensesFullFlowTestCase.spec.ts >> In4Suite Expenses Full Flow Testcases
- Location: tests\expensesFullFlowTestCase.spec.ts:4:5

# Error details

```
Error: page.waitForTimeout: Test ended.
```

# Test source

```ts
  387 | 
  388 |     getPayUploadBtn(){
  389 |         const DocUploadBtn=this.PaymentDocPopup?.locator("#btnUpload");
  390 |         DocUploadBtn?.waitFor({ state: "visible" });
  391 |         return DocUploadBtn?.click();
  392 |     }
  393 | 
  394 |     async getDocCommentsTxtf() {
  395 | 		return (await this.appDep.RightFrame()).locator("#gvDocuments_ctl02_txtRemarks");
  396 | 	}
  397 | 
  398 |     async getPaymentSubmitBtn(){
  399 |         const paymentSubmitBtn = (await this.appDep.RightFrame()).locator("#btnSave");
  400 |         return paymentSubmitBtn;
  401 |     }
  402 | 
  403 |     //Finance Part
  404 |     async getFinanceCompanyDD() {
  405 | 		return (await this.appDep.FinancePaymentDetailsFrame()).locator("#ddlCompany");
  406 | 	}
  407 | 
  408 |     async getFinanceStatusDD() {
  409 | 		return (await this.appDep.FinancePaymentDetailsFrame()).locator("#ddlStatus");
  410 | 	}
  411 | 
  412 |     async getFinExpNoTxtf() {
  413 | 		return (await this.appDep.FinancePaymentDetailsFrame()).locator("#txtExpenseId");
  414 | 	}
  415 | 
  416 |     async getFinanceGoBtn(){
  417 |         const financeGoBtn = (await this.appDep.FinancePaymentDetailsFrame()).locator("#btnSearch");
  418 |         return financeGoBtn;
  419 |     }
  420 | 
  421 |     async getFinExpNoLink(){
  422 |         const finExpNoLink = (await this.appDep.FinancePaymentDetailsFrame()).locator("#dgExpenseDetails_ctl02_lnkExpenseID");
  423 |         return finExpNoLink;
  424 |     }
  425 | 
  426 |     async getStatusSelectionDD() {
  427 | 		return (await this.appDep.FinancePaymentDetailsFrame()).locator("#ddlStatus");
  428 | 	}
  429 |     
  430 |     async getFinApproverRemarksTxtf() {
  431 | 		return (await this.appDep.FinancePaymentDetailsFrame()).locator("//textarea[@id='txtRemarks']");
  432 | 	}
  433 | 
  434 |     async getProcessedDatePicker() {
  435 | 		return (await this.appDep.FinancePaymentDetailsFrame()).locator("#txtVoucherDate_txtDatePicker");
  436 | 	}
  437 | 
  438 |     async getFinanceUpdateBtn(){
  439 |         const financeUpdateBtn = (await this.appDep.FinancePaymentDetailsFrame()).locator("#btnSave");
  440 |         return financeUpdateBtn;
  441 |     }
  442 | 
  443 |     //Bank Payment Details
  444 |     private MakeBankPaymentPopup:Page | null=null;
  445 |     async getMakeBankPaymentLink() {
  446 | 		let [bankPopup]=await Promise.all([this.page.waitForEvent("popup"), 
  447 |         (await this.appDep.FinancePaymentDetailsFrame()).locator("#aBank").click()]);
  448 | 
  449 |         await this.page.waitForLoadState();
  450 |         this.MakeBankPaymentPopup=bankPopup;
  451 | 	}
  452 | 
  453 |     getBankAccountDD() {
  454 | 		return this.MakeBankPaymentPopup?.locator("#ddlBankCash");
  455 | 	}
  456 | 
  457 |     getInstrumentNoTxtf() {
  458 | 		return this.MakeBankPaymentPopup?.locator("#txtInstrumentNo");
  459 | 	}
  460 | 
  461 |     getMakeBankPaymentSubmitBtn() {
  462 |     const makeBankPaymentSubmitBtn = this.MakeBankPaymentPopup?.locator("#btnSubmit");
  463 |         return makeBankPaymentSubmitBtn;
  464 |     }
  465 |     //---------------------------------Payment Page Object Ended-----------------------------
  466 | 
  467 |     async ExpenseFlowTest(){
  468 | 
  469 |         for(let DataDrivenTest of expenseModuleDriven){
  470 |             //---------------------------------Work Order Test Started-----------------------------
  471 |             let WorkOrderList:string | null=null;// due to try and catch block we declared WorkOrderList variable here to access in payment
  472 |             try{
  473 |                 await this.page.waitForTimeout(this.waitForTimeout);
  474 | /*Expect*/      await expect(await this.getExpenses()).toBeVisible();
  475 |                 await this.appIndep.waitAndMenuClick(await this.getExpenses());
  476 |                 await this.appIndep.waitAndMenuClick(await this.getWorkOrder());
  477 |                 await this.appIndep.waitAndMenuClick(await this.WObtnCreate());
  478 |                 await this.appIndep.waitAndSelectOption(await this.getCompanyDD(),(DataDrivenTest.Company));
  479 |                 await this.appIndep.waitAndSelectOption(await this.getWorkOrderTypeDD(),(DataDrivenTest["Work Order Type"]));
  480 |                 await this.appIndep.waitAndSelectOption(await this.getExpenseTypeDD(),(DataDrivenTest["Expense Type"]));
  481 |                 await this.appIndep.waitAndSelectOption(await this.getExpenseSubTypeDD(),(DataDrivenTest["Expense Sub Type"]));
  482 |                 await this.appIndep.waitAndSelectOption(await this.getVendorNameDD(),(DataDrivenTest["Vendor Name"]));
  483 |                 await this.appIndep.waitAndSelectOption(await this.getPlaceOfSupplyDD(),(DataDrivenTest["Place of Supply"]));
  484 |                 await this.appIndep.waitAndFill(await this.getScopeOfWorkTxtf(), DataDrivenTest["Scope of Work"]);
  485 |                 await this.appIndep.waitAndFill(await this.getContactNameTxtf(), DataDrivenTest["Contact Name"]);
  486 |                 await (await this.getFromDate()).click();
> 487 |                 await this.page.waitForTimeout(this.waitForTimeout);
      |                                 ^ Error: page.waitForTimeout: Test ended.
  488 |                 await this.page.keyboard.press("Enter");
  489 |                 await this.page.waitForTimeout(this.waitForTimeout);
  490 |                 await (await this.getToDate()).click();
  491 |                 await this.page.waitForTimeout(this.waitForTimeout);
  492 |                 await this.page.keyboard.press("Enter");
  493 |                 await this.page.waitForTimeout(this.waitForTimeout);
  494 |                 
  495 |                 // ---------------- Work Order Item started----------------
  496 |                 await this.getAddDetailsLink();
  497 |                 await this.getAddRowLink();
  498 |                 await this.appIndep.waitAndFill(await this.getItemTxtf(), DataDrivenTest.Item);
  499 |                 await this.appIndep.waitAndFill(await this.getItemDescriptionTxtf(), DataDrivenTest["Item Description"]);
  500 |                 await this.appIndep.waitAndSelectOption(await this.getUnitsDD(), DataDrivenTest.Units);
  501 |                 await this.appIndep.waitAndFill(await this.getRateTxtf(), DataDrivenTest.Rate);
  502 |                 await this.appIndep.waitAndFill(await this.getQuantityTxtf(), DataDrivenTest.Quantity);
  503 |                 await this.appIndep.waitAndSelectOption(await this.getDiscountTypeDD(), DataDrivenTest["Discount Type"]);
  504 |                 await this.appIndep.waitAndFill(await this.getDiscountValueTxtf(), DataDrivenTest["Discount Value"]);
  505 |                 await this.getWObtnItem();
  506 |                 // ---------------- Work Order Item ended----------------
  507 |                 
  508 |                 await this.appIndep.waitAndFill(await this.getWorkOrderDescriptionTxtf(), DataDrivenTest["Work Order Description"]);
  509 | 
  510 |                 //----------------Addition Tax started----------------
  511 |                 //1st tax
  512 |                 await this.getTaxAddRowLink();
  513 |                 await this.appIndep.waitAndSelectOption(await this.getAdditionTaxDD_01(), DataDrivenTest.addTax_1);
  514 |                 await this.appIndep.waitAndSelectOption(await this.getTaxTypeDD_01(), DataDrivenTest["Tax Type"]);
  515 |                 await this.appIndep.waitAndFill(await this.getPercOfWOTxtf_01(), DataDrivenTest["% Of Work Order Value"]);
  516 |                 //1st tax
  517 |                 await this.getTaxAddRowLink();
  518 |                 await this.appIndep.waitAndSelectOption(await this.getAdditionTaxDD_02(), DataDrivenTest.addTax_2);
  519 |                 await this.appIndep.waitAndSelectOption(await this.getTaxTypeDD_02(), DataDrivenTest["Tax Type"]);
  520 |                 await this.appIndep.waitAndFill(await this.getPercOfWOTxtf_02(), DataDrivenTest["% Of Work Order Value"]);
  521 |                 //----------------Addition Tax ended----------------
  522 | 
  523 |                 await this.appIndep.waitAndSelectOption(await this.getTypeOfAdvanceDD(), DataDrivenTest["Type of Advance"]);
  524 |                 await this.appIndep.waitAndFill(await this.getAdvancePercentageTxtf(), DataDrivenTest["Advance Percentage(%)"]);
  525 | 
  526 |                 //----------------Deduction Tax started----------------
  527 |                 await this.getTaxDedRowLink();
  528 |                 await this.appIndep.waitAndSelectOption(await this.getDeductionTaxDD(), DataDrivenTest.dedTax);
  529 |                 //----------------Deduction Tax ended------------------
  530 | 
  531 |                 await this.appIndep.waitAndSelectOption(await this.getStatusDD(), "SUBMITTED");
  532 |                 await this.appIndep.waitAndFill(await this.getRemarksTxtf(), DataDrivenTest["WorkOrder Remarks"]);
  533 |                 
  534 |                 // ---------------- Terms & Conditions ----------------
  535 |                 await this.getTermAndConLink(); 
  536 |                 const AllTC=this.TermAndConditionPopup?.locator("//table[@class='in4-table']//input[contains(@type, 'checkbox')]");
  537 |                 await AllTC?.nth(4).check();
  538 | /*Expect*/      await expect(AllTC?.nth(4)!).toBeChecked();
  539 |                 await this.getTermAndConAcceptBtn();
  540 |                 await this.appIndep.waitAndFill(await this.getTermAndConTxtf(), DataDrivenTest["Terms And Conditions Remarks"]);
  541 |                 
  542 |                 // ---------------- Documents ----------------
  543 |                 await this.getDocumentsAddLink();
  544 |                 await this.getUploadDocumentLink();
  545 |                 await this.getChoseFile()?.setInputFiles("configuration/testData/Documents/Expense Payment TestCases.xlsx");
  546 |                 await this.getUploadBtn();
  547 |                 await this.page.waitForTimeout(1000);
  548 |                 await this.appIndep.waitAndFill(await this.getDocumentsRemarksTxtf(), DataDrivenTest["Documents Remarks"]);
  549 | 
  550 |                 //Work Order List
  551 |                 if(await(await this.getWoSubBtn()).isVisible() && await(await this.getWoSubBtn()).isEnabled()){
  552 | /*Expect*/          await expect(await this.getWoSubBtn()).toBeVisible();
  553 |                     await this.appIndep.waitAndButtonClick(await this.getWoSubBtn());
  554 |                     const WorkOrderListNo=(await this.appDep.RightFrame()).locator("//td[@align='left']//a[contains(@id, 'dgWorkOrder_ctl')]");
  555 |                             const allWorkOrderListInnerText= (await WorkOrderListNo.first().innerText()).trim();
  556 |                             if(allWorkOrderListInnerText !==""){
  557 |                                 WorkOrderList=allWorkOrderListInnerText;
  558 |                             }
  559 |                 }
  560 | 
  561 |                 //Work Order Approvals List
  562 |                 await this.appIndep.waitAndMenuClick(await this.getApprovals());
  563 |                 await this.appIndep.waitAndMenuClick(await this.getWorkOrderApproval());
  564 |                 const WorkOrderApprovalsListNo=(await this.appDep.RightFrame()).locator("//td[@align='left']//a[contains(@id, 'dgWorkOrder_ctl')]");
  565 |                 for(let j=0; j< await WorkOrderApprovalsListNo.count(); j++){
  566 |                     let allWorkOrderApprovalsListInnerText=(await WorkOrderApprovalsListNo.nth(j).innerText()).trim();
  567 |                     if(WorkOrderList == allWorkOrderApprovalsListInnerText){
  568 |                             await WorkOrderApprovalsListNo.nth(j).click();
  569 |                             break;
  570 |                     }  
  571 |                 }
  572 |                 const GrossAmount=await (await this.appDep.RightFrame()).locator("#lblGrossAmount").innerText();
  573 | /*Expect*/      await expect((await this.appDep.RightFrame()).locator("#lblContact")).toContainText(DataDrivenTest["Contact Name"]);
  574 | /*Expect*/      await expect((await this.appDep.RightFrame()).locator("#gvDocumentsView_ctl02_lnkBtnUploadFile")).toBeAttached();
  575 | /*Expect*/      await expect(await this.getAppStatusDD()).toBeVisible();
  576 |                 await this.page.waitForTimeout(this.waitForTimeout);
  577 |                 if(await (await this.getAppStatusDD()).isVisible() && await (await this.getAppStatusDD()).isEnabled()){
  578 |                 await this.appIndep.waitAndSelectOption(await this.getAppStatusDD(), "APPROVED");
  579 |                 }
  580 | /*Expect*/      await expect(await this.getAppWoUpdateBtn()).toBeVisible();
  581 |                 await this.page.waitForTimeout(this.waitForTimeout);
  582 |                 if(await (await this.getAppWoUpdateBtn()).isVisible() && await (await this.getAppWoUpdateBtn()).isEnabled()){
  583 |                 await this.appIndep.waitAndButtonClick(await this.getAppWoUpdateBtn());
  584 |                 await this.page.waitForTimeout(this.waitForTimeout);
  585 |                 }
  586 |                 console.log(`Expenses ${WorkOrderList} Work order Approved with INR ${GrossAmount}`);
  587 |             }
```