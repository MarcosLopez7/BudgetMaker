import { mount } from "@vue/test-utils";
import Accounts from "@/views/Accounts.vue";
import LocalStorageMock from "./__mocks__/LocalStorageMock.js";

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
