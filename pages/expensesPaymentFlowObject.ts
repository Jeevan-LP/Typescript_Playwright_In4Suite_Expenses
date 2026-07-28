import { expect, Locator, Page } from "@playwright/test";
import { AppDependent } from "../utilities/appDependent.spec";
import { AppIndependent } from "../utilities/appIndependent.spec"
import expensePaymentDriven from "../configuration/testData/expensePaymentDriven.json";

export class ExpensesPaymentFlow_Object{

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

    async getPayments() {
        const payments = (await this.appDep.MiddleFrame()).locator("//table[@class='newNavbar']//a[text()='Payments ' and @id='defTab']");
        return payments;
    }

    async getPayment() {
        const payment = (await this.appDep.MiddleFrame()).locator("//a[contains(@href,'ExpUsersExpenseList.aspx') and normalize-space()='Payment']");
        return payment;
    }

    // Application Finance Menu
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

    async ExpensePaymentFlowTest(){

    for(let PaymentDataDrivenTest of expensePaymentDriven){
        //---------------------------------Payment Test Started--------------------------------
        try{
            //Expenses Part
            await this.appIndep.waitAndMenuClick(await this.getExpenses());
            await this.appIndep.waitAndMenuClick(await this.getPayments());
            await this.appIndep.waitAndMenuClick(await this.getPayment());
            await this.appIndep.waitAndButtonClick(await this.getCreatePaymentBtn());

            await this.appIndep.waitAndSelectOption(await this.getPaymentCompanyDD(), PaymentDataDrivenTest.Company);
            await this.appIndep.waitAndSelectOption(await this.getPaymentExpenseTypeDD(), PaymentDataDrivenTest["Expense Type"]);
            await this.appIndep.waitAndSelectOption(await this.getPaymentExpenseSubTypeDD(), PaymentDataDrivenTest["Expense Sub Type"]);
            await this.appIndep.waitAndButtonClick(await this.getPaymentGoBtn());
            await this.appIndep.waitAndFill(await this.getAmountTxtf(), PaymentDataDrivenTest.Amount);
            await this.appIndep.waitAndSelectOption(await this.getPaymentVendorDD(), PaymentDataDrivenTest["Vendor Name"]);
            
            await (await this.getPaymentWorkOrderDD()).selectOption(
            { index: (await (await this.getPaymentWorkOrderDD()).locator("option").count()) - 1 });
            
            await this.page.waitForTimeout(1500);
            await this.appIndep.waitAndFill(await this.getInvoiceAmountTxtf(), PaymentDataDrivenTest["Invoice Amount"]);
            await (await this.getInvoiceNumberTxtf()).type(PaymentDataDrivenTest["Invoice Number"]+Math.floor(Math.random() * 10000000));
            await (await this.getInvoiceDatePicker()).click();
            await this.page.waitForTimeout(this.waitForTimeout);
            await this.page.keyboard.press("Enter");
            await this.page.waitForTimeout(this.waitForTimeout);
            await this.appIndep.waitAndSelectOption(await this.getModeOfPaymentDD(), PaymentDataDrivenTest["Mode Of Payment"]);
            await (await this.getPaymentDueDateDatePicker()).click();
            await this.page.waitForTimeout(this.waitForTimeout);
            await this.page.keyboard.press("Enter");
            await this.page.waitForTimeout(this.waitForTimeout);
            await this.appIndep.waitAndSelectOption(await this.getPaymentStatusDD(), "SUBMITTED");
            await (await this.getSACHSNTxtf()).type(PaymentDataDrivenTest["SAC/HSN Codes"]+Math.floor(Math.random() * 10000000));
            await this.appIndep.waitAndFill(await this.getPaymentRemarksTxtf(), PaymentDataDrivenTest["Payment Remarks"]);

            // ---------------- Documents ----------------
            await this.getPayDocumentsAddLink();
            await this.getPayUploadDocumentLink();
            await this.getPayChoseFile()?.setInputFiles("configuration/testData/Documents/Expense TC.xlsx");
            await this.getPayUploadBtn();
            await this.page.waitForTimeout(1000);
            await (await this.getDocCommentsTxtf()).fill(PaymentDataDrivenTest["Payment Documents Remarks"]);

            this.page.on("dialog",(paymnetCreateAlert)=>{paymnetCreateAlert.accept()});
            if(await (await this.getPaymentSubmitBtn()).isVisible() && await (await this.getPaymentSubmitBtn()).isEnabled()){
                await this.appIndep.waitAndButtonClick(await this.getPaymentSubmitBtn());
            }
            const RequestID = await (await this.appDep.RightFrame()).locator("#lblExpReqId").innerText();

            //Finance Part
            await this.appIndep.waitAndMenuClick(await this.getFinance());
            await this.appIndep.waitAndMenuClick(await this.getFinExpense());
            await this.appIndep.waitAndMenuClick(await this.getFinPayment());
            await this.appIndep.waitAndSelectOption(await this.getFinanceCompanyDD(), PaymentDataDrivenTest.Company);
            await this.appIndep.waitAndSelectOption(await this.getFinanceStatusDD(), "--All--");
            await this.appIndep.waitAndFill(await this.getFinExpNoTxtf(), RequestID);
            await this.appIndep.waitAndButtonClick(await this.getFinanceGoBtn());
            await this.appIndep.waitAndButtonClick(await this.getFinExpNoLink());

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
            const WorkOrderList=await (await this.appDep.FinancePaymentDetailsFrame()).locator("#lnkWorkOrder").innerText();
            const AmountPayable = await (await this.appDep.FinancePaymentDetailsFrame()).locator("#lblAmountPayable").innerText();
            console.log(`Expenses ${RequestID} Payment Paid with INR ${AmountPayable} from ${WorkOrderList} Work Order`);
            await this.page.waitForTimeout(this.waitForTimeout);

            //Bank Payment Details
            /*await this.getMakeBankPaymentLink();
            this.page.on("dialog",(BankAccountAlert)=>{ BankAccountAlert.accept();});
            await this.getBankAccountDD()?.selectOption(PaymentDataDrivenTest["Bank Account"]);
            await this.getInstrumentNoTxtf()?.type(PaymentDataDrivenTest["Instrument No"]+Math.floor(Math.random() * 10000000));
            this.page.on("dialog", (submitAlert)=>{submitAlert.accept();});
            if(this.getMakeBankPaymentSubmitBtn()?.isVisible){
                await this.page.waitForTimeout(2000);
                await this.getMakeBankPaymentSubmitBtn()?.click();
                await this.page.waitForTimeout(10000);
            }
            const WorkOrderList=(await this.appDep.FinancePaymentDetailsFrame()).locator("#lnkWorkOrder").innerText();
            const AmountPayable = await (await this.appDep.RightFrame()).locator("#lblAmountPayable").innerText();
            console.log(`Expenses ${RequestID} Payment Paid with INR ${AmountPayable} from {WorkOrderList}`);*/

        }

        catch(error){
            console.error(`Payment creation failed for Company: ${PaymentDataDrivenTest.Company}`);
            //console.log((error as Error).message);
            //console.log("Cause: ",(error as Error).cause);
            //console.log("Name: ",(error as Error).name);
            //console.log("Stack: ",(error as Error).stack);
            if (error instanceof Error) {
                console.error(`Error: ${error.message}`);
            }
            throw error;    
        }
        //-------------------------------Payment Test Ended--------------------------------
    } 
}
}