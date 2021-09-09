import { mount } from "@vue/test-utils";
import MakeBudget from "@/views/MakeBudget.vue";
import LocalStorageMock from "./__mocks__/LocalStorageMock.js";

global.localStorage = new LocalStorageMock();

describe("MakeBudget.vue", () => {
  it("It should render the accounts from localStorage", () => {
    const wrapper = mount(MakeBudget);
    const accountsRow = wrapper.findAll('div[test-id="row-account-test"]');
    expect(accountsRow).toHaveLength(6);
  });

  it("It should render the total sum of percent, amount and balance from account list", async () => {
    const wrapper = mount(MakeBudget);

    const totalPercent = wrapper
      .find('span[test-id="total-percent-test"]')
      .text();

    const totalAmount = wrapper
      .find('span[test-id="total-amount-test"]')
      .text();

    const totalBlance = wrapper
      .find('span[test-id="total-balance-test"]')
      .text();

    // expect(wrapper.componentVM).toBe(true);
    expect(totalPercent).toBe("%0.00");
    expect(totalAmount).toBe("$0.00");
    expect(totalBlance).toBe("$900.00");
  });

  it(`If user type in the amount income input, it should add to available money,
      change the amount for each account except default accounts`, async () => {
    const wrapper = mount(MakeBudget);
    const amountIncomeInput = wrapper.find(
      'input[test-id="amount-income-test"]'
    );

    await amountIncomeInput.setValue("2000");

    const availableMoney = wrapper
      .find('span[test-id="available-money"]')
      .text();

    expect(availableMoney).toBe("Available Money: $2010");
    // expect(wrapper.componentVM).toBe("Available Money: $2010");
    const accountsPercent = wrapper.findAll(
      'span[test-id="account-percent-test"]'
    );
    expect(accountsPercent[0].text()).toBe("%16.17");

    const accountsAmount = wrapper.findAll(
      'span[test-id="account-amount-test"]'
    );
    expect(accountsAmount[1].text()).toBe("$0.00");
  });

  it(`Ìf user adds an empty input in amount income, it should prompt a error 
      message for empty input, available money should not be added, should be
      0 the amounts for each account except default account`, async () => {
    const wrapper = mount(MakeBudget);
    const amountIncomeInput = wrapper.find(
      'input[test-id="amount-income-test"]'
    );

    await amountIncomeInput.setValue("");

    const errorMsg = wrapper
      .find('span[test-id="amount-input-error-msg"]')
      .text();

    expect(errorMsg).toBe("Please, insert an amount for the income");
    // expect(wrapper.componentVM).toBe("Available Money: $2010");
    const availableMoney = wrapper
      .find('span[test-id="available-money"]')
      .text();

    expect(availableMoney).toBe("Available Money: $10");

    // const accountsAmount = wrapper.findAll(
    //   'span[test-id="account-amount-test"]'
    // );
    // expect(accountsAmount[1].text()).toBe("$0.00");
  });

  it(`If user adds numbers below 1 to amount income input, it should prompt a error 
      message for low range input, it should not add to available money, should be 0
      the amounts for each account except default account`, () => {
    expect(true).toBe(false);
  });

  it(`If user modify percent in account, it should modify amount account`, () => {
    expect(true).toBe(false);
  });

  it(`If user modify amount in account, it should modify percent account`, () => {
    expect(true).toBe(false);
  });

  it(`If user modify percent with blank input, it should prompt error message for
      blank input and it should modify amount account to 0`, () => {
    expect(true).toBe(false);
  });

  it(`If user modify percent with blank input, it should prompt error message for
      blank input and it should modify amount account to 0`, () => {
    expect(true).toBe(false);
  });

  it(`If user modify percent with below to 0 or higher than 100, it should prompt
      error message for range error and it should modify amount account to 0`, () => {
    expect(true).toBe(false);
  });

  it(`If user modify amount with blank input, it should prompt error message for
      blank input and it should modify percent account to 0`, () => {
    expect(true).toBe(false);
  });

  it(`If user modify amount with below to 0 or higher than available money, it should prompt
      error message for range error and it should modify amount account to 0`, () => {
    expect(true).toBe(false);
  });

  it(`If user modify change cut-off date before current date, it should prompt date range error`, () => {
    expect(true).toBe(false);
  });

  it(`If user click to submit, it should confirm the submit showing the percent of submit`, () => {
    expect(true).toBe(false);
  });

  it(`If user confirms submit, it should save data to local storage with an id`, () => {
    expect(true).toBe(false);
  });
});
