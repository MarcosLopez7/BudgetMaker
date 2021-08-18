<template>
  <div class="expense-list">
    <h3>Expense List</h3>
    <div class="expense-content">
      <div class="row-list"><span>Expense</span> <span>Amount</span></div>
      <div class="row-list" v-for="expense in expenses" :key="expense">
        <span>{{ expense.name }}</span> <span>${{ expense.amount }}</span>
      </div>
    </div>
    <button
      type="button"
      class="btn btn-primary"
      @click="isAddingExpense = !isAddingExpense"
    >
      Add Expense
    </button>
    <div v-if="isAddingExpense" class="input-expense">
      <div class="form-field">
        <label for="nameExpense">Name Expense</label>
        <input
          id="nameExpense"
          class="form-control"
          type="text"
          v-model="expenseInput"
          placeholder="Name"
        />
      </div>
      <div class="form-field">
        <label for="amountExpense">Amount</label>
        <input
          id="amountExpense"
          class="form-control"
          type="number"
          v-model="amountInput"
          placeholder="Amount"
        />
      </div>
      <button type="button" class="btn btn-primary" @click="addExpense()">
        Add
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAddingExpense: false,
      expenses: [
        { name: "Expense 1", amount: 100 },
        { name: "Expense 2", amount: 150 },
        { name: "Expense 3", amount: 75 },
      ],
      expenseInput: "",
      amountInput: "",
    };
  },
  methods: {
    addExpense() {
      this.expenses.push({
        name: this.expenseInput,
        amount: parseFloat(this.amountInput),
      });
    },
  },
};
</script>

<style>
.row-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
}

h3 {
  text-align: center;
}
</style>
