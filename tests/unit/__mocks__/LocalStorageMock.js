export default class LocalStorageMock {
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
