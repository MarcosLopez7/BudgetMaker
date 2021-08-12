import { mount } from "@vue/test-utils";
import Accounts from "@/views/Accounts.vue";

class LocalStorageMock {
  constructor() {
    this.store = {
      data: {
        accounts: [
          { name: "Expenses", balance: 0 },
          { name: "Fun", balance: 200 },
          { name: "Offering", balance: 100 },
          { name: "Education", balance: 200 },
          { name: "Savings", balance: 250 },
          { name: "Investments", balance: 150 },
        ],
        unassigned: 0,
      },
    };
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

describe("Accounts.vue", () => {
  it("The balance should sum automatically all the accounts balance with unassigned", () => {
    const wrapper = mount(Accounts);

    const accountsDom = wrapper.findAll('div[test-id="accountTest"]');

    expect(accountsDom.length).toBe(6);
  });

  it("Should render the all account list from localStorage", () => {
    const wrapper = mount(Accounts);

    const textBalance = wrapper.find('span[test-id="mainBalanceTest"]').text();

    expect(textBalance).toMatch("Your balance is: $910");
  });

  it("Should render unassigned money from localStorage", () => {
    const wrapper = mount(Accounts);

    const textBalance = wrapper.find('span[test-id="unassignedTest"]').text();

    expect(textBalance).toMatch("Unassigned money: $10");
  });
});
