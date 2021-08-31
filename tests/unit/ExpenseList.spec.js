import { mount } from "@vue/test-utils";
import ExpenseList from "@/components/ExpenseList.vue";

describe("Accounts.vue", () => {
  it("It should render the total sum of the array expenses", () => {
    const wrapper = mount(ExpenseList);
    const totalExpenses = wrapper.find('span[test-id="total-sum"]').text();
    expect(totalExpenses).toBe("$325");
  });

  it("If user adds new Expense, it should be added a new expense to the array", async () => {
    const wrapper = mount(ExpenseList);

    await wrapper
      .find('button[test-id="open-add-expense-button"]')
      .trigger("click");

    const inputName = wrapper.find('input[test-id="name-expense-input"]');
    inputName.setValue("New Expense");

    const inputAmount = wrapper.find('input[test-id="amount-expense-input"]');
    inputAmount.setValue("1000");

    await wrapper.find('button[test-id="save-expense"]').trigger("click");

    const nameExpenses = wrapper.findAll('span[test-id="expense-name-span"]');
    const amountExpenses = wrapper.findAll(
      'span[test-id="expense-name-amount"]'
    );

    expect(nameExpenses.length).toBe(4);
    expect(amountExpenses.length).toBe(4);

    expect(nameExpenses[3].text()).toBe("New Expense");
    expect(amountExpenses[3].text()).toBe("$1000");
  });

  it("If user adds an empty expense, it should prompt a error message for blank field", async () => {
    const wrapper = mount(ExpenseList);

    await wrapper
      .find('button[test-id="open-add-expense-button"]')
      .trigger("click");

    const inputName = wrapper.find('input[test-id="name-expense-input"]');
    inputName.setValue("    ");

    const inputAmount = wrapper.find('input[test-id="amount-expense-input"]');
    inputAmount.setValue("1000");

    await wrapper.find('button[test-id="save-expense"]').trigger("click");

    const errorMessage = wrapper
      .find('span[test-id="expense-name-error-label"]')
      .text();

    expect(errorMessage).toBe("Please insert a name for this expense");
  });

  it("If user adds an empty amount, it should prompt a error message for blank field", async () => {
    const wrapper = mount(ExpenseList);

    await wrapper
      .find('button[test-id="open-add-expense-button"]')
      .trigger("click");

    const inputName = wrapper.find('input[test-id="name-expense-input"]');
    inputName.setValue("    ");

    const inputAmount = wrapper.find('input[test-id="amount-expense-input"]');
    inputAmount.setValue("   ");

    await wrapper.find('button[test-id="save-expense"]').trigger("click");

    const errorMessage = wrapper
      .find('span[test-id="expense-amount-error-label"]')
      .text();

    expect(errorMessage).toBe("Please insert an amount for this expense");
  });

  it("If user adds an negative or zero amount, it should prompt a error message for non-positive number", async () => {
    const wrapper = mount(ExpenseList);

    await wrapper
      .find('button[test-id="open-add-expense-button"]')
      .trigger("click");

    const inputName = wrapper.find('input[test-id="name-expense-input"]');
    inputName.setValue("    ");

    const inputAmount = wrapper.find('input[test-id="amount-expense-input"]');
    inputAmount.setValue("-100");

    await wrapper.find('button[test-id="save-expense"]').trigger("click");

    const errorMessage = wrapper
      .find('span[test-id="expense-amount-error-label"]')
      .text();

    expect(errorMessage).toBe("Please insert positive number for the amount");
  });

  it("Is user clicks on expense, inputs should have data from expense and edit it", async () => {
    const wrapper = mount(ExpenseList);

    const expensesRow = wrapper.findAll('div[test-id="expense-row"]');

    await expensesRow[1].trigger("click");

    const inputName = wrapper.find('input[test-id="name-expense-input"]');
    const inputAmount = wrapper.find('input[test-id="amount-expense-input"]');

    expect(inputName.element.value).toBe("Expense 2");
    expect(inputAmount.element.value).toBe("150");

    inputName.setValue("Edited Expense");

    await wrapper.find('button[test-id="save-expense"]').trigger("click");

    const nameExpenses = wrapper.findAll('span[test-id="expense-name-span"]');
    const amountExpenses = wrapper.findAll(
      'span[test-id="expense-name-amount"]'
    );

    expect(nameExpenses[1].text()).toBe("Edited Expense");
    expect(amountExpenses[1].text()).toBe("$150");
  });

  it("Is user clicks on delete expense, inputs should remove expense from list", async () => {
    const wrapper = mount(ExpenseList);

    const expensesRow = wrapper.findAll('div[test-id="expense-row"]');

    await expensesRow[1].trigger("click");

    await wrapper.find('button[test-id="remove-expense"]').trigger("click");

    const nameExpenses = wrapper.findAll('span[test-id="expense-name-span"]');
    const amountExpenses = wrapper.findAll(
      'span[test-id="expense-name-amount"]'
    );

    expect(nameExpenses.length).toBe(2);
    expect(amountExpenses.length).toBe(2);
  });

  it("If user makes a modification, a new list of expeses should be emmitted", async () => {
    const wrapper = mount(ExpenseList);

    await wrapper
      .find('button[test-id="open-add-expense-button"]')
      .trigger("click");

    const inputName = wrapper.find('input[test-id="name-expense-input"]');
    inputName.setValue("New Expense");

    const inputAmount = wrapper.find('input[test-id="amount-expense-input"]');
    inputAmount.setValue("1000");

    await wrapper.find('button[test-id="save-expense"]').trigger("click");

    const updateExpenseCalls = wrapper.emitted("updateExpenses");
    expect(updateExpenseCalls).toHaveLength(2);

    expect(wrapper.emitted("updateExpenses")[0][0]).toMatchObject([
      { name: "Expense 1", amount: 100 },
      { name: "Expense 2", amount: 150 },
      { name: "Expense 3", amount: 75 },
      { name: "New Expense", amount: 1000 },
    ]);
  });
});
