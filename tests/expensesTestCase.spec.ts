import { test } from "../fixtures/baseClass";
import { ExpensesWorkOrderFlow_Object } from "../pages/expensesWorkOrderFlowObject";
import { ExpensesPaymentFlow_Object } from "../pages/expensesPaymentFlowObject";

/* test.describe("Expenses Test Cases", async()=>{

        test("Expenses Work Order", {tag:"@WorkOrder"},async({page})=>{

            const expenseWorkOrderFlow = new ExpensesWorkOrderFlow_Object(page);
                
            await expenseWorkOrderFlow.ExpenseWorkOrderFlowTest();

        });

        test("Expenses Payment", {tag:"@Payment"},async({page})=>{

            const expensePaymentFlow = new ExpensesPaymentFlow_Object(page);
            
            await expensePaymentFlow.ExpensePaymentFlowTest();

        });

});*/
   test("Expenses Work Order", async({page})=>{

                const expenseWorkOrderFlow = new ExpensesWorkOrderFlow_Object(page);
                    
                await expenseWorkOrderFlow.ExpenseWorkOrderFlowTest();

    });

    test("Expenses Payment", async({page})=>{

            const expensePaymentFlow = new ExpensesPaymentFlow_Object(page);
            
            await expensePaymentFlow.ExpensePaymentFlowTest();

    });