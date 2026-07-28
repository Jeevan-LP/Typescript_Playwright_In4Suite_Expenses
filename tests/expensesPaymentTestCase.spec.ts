import { test } from "../fixtures/baseClass";
import { ExpensesPaymentFlow_Object } from "../pages/expensesPaymentFlowObject";

test("Expenses Testcase", async({page})=>{

    const expensePaymentFlow = new ExpensesPaymentFlow_Object(page);
    
    await expensePaymentFlow.ExpensePaymentFlowTest();

});  