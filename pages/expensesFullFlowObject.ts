import { expect, Locator, Page } from "@playwright/test";
import { AppDependent } from "../utilities/appDependent.spec";
import { AppIndependent } from "../utilities/appIndependent.spec"
import expenseModuleDriven from "../configuration/testData/expenseModuleDriven.json";

export class ExpensesFullFlow_Object{

    private page:Page;
    private appDep:AppDependent;
    private appIndep:AppIndependent;
    private waitForTimeout:number=4000;

    constructor(page:Page){
        this.page = page;
        this.appDep = new AppDependent(page);
        this.appIndep = new AppIndependent(page);
    }

    //Application expenses menu's
    async getExpenses() {
        const expenses = (await this.appDep.LeftFrame()).locator("//span[text()='Expenses']");
        return expenses;
    }

    async getWorkOrder() {
        const workOrder = (await this.appDep.MiddleFrame()).locator("//a[text()='Work Order ']");
        return workOrder;
    }

    async getPayments() {
        const payments = (await this.appDep.MiddleFrame()).locator("//table[@class='newNavbar']//a[text()='Payments ' and @id='defTab']");
        return payments;
    }

    async getPayment() {
        const payment = (await this.appDep.MiddleFrame()).locator("//a[contains(@href,'ExpUsersExpenseList.aspx') and normalize-space()='Payment']");
        return payment;
    }

    async getApprovals() {
        const approvals = (await this.appDep.MiddleFrame()).locator("//a[text()='Approvals ']");
        return approvals;
    }

    async getWorkOrderApproval() {
        const workOrderApproval = (await this.appDep.MiddleFrame()).locator("//a[text()='Work Order']");
        return workOrderApproval;
    }

    // Application Finance menu's
    async getFinance() {
        const finance = (await this.appDep.LeftFrame()).locator("//span[text()='Finance']");
        return finance;
    }

    async getFinExpense() {
        const finExpense = (await this.appDep.MiddleFrame()).locator("//a[text()='Expense']").first();
        return finExpense;
    }

    async getFinPayment() {
        const finPayment = (await this.appDep.TabFrame()).locator("//a[@id='defTab1' and text()='Payment']");
        return finPayment;
    }

    //---------------------------------Work Order Page Object Started-----------------------------
    async WObtnCreate(){
        const btnCreate = (await this.appDep.RightFrame()).locator("#btnCreate");
        return btnCreate;
    }

    async getCompanyDD(){
        const companyDD =(await this.appDep.RightFrame()).locator("#ddlCompany");
        return companyDD;
    }

    async getWorkOrderTypeDD(){
        const workOrderTypeDD=(await this.appDep.RightFrame()).locator("#ddlcurrencytype");
        return workOrderTypeDD;
    }

    async getExpenseTypeDD(){
        const expenseTypeDD =(await this.appDep.RightFrame()).locator("#ddlType");
        return expenseTypeDD;
    }
    
    async getExpenseSubTypeDD(){
        const expenseSubTypeDD=(await this.appDep.RightFrame()).locator("#ddlSubType");
        return expenseSubTypeDD;
    }

    async getVendorNameDD(){
        const vendorNameDD = (await this.appDep.RightFrame()).locator("//select[@id='ddlContractorName']");
        return vendorNameDD;
    }

    async getPlaceOfSupplyDD(){
        return (await this.appDep.RightFrame()).locator("#ddlPlaceofSupply");
    }

    async getScopeOfWorkTxtf(){
        return (await this.appDep.RightFrame()).locator("#txtScopeOfWork");
    }

    async getContactNameTxtf(){
        return (await this.appDep.RightFrame()).locator("#txtContactName");
    }

    async getFromDate(){
        return (await this.appDep.RightFrame()).locator("#dtFromDate_txtDatePicker");
    }

    async getToDate(){
        return (await this.appDep.RightFrame()).locator("#dtToDate_txtDatePicker");
    }
    

    // ---------------- Work Order Item started----------------
    private WorkOrderDetailsPopup:any;
    async getAddDetailsLink(){
      let [Popup]=await Promise.all([this.page.waitForEvent("popup"),
            (await this.appDep.RightFrame()).locator("#lnkWODetails").click()]);

            await Popup.waitForLoadState();
            this.WorkOrderDetailsPopup=Popup;
    }
    
    getAddRowLink(){//locater wont replay any promise so don't use async
         const addRow = this.WorkOrderDetailsPopup.locator("#lnkBtnWODetailsAddRow");
         addRow.waitFor({ state: "visible" });
         return addRow.click();
    }

    getItemTxtf() {
        return this.WorkOrderDetailsPopup.locator("#dgWorkOrderDetails_ctl02_txtWODetailsItem");
    }

    getItemDescriptionTxtf() {
        return this.WorkOrderDetailsPopup.locator("#dgWorkOrderDetails_ctl02_txtWODetailsDesc");
    }

    getUnitsDD() {
        return this.WorkOrderDetailsPopup.locator("#dgWorkOrderDetails_ctl02_ddlWODetailsUnits");
    }

    getRateTxtf() {
        return this.WorkOrderDetailsPopup.locator("#dgWorkOrderDetails_ctl02_txtWODetailsRate");
    }

    getQuantityTxtf() {
        return this.WorkOrderDetailsPopup.locator("#dgWorkOrderDetails_ctl02_txtWODetailsQuantity");
    }

    getDiscountTypeDD() {
        return this.WorkOrderDetailsPopup.locator("#dgWorkOrderDetails_ctl02_ddlDiscountType");
    }

    getDiscountValueTxtf() {
        return this.WorkOrderDetailsPopup.locator("#dgWorkOrderDetails_ctl02_txtDiscountAmount");
    }

    getWObtnItem(){
        const submitBtn = this.WorkOrderDetailsPopup.locator("#btnSubmit");
        submitBtn.waitFor({ state: "visible" });
        return submitBtn.click();
    }
    // ---------------- Work Order Item ended----------------

    async getWorkOrderDescriptionTxtf(){
        return (await this.appDep.RightFrame()).locator("#txtWorkDesc");
    }

    // ----------------Addition Tax started----------------
    //1st tax
    async getTaxAddRowLink() {
        const addRow = (await this.appDep.RightFrame()).locator("//a[@id='lnkBtnAddRow']");
        return await addRow.click();
}
	
	async getAdditionTaxDD_01() {
		return (await this.appDep.RightFrame()).locator("//select[@id='dgTaxAdditions_ctl02_ddlAdditionTax']");
	}
	
	async getTaxTypeDD_01() {
		return (await this.appDep.RightFrame()).locator("//select[@id='dgTaxAdditions_ctl02_ddlAdditionTaxType']");
	}
	
	async getPercOfWOTxtf_01() {
		return (await this.appDep.RightFrame()).locator("#dgTaxAdditions_ctl02_txtAdditionTaxAmount");
	}

    //2nd tax
	async getAdditionTaxDD_02() {
		return (await this.appDep.RightFrame()).locator("//select[@id='dgTaxAdditions_ctl03_ddlAdditionTax']");
	}
	
	async getTaxTypeDD_02() {
		return (await this.appDep.RightFrame()).locator("//select[@id='dgTaxAdditions_ctl03_ddlAdditionTaxType']");
	}
	
	async getPercOfWOTxtf_02() {
		return (await this.appDep.RightFrame()).locator("//input[@id='dgTaxAdditions_ctl03_txtAdditionTaxAmount']");
	}
    // ----------------Addition Tax ended----------------

    async getTypeOfAdvanceDD() {
		return (await this.appDep.RightFrame()).locator("#ddlAdvanceType");
	}
	
    async getAdvancePercentageTxtf() {
		return (await this.appDep.RightFrame()).locator("#txtCtAdvPerc");
	}
	
    async getTaxDedRowLink() {
        const taxDedRow = (await this.appDep.RightFrame()).locator("#lnkBtnDedTaxAddRow");
        return await taxDedRow.click();
    }
	
	async getDeductionTaxDD() {
		return (await this.appDep.RightFrame()).locator("//select[@id='dgTaxDeductions_ctl02_ddlDeductionTax']");
	}
	
	async getStatusDD() {
		return (await this.appDep.RightFrame()).locator("//select[@id='ddlStatus']");
	}
	
	async getRemarksTxtf() {
		return (await this.appDep.RightFrame()).locator("//textarea[@id='txtRemarks']");
	}

    // ---------------- Terms & Conditions ----------------
    private TermAndConditionPopup:Page | null=null;
    async getTermAndConLink(){
        let [TCpopup]=await Promise.all([this.page.waitForEvent("popup"), 
            (await this.appDep.RightFrame()).locator("#lnkAddTermsConditions").click()]);

            await TCpopup.waitForLoadState();
            this.TermAndConditionPopup=TCpopup;
    }

    async getTermAndConAcceptBtn() {
        const acceptBtn = this.TermAndConditionPopup!.locator("//a[@id='lnkAcceptSelected']");
        return await acceptBtn.click();
    }
	
	async getTermAndConTxtf() {
		return (await this.appDep.RightFrame()).locator("#gvTermsAndConditionsList_ctl02_txtTermsCondition");
	}

    // ---------------- Documents ----------------
    async getDocumentsAddLink() {
        const addFile = (await this.appDep.RightFrame()).locator("#lnkBtnAddFile");
        return await addFile.click();
    }

    private DocumentPopup:Page | null=null;
	async getUploadDocumentLink() {
         let [DOCpopup]=await Promise.all([this.page.waitForEvent("popup"), 
             (await this.appDep.RightFrame()).locator("#gvDocuments_ctl02_lnkBtnUploadFile").click()]);

             await DOCpopup.waitForLoadState();
             this.DocumentPopup=DOCpopup;
    }
	
	getChoseFile() {
		 return this.DocumentPopup?.locator("#fupldDocument");
	}
	
    getUploadBtn() {
        const uploadBtn = this.DocumentPopup!.locator("#btnUpload");
        return uploadBtn.click();
    }
	
	async getDocumentsRemarksTxtf() {
		return (await this.appDep.RightFrame()).locator("#gvDocuments_ctl02_txtRemarks");
	}
	
    async getWoSubBtn(): Promise<Locator> {
        const submitBtn = (await this.appDep.RightFrame()).locator("#btnCreate");
        return submitBtn;
    }
	
    // ---------------- Approval ----------------
	async getAppStatusDD() {
		 return (await this.appDep.RightFrame()).locator("//select[@id='ddlStatus' and @name='ddlStatus']");
	}
	
	
    async getAppWoUpdateBtn() {
        const appWoUpdateBtn = (await this.appDep.RightFrame()).locator("//input[@id='btnCreate' and @value='Update']");
        return appWoUpdateBtn;
    }
    //---------------------------------Work Order Page Object Ended-----------------------------

    //---------------------------------Payment Page Object Ended--------------------------------
    //Expenses Part
    async getCreatePaymentBtn(){
        const payCreateBtn = (await this.appDep.RightFrame()).locator("#btnNewRequest");
        return payCreateBtn;
    }

    async getPaymentCompanyDD() {
		const paymentCompanyDD=(await this.appDep.RightFrame()).locator("#ddlCompany");
        return paymentCompanyDD;
	}
	
	async getPaymentExpenseTypeDD() {
		const paymentExpenseTypeDD=(await this.appDep.RightFrame()).locator("#ddlExpenseType");
        return paymentExpenseTypeDD;
	}
	
	async getPaymentExpenseSubTypeDD() {
		const paymentExpenseSubTypeDD=(await this.appDep.RightFrame()).locator("#ddlExpenseSubType");
        return paymentExpenseSubTypeDD;
    }

    async getPaymentGoBtn(){
        const paymentGoBtn = (await this.appDep.RightFrame()).locator("#btnGo");
        return paymentGoBtn;
    }

    async getAmountTxtf() {
		return (await this.appDep.RightFrame()).locator("#dgExpenseDetailItems_ctl02_txtAmount");
	}

    async getPaymentVendorDD() {
		return (await this.appDep.RightFrame()).locator("#ddlVendor");
	}

    async getPaymentWorkOrderDD() {
		return (await this.appDep.RightFrame()).locator("#ddlWorkOrder");
	}

    async getInvoiceAmountTxtf() {
		return (await this.appDep.RightFrame()).locator("#txtInvoiceAmount");
	}

    async getPaymentPlaceOfSupplyDD() {
		return (await this.appDep.RightFrame()).locator("#ddlPlaceofSupply");
	}

    async getInvoiceNumberTxtf() {
		return (await this.appDep.RightFrame()).locator("#txtInvoiceNumber");
	}

    async getInvoiceDatePicker() {
		return (await this.appDep.RightFrame()).locator("#txtInvoiceDate_txtDatePicker");
	}

    async getModeOfPaymentDD() {
		return (await this.appDep.RightFrame()).locator("#ddlModeOfpayment");
	}

    async getPaymentDueDateDatePicker() {
		return (await this.appDep.RightFrame()).locator("#txtPaymentDueDate_txtDatePicker");
	}

    async getPaymentStatusDD() {
		return (await this.appDep.RightFrame()).locator("#ddlStatus");
	}

    async getSACHSNTxtf() {
		return (await this.appDep.RightFrame()).locator("#txtSACCode");
	}

    async getPaymentRemarksTxtf() {
		return (await this.appDep.RightFrame()).locator("#txtRemarks");
	}

    async getPayDocumentsAddLink(){
        const paymentDocAddLink = (await this.appDep.RightFrame()).locator("#lnkBtnAddFile");
        return await paymentDocAddLink.click();
    }

    private PaymentDocPopup: Page| null=null;
    async getPayUploadDocumentLink(){
            let [docPopup]=await Promise.all([this.page.waitForEvent("popup"),
            (await this.appDep.RightFrame()).locator("#gvDocuments_ctl02_lnkBtnUploadFile").click()]);

            await docPopup.waitForLoadState();
            this.PaymentDocPopup=docPopup;
    }

    getPayChoseFile(){
        return this.PaymentDocPopup?.locator("#fupldDocument");
    }

    getPayUploadBtn(){
        const DocUploadBtn=this.PaymentDocPopup?.locator("#btnUpload");
        DocUploadBtn?.waitFor({ state: "visible" });
        return DocUploadBtn?.click();
    }

    async getDocCommentsTxtf() {
		return (await this.appDep.RightFrame()).locator("#gvDocuments_ctl02_txtRemarks");
	}

    async getPaymentSubmitBtn(){
        const paymentSubmitBtn = (await this.appDep.RightFrame()).locator("#btnSave");
        return paymentSubmitBtn;
    }

    //Finance Part
    async getFinanceCompanyDD() {
		return (await this.appDep.FinancePaymentDetailsFrame()).locator("#ddlCompany");
	}

    async getFinanceStatusDD() {
		return (await this.appDep.FinancePaymentDetailsFrame()).locator("#ddlStatus");
	}

    async getFinExpNoTxtf() {
		return (await this.appDep.FinancePaymentDetailsFrame()).locator("#txtExpenseId");
	}

    async getFinanceGoBtn(){
        const financeGoBtn = (await this.appDep.FinancePaymentDetailsFrame()).locator("#btnSearch");
        return financeGoBtn;
    }

    async getFinExpNoLink(){
        const finExpNoLink = (await this.appDep.FinancePaymentDetailsFrame()).locator("#dgExpenseDetails_ctl02_lnkExpenseID");
        return finExpNoLink;
    }

    async getStatusSelectionDD() {
		return (await this.appDep.FinancePaymentDetailsFrame()).locator("#ddlStatus");
	}
    
    async getFinApproverRemarksTxtf() {
		return (await this.appDep.FinancePaymentDetailsFrame()).locator("//textarea[@id='txtRemarks']");
	}

    async getProcessedDatePicker() {
		return (await this.appDep.FinancePaymentDetailsFrame()).locator("#txtVoucherDate_txtDatePicker");
	}

    async getFinanceUpdateBtn(){
        const financeUpdateBtn = (await this.appDep.FinancePaymentDetailsFrame()).locator("#btnSave");
        return financeUpdateBtn;
    }

    //Bank Payment Details
    private MakeBankPaymentPopup:Page | null=null;
    async getMakeBankPaymentLink() {
		let [bankPopup]=await Promise.all([this.page.waitForEvent("popup"), 
        (await this.appDep.FinancePaymentDetailsFrame()).locator("#aBank").click()]);

        await this.page.waitForLoadState();
        this.MakeBankPaymentPopup=bankPopup;
	}

    getBankAccountDD() {
		return this.MakeBankPaymentPopup?.locator("#ddlBankCash");
	}

    getInstrumentNoTxtf() {
		return this.MakeBankPaymentPopup?.locator("#txtInstrumentNo");
	}

    getMakeBankPaymentSubmitBtn() {
    const makeBankPaymentSubmitBtn = this.MakeBankPaymentPopup?.locator("#btnSubmit");
        return makeBankPaymentSubmitBtn;
    }
    //---------------------------------Payment Page Object Ended-----------------------------

    async ExpenseFlowTest(){

        for(let DataDrivenTest of expenseModuleDriven){
            //---------------------------------Work Order Test Started-----------------------------
            let WorkOrderList:string | null=null;// due to try and catch block we declared WorkOrderList variable here to access in payment
            try{
                await this.page.waitForTimeout(this.waitForTimeout);
                await this.appIndep.waitAndMenuClick(await this.getExpenses());
                await this.appIndep.waitAndMenuClick(await this.getWorkOrder());
/*Expect*/      await expect(await this.WObtnCreate()).toBeVisible();
                await this.appIndep.waitAndMenuClick(await this.WObtnCreate());
                await this.appIndep.waitAndSelectOption(await this.getCompanyDD(),(DataDrivenTest.Company));
                await this.appIndep.waitAndSelectOption(await this.getWorkOrderTypeDD(),(DataDrivenTest["Work Order Type"]));
                await this.appIndep.waitAndSelectOption(await this.getExpenseTypeDD(),(DataDrivenTest["Expense Type"]));
                await this.appIndep.waitAndSelectOption(await this.getExpenseSubTypeDD(),(DataDrivenTest["Expense Sub Type"]));
                await this.appIndep.waitAndSelectOption(await this.getVendorNameDD(),(DataDrivenTest["Vendor Name"]));
                await this.appIndep.waitAndSelectOption(await this.getPlaceOfSupplyDD(),(DataDrivenTest["Place of Supply"]));
                await this.appIndep.waitAndFill(await this.getScopeOfWorkTxtf(), DataDrivenTest["Scope of Work"]);
                await this.appIndep.waitAndFill(await this.getContactNameTxtf(), DataDrivenTest["Contact Name"]);
                await (await this.getFromDate()).click();
                await this.page.waitForTimeout(this.waitForTimeout);
                await this.page.keyboard.press("Enter");
                await this.page.waitForTimeout(this.waitForTimeout);
                await (await this.getToDate()).click();
                await this.page.waitForTimeout(this.waitForTimeout);
                await this.page.keyboard.press("Enter");
                await this.page.waitForTimeout(this.waitForTimeout);
                
                // ---------------- Work Order Item started----------------
                await this.getAddDetailsLink();
                await this.getAddRowLink();
                await this.appIndep.waitAndFill(await this.getItemTxtf(), DataDrivenTest.Item);
                await this.appIndep.waitAndFill(await this.getItemDescriptionTxtf(), DataDrivenTest["Item Description"]);
                await this.appIndep.waitAndSelectOption(await this.getUnitsDD(), DataDrivenTest.Units);
                await this.appIndep.waitAndFill(await this.getRateTxtf(), DataDrivenTest.Rate);
                await this.appIndep.waitAndFill(await this.getQuantityTxtf(), DataDrivenTest.Quantity);
                await this.appIndep.waitAndSelectOption(await this.getDiscountTypeDD(), DataDrivenTest["Discount Type"]);
                await this.appIndep.waitAndFill(await this.getDiscountValueTxtf(), DataDrivenTest["Discount Value"]);
                await this.getWObtnItem();
                // ---------------- Work Order Item ended----------------
                
                await this.appIndep.waitAndFill(await this.getWorkOrderDescriptionTxtf(), DataDrivenTest["Work Order Description"]);

                //----------------Addition Tax started----------------
                //1st tax
                await this.getTaxAddRowLink();
                await this.appIndep.waitAndSelectOption(await this.getAdditionTaxDD_01(), DataDrivenTest.addTax_1);
                await this.appIndep.waitAndSelectOption(await this.getTaxTypeDD_01(), DataDrivenTest["Tax Type"]);
                await this.appIndep.waitAndFill(await this.getPercOfWOTxtf_01(), DataDrivenTest["% Of Work Order Value"]);
                //1st tax
                await this.getTaxAddRowLink();
                await this.appIndep.waitAndSelectOption(await this.getAdditionTaxDD_02(), DataDrivenTest.addTax_2);
                await this.appIndep.waitAndSelectOption(await this.getTaxTypeDD_02(), DataDrivenTest["Tax Type"]);
                await this.appIndep.waitAndFill(await this.getPercOfWOTxtf_02(), DataDrivenTest["% Of Work Order Value"]);
                //----------------Addition Tax ended----------------

                await this.appIndep.waitAndSelectOption(await this.getTypeOfAdvanceDD(), DataDrivenTest["Type of Advance"]);
                await this.appIndep.waitAndFill(await this.getAdvancePercentageTxtf(), DataDrivenTest["Advance Percentage(%)"]);

                //----------------Deduction Tax started----------------
                await this.getTaxDedRowLink();
                await this.appIndep.waitAndSelectOption(await this.getDeductionTaxDD(), DataDrivenTest.dedTax);
                //----------------Deduction Tax ended------------------

                await this.appIndep.waitAndSelectOption(await this.getStatusDD(), "SUBMITTED");
                await this.appIndep.waitAndFill(await this.getRemarksTxtf(), DataDrivenTest["WorkOrder Remarks"]);
                
                // ---------------- Terms & Conditions ----------------
                await this.getTermAndConLink(); 
                const AllTC=this.TermAndConditionPopup?.locator("//table[@class='in4-table']//input[contains(@type, 'checkbox')]");
                await AllTC?.nth(4).check();
/*Expect*/      await expect(AllTC?.nth(4)!).toBeChecked();
                await this.getTermAndConAcceptBtn();
                await this.appIndep.waitAndFill(await this.getTermAndConTxtf(), DataDrivenTest["Terms And Conditions Remarks"]);
                
                // ---------------- Documents ----------------
                await this.getDocumentsAddLink();
                await this.getUploadDocumentLink();
                await this.getChoseFile()?.setInputFiles("configuration/testData/Documents/Expense Payment TestCases.xlsx");
                await this.getUploadBtn();
                await this.page.waitForTimeout(1000);
                await this.appIndep.waitAndFill(await this.getDocumentsRemarksTxtf(), DataDrivenTest["Documents Remarks"]);

                //Work Order List
                if(await(await this.getWoSubBtn()).isVisible() && await(await this.getWoSubBtn()).isEnabled()){
/*Expect*/          await expect(await this.getWoSubBtn()).toBeVisible();
                    await this.appIndep.waitAndButtonClick(await this.getWoSubBtn());
                    const WorkOrderListNo=(await this.appDep.RightFrame()).locator("//td[@align='left']//a[contains(@id, 'dgWorkOrder_ctl')]");
                            const allWorkOrderListInnerText= (await WorkOrderListNo.first().innerText()).trim();
                            if(allWorkOrderListInnerText !==""){
                                WorkOrderList=allWorkOrderListInnerText;
                            }
                }

                //Work Order Approvals List
                await this.appIndep.waitAndMenuClick(await this.getApprovals());
                await this.appIndep.waitAndMenuClick(await this.getWorkOrderApproval());
                const WorkOrderApprovalsListNo=(await this.appDep.RightFrame()).locator("//td[@align='left']//a[contains(@id, 'dgWorkOrder_ctl')]");
                for(let j=0; j< await WorkOrderApprovalsListNo.count(); j++){
                    let allWorkOrderApprovalsListInnerText=(await WorkOrderApprovalsListNo.nth(j).innerText()).trim();
                    if(WorkOrderList == allWorkOrderApprovalsListInnerText){
                            await WorkOrderApprovalsListNo.nth(j).click();
                            break;
                    }  
                }
                const GrossAmount=await (await this.appDep.RightFrame()).locator("#lblGrossAmount").innerText();
/*Expect*/      await expect((await this.appDep.RightFrame()).locator("#lblContact")).toContainText(DataDrivenTest["Contact Name"]);
/*Expect*/      await expect((await this.appDep.RightFrame()).locator("#gvDocumentsView_ctl02_lnkBtnUploadFile")).toBeAttached();
/*Expect*/      await expect(await this.getAppStatusDD()).toBeVisible();
                await this.page.waitForTimeout(this.waitForTimeout);
                if(await (await this.getAppStatusDD()).isVisible() && await (await this.getAppStatusDD()).isEnabled()){
                await this.appIndep.waitAndSelectOption(await this.getAppStatusDD(), "APPROVED");
                }
/*Expect*/      await expect(await this.getAppWoUpdateBtn()).toBeVisible();
                await this.page.waitForTimeout(this.waitForTimeout);
                if(await (await this.getAppWoUpdateBtn()).isVisible() && await (await this.getAppWoUpdateBtn()).isEnabled()){
                await this.appIndep.waitAndButtonClick(await this.getAppWoUpdateBtn());
                await this.page.waitForTimeout(this.waitForTimeout);
                }
                console.log(`Expenses ${WorkOrderList} Work order Approved with INR ${GrossAmount}`);
            }
            catch(error){
                console.error(`Work Order creation failed for Company: ${DataDrivenTest.Company}`);
                    if (error instanceof Error) {
                        console.error(`Error: ${error.message}`);
                    }
                throw error;    
            }
            //---------------------------------Work Order Test Ended-------------------------------

            //---------------------------------Payment Test Started--------------------------------
            try{
                //Expenses Part
                await this.appIndep.waitAndMenuClick(await this.getPayments());
                await this.appIndep.waitAndMenuClick(await this.getPayment());
/*Expect*/      await expect(await this.getCreatePaymentBtn()).toBeVisible();
                await this.appIndep.waitAndButtonClick(await this.getCreatePaymentBtn());
                await this.appIndep.waitAndSelectOption(await this.getPaymentCompanyDD(), DataDrivenTest.Company);
                await this.appIndep.waitAndSelectOption(await this.getPaymentExpenseTypeDD(), DataDrivenTest["Expense Type"]);
                await this.appIndep.waitAndSelectOption(await this.getPaymentExpenseSubTypeDD(), DataDrivenTest["Expense Sub Type"]);
                await this.appIndep.waitAndButtonClick(await this.getPaymentGoBtn());
                await this.appIndep.waitAndFill(await this.getAmountTxtf(), DataDrivenTest.Amount);
                await this.appIndep.waitAndSelectOption(await this.getPaymentVendorDD(), DataDrivenTest["Vendor Name"]);
                if(WorkOrderList !==null && await (await this.getPaymentWorkOrderDD()).isVisible() && await (await this.getPaymentWorkOrderDD()).isEnabled()){
                    await this.appIndep.waitAndSelectOption(await this.getPaymentWorkOrderDD(), WorkOrderList);
                }
                await this.appIndep.waitAndFill(await this.getInvoiceAmountTxtf(), DataDrivenTest["Invoice Amount"]);
                await (await this.getInvoiceNumberTxtf()).type(DataDrivenTest["Invoice Number"]+Math.floor(Math.random() * 10000000));
                await (await this.getInvoiceDatePicker()).click();
                await this.page.waitForTimeout(this.waitForTimeout);
                await this.page.keyboard.press("Enter");
                await this.page.waitForTimeout(this.waitForTimeout);
                await this.appIndep.waitAndSelectOption(await this.getModeOfPaymentDD(), DataDrivenTest["Mode Of Payment"]);
                await (await this.getPaymentDueDateDatePicker()).click();
                await this.page.waitForTimeout(this.waitForTimeout);
                await this.page.keyboard.press("Enter");
                await this.page.waitForTimeout(this.waitForTimeout);
                await this.appIndep.waitAndSelectOption(await this.getPaymentStatusDD(), "SUBMITTED");
                await (await this.getSACHSNTxtf()).type(DataDrivenTest["SAC/HSN Codes"]+Math.floor(Math.random() * 10000000));
                await this.appIndep.waitAndFill(await this.getPaymentRemarksTxtf(), DataDrivenTest["Payment Remarks"]);

                // ---------------- Documents ----------------
                await this.getPayDocumentsAddLink();
                await this.getPayUploadDocumentLink();
                await this.getPayChoseFile()?.setInputFiles("configuration/testData/Documents/Expense TC.xlsx");
                await this.getPayUploadBtn();
                await this.page.waitForTimeout(1000);
                await (await this.getDocCommentsTxtf()).fill(DataDrivenTest["Payment Documents Remarks"]);

                this.page.on("dialog",(paymnetCreateAlert)=>{paymnetCreateAlert.accept()});
/*Expect*/      await expect(await this.getPaymentSubmitBtn()).toBeVisible();
                if(await (await this.getPaymentSubmitBtn()).isVisible() && await (await this.getPaymentSubmitBtn()).isEnabled()){
                await this.appIndep.waitAndButtonClick(await this.getPaymentSubmitBtn());
                }
                const RequestID = await (await this.appDep.RightFrame()).locator("#lblExpReqId").innerText();

                //Finance Part
                await this.appIndep.waitAndMenuClick(await this.getFinance());
                await this.appIndep.waitAndMenuClick(await this.getFinExpense());
                await this.appIndep.waitAndMenuClick(await this.getFinPayment());
                await this.appIndep.waitAndSelectOption(await this.getFinanceCompanyDD(), DataDrivenTest.Company);
                await this.appIndep.waitAndSelectOption(await this.getFinanceStatusDD(), "--All--");
                await this.appIndep.waitAndFill(await this.getFinExpNoTxtf(), RequestID);
                await this.appIndep.waitAndButtonClick(await this.getFinanceGoBtn());
                await this.appIndep.waitAndButtonClick(await this.getFinExpNoLink());

/*Expect*/      await expect((await this.appDep.FinancePaymentDetailsFrame()).locator("#gvDocuments_ctl02_LinkButton1")).toBeAttached()
/*Expect*/      await expect((await this.appDep.FinancePaymentDetailsFrame()).locator("#lnkVendorlink")).toContainText(DataDrivenTest["Vendor Name"]);
     
                await this.appIndep.waitAndSelectOption(await this.getStatusSelectionDD(), "APPROVED");
                await this.appIndep.waitAndFill(await this.getFinApproverRemarksTxtf(), "Payment Approved");
                await this.appIndep.waitAndButtonClick(await this.getFinanceUpdateBtn());
                
                await this.appIndep.waitAndSelectOption(await this.getStatusSelectionDD(), "PROCESSED");
                await this.appIndep.waitAndFill(await this.getFinApproverRemarksTxtf(), "Payment Processed");
                await (await this.getProcessedDatePicker()).click();
                await this.page.waitForTimeout(this.waitForTimeout);
                await this.page.keyboard.press("Enter");
                await this.page.waitForTimeout(this.waitForTimeout);
                await this.appIndep.waitAndButtonClick(await this.getFinanceUpdateBtn());
                await this.page.waitForTimeout(this.waitForTimeout);
                const AmountPayable = await (await this.appDep.FinancePaymentDetailsFrame()).locator("#lblAmountPayable").innerText();
                console.log(`Expenses ${RequestID} Payment Paid with INR ${AmountPayable} from ${WorkOrderList} Work Order`);
/*Expect*/      expect(await (await this.appDep.FinancePaymentDetailsFrame()).locator("#aBank").innerText()).toContain("Make Bank Payment");

                //Bank Payment Details
                /*await this.getMakeBankPaymentLink();
                this.page.on("dialog",(BankAccountAlert)=>{ BankAccountAlert.accept();});
                await this.getBankAccountDD()?.selectOption(DataDrivenTest["Bank Account"]);
                await this.getInstrumentNoTxtf()?.type(DataDrivenTest["Instrument No"]+Math.floor(Math.random() * 10000000));
                this.page.on("dialog", (submitAlert)=>{submitAlert.accept();});
                if(this.getMakeBankPaymentSubmitBtn()?.isVisible){
                await this.page.waitForTimeout(2000);
                await this.getMakeBankPaymentSubmitBtn()?.click();
                await this.page.waitForTimeout(10000);}
                const AmountPayable = await (await this.appDep.RightFrame()).locator("#lblAmountPayable").innerText();
                console.log(`Expenses ${RequestID} Payment Paid with INR ${AmountPayable} from ${WorkOrderList}`);*/
            }

            catch(error){
                console.error(`Payment creation failed for Company: ${DataDrivenTest.Company}`);
                    if (error instanceof Error) {
                        console.error(`Error: ${error.message}`);
                    }
                throw error;    
            }
            //-------------------------------Payment Test Ended--------------------------------
        } 
    }
}