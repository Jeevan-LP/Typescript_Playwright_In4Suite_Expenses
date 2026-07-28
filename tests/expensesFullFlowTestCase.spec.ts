import { test } from "../fixtures/baseClass";
import { ExpensesFullFlow_Object } from "../pages/expensesFullFlowObject";

test("In4Suite Expenses Full Flow Testcases", async({page})=>{

    const expenseFlow = new ExpensesFullFlow_Object(page);

    await expenseFlow.ExpenseFlowTest();

});