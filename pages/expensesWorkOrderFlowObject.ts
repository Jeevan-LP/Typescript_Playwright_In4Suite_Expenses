import { expect, Locator, Page } from "@playwright/test";
import { AppDependent } from "../utilities/appDependent.spec";
import { AppIndependent } from "../utilities/appIndependent.spec"
import expenseWorkOrderDriven from "../configuration/testData/expenseWorkOrderDriven.json";

export class ExpensesWorkOrderFlow_Object{

    private page:Page;
    private appDep:AppDependent;
    private appIndep:AppIndependent;
    private waitForTimeout:number=3000;

    constructor(page:Page){
        this.page = page;
        this.appDep = new AppDependent(page);
        this.appIndep = new AppIndependent(page);
    }

    //---------------------------------Work Order Page Object Started-----------------------------
    //Application expenses menu's
    async getExpenses() {
        const expenses = (await this.appDep.LeftFrame()).locator("//span[text()='Expenses']");
        return expenses;
    }

    async getWorkOrder() {
        const workOrder = (await this.appDep.MiddleFrame()).locator("//a[text()='Work Order ']");
        return workOrder;
    }
    
    async getApprovals() {
        const approvals = (await this.appDep.MiddleFrame()).locator("//a[text()='Approvals ']");
        return approvals;
    }

    async getWorkOrderApproval() {
        const workOrderApproval = (await this.appDep.MiddleFrame()).locator("//a[text()='Work Order']");
        return workOrderApproval;
    }

    // Application Finance Menu
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
		 return (await this.appDep.RightFrame()).locator("#ddlStatus");
	}
	
    async getAppWoUpdateBtn() {
        const appWoSubBtn = (await this.appDep.RightFrame()).locator("#btnCreate");
        return appWoSubBtn;
    }
    //---------------------------------Work Order Page Object Ended-----------------------------

    async ExpenseWorkOrderFlowTest(){

        for(let WorkOrderDataDrivenTest of expenseWorkOrderDriven){

            //---------------------------------Work Order Test Started-----------------------------
            let WorkOrderList:string | null=null;// due to try and catch block we declared WorkOrderList variable here to access in payment
            try{
                await this.page.waitForTimeout(this.waitForTimeout);
                await this.appIndep.waitAndMenuClick(await this.getExpenses());
                await this.appIndep.waitAndMenuClick(await this.getWorkOrder());
                await this.appIndep.waitAndMenuClick(await this.WObtnCreate());
                await this.appIndep.waitAndSelectOption(await this.getCompanyDD(), WorkOrderDataDrivenTest.Company);
                await this.appIndep.waitAndSelectOption(await this.getWorkOrderTypeDD(), WorkOrderDataDrivenTest["Work Order Type"]);
                await this.appIndep.waitAndSelectOption(await this.getExpenseTypeDD(), WorkOrderDataDrivenTest["Expense Type"]);
                await this.appIndep.waitAndSelectOption(await this.getExpenseSubTypeDD(), WorkOrderDataDrivenTest["Expense Sub Type"]);
                await this.appIndep.waitAndSelectOption(await this.getVendorNameDD(), WorkOrderDataDrivenTest["Vendor Name"]);
                await this.appIndep.waitAndSelectOption(await this.getPlaceOfSupplyDD(), WorkOrderDataDrivenTest["Place of Supply"]);
                await this.appIndep.waitAndFill(await this.getScopeOfWorkTxtf(), WorkOrderDataDrivenTest["Scope of Work"]);
                await this.appIndep.waitAndFill(await this.getContactNameTxtf(), WorkOrderDataDrivenTest["Contact Name"]);
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
                await this.appIndep.waitAndFill(await this.getItemTxtf(), WorkOrderDataDrivenTest.Item);
                await this.appIndep.waitAndFill(await this.getItemDescriptionTxtf(), WorkOrderDataDrivenTest["Item Description"]);
                await this.appIndep.waitAndSelectOption(await this.getUnitsDD(), WorkOrderDataDrivenTest.Units);
                await this.appIndep.waitAndFill(await this.getRateTxtf(), WorkOrderDataDrivenTest.Rate);
                await this.appIndep.waitAndFill(await this.getQuantityTxtf(), WorkOrderDataDrivenTest.Quantity);
                await this.appIndep.waitAndSelectOption(await this.getDiscountTypeDD(), WorkOrderDataDrivenTest["Discount Type"]);
                await this.appIndep.waitAndFill(await this.getDiscountValueTxtf(), WorkOrderDataDrivenTest["Discount Value"]);
                await this.getWObtnItem();
                // ---------------- Work Order Item ended----------------
                
                await this.appIndep.waitAndFill(await this.getWorkOrderDescriptionTxtf(), WorkOrderDataDrivenTest["Work Order Description"]);

                //----------------Addition Tax started----------------
                //1st tax
                await this.getTaxAddRowLink();
                await this.appIndep.waitAndSelectOption(await this.getAdditionTaxDD_01(), WorkOrderDataDrivenTest.addTax_1);
                await this.appIndep.waitAndSelectOption(await this.getTaxTypeDD_01(), WorkOrderDataDrivenTest["Tax Type"]);
                await this.appIndep.waitAndFill(await this.getPercOfWOTxtf_01(), WorkOrderDataDrivenTest["% Of Work Order Value"]);
                //2nd tax
                await this.getTaxAddRowLink();
                await this.appIndep.waitAndSelectOption(await this.getAdditionTaxDD_02(), WorkOrderDataDrivenTest.addTax_2);
                await this.appIndep.waitAndSelectOption(await this.getTaxTypeDD_02(), WorkOrderDataDrivenTest["Tax Type"]);
                await this.appIndep.waitAndFill(await this.getPercOfWOTxtf_02(), WorkOrderDataDrivenTest["% Of Work Order Value"]);
                //----------------Addition Tax ended----------------

                await this.appIndep.waitAndSelectOption(await this.getTypeOfAdvanceDD(), WorkOrderDataDrivenTest["Type of Advance"]);
                await this.appIndep.waitAndFill(await this.getAdvancePercentageTxtf(), WorkOrderDataDrivenTest["Advance Percentage(%)"]);

                //----------------Deduction Tax started----------------
                await this.getTaxDedRowLink();
                await this.appIndep.waitAndSelectOption(await this.getDeductionTaxDD(), WorkOrderDataDrivenTest.dedTax);
                //----------------Deduction Tax ended----------------

                await this.appIndep.waitAndSelectOption(await this.getStatusDD(), "SUBMITTED");
                await this.appIndep.waitAndFill(await this.getRemarksTxtf(), WorkOrderDataDrivenTest["WorkOrder Remarks"]);
                
                // ---------------- Terms & Conditions ----------------
                await this.getTermAndConLink(); 
                const AllTC = this.TermAndConditionPopup?.locator("//table[@class='in4-table']//input[contains(@type, 'checkbox')]");
                await AllTC?.nth(4).check();
                await this.getTermAndConAcceptBtn();
                await this.appIndep.waitAndFill(await this.getTermAndConTxtf(), WorkOrderDataDrivenTest["Terms And Conditions Remarks"]);
                
                // ---------------- Documents ----------------
                await this.getDocumentsAddLink();
                await this.getUploadDocumentLink();
                await this.getChoseFile()?.setInputFiles("configuration/testData/Documents/Expense Payment TestCases.xlsx");
                await this.getUploadBtn();
                await this.page.waitForTimeout(1000);
                await this.appIndep.waitAndFill(await this.getDocumentsRemarksTxtf(), WorkOrderDataDrivenTest["Documents Remarks"]);

                //Work Order List
                if(await (await this.getWoSubBtn()).isVisible() && await (await this.getWoSubBtn()).isEnabled()){
                    await this.appIndep.waitAndButtonClick(await this.getWoSubBtn());
                    const WorkOrderListNo = (await this.appDep.RightFrame()).locator("//td[@align='left']//a[contains(@id, 'dgWorkOrder_ctl')]");
                    const allWorkOrderListInnerText = (await WorkOrderListNo.first().innerText()).trim();
                    if(allWorkOrderListInnerText !== ""){
                        WorkOrderList = allWorkOrderListInnerText;
                    }
                }

                //Work Order Approvals List
                await this.appIndep.waitAndMenuClick(await this.getApprovals());
                await this.appIndep.waitAndMenuClick(await this.getWorkOrderApproval());
                const WorkOrderApprovalsListNo = (await this.appDep.RightFrame()).locator("//td[@align='left']//a[contains(@id, 'dgWorkOrder_ctl')]");
                for(let j = 0; j < await WorkOrderApprovalsListNo.count(); j++){
                    let allWorkOrderApprovalsListInnerText = (await WorkOrderApprovalsListNo.nth(j).innerText()).trim();
                    if(WorkOrderList == allWorkOrderApprovalsListInnerText){
                        await WorkOrderApprovalsListNo.nth(j).click();
                        break;
                    }
                }

                const GrossAmount = await (await this.appDep.RightFrame()).locator("#lblGrossAmount").innerText();
                await this.page.waitForTimeout(this.waitForTimeout);
                if(await (await this.getAppStatusDD()).isVisible() && await (await this.getAppStatusDD()).isEnabled()){
                    await this.appIndep.waitAndSelectOption(await this.getAppStatusDD(), "APPROVED");
                }

                await this.page.waitForTimeout(this.waitForTimeout);
                if(await (await this.getAppWoUpdateBtn()).isVisible() && await (await this.getAppWoUpdateBtn()).isEnabled()){
                    await this.appIndep.waitAndButtonClick(await this.getAppWoUpdateBtn());
                    await this.page.waitForTimeout(this.waitForTimeout);
                }

                console.log(`Expenses ${WorkOrderList} Work order Approved with INR ${GrossAmount}`);
            }
            catch(error){
                console.error(`Work Order creation failed for Company: ${WorkOrderDataDrivenTest.Company}`);

                if (error instanceof Error) {
                    console.error(`Error: ${error.message}`);
                }

                throw error;
            }
        }
    }
}