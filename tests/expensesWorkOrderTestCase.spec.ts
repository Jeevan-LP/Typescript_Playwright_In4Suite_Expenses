import { test } from "../fixtures/baseClass";
import { ExpensesWorkOrderFlow_Object } from "../pages/expensesWorkOrderFlowObject";

test("Expenses Testcase", async({page})=>{

    const expenseWorkOrderFlow = new ExpensesWorkOrderFlow_Object(page);
        
    await expenseWorkOrderFlow.ExpenseWorkOrderFlowTest();

});