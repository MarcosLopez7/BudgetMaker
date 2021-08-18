<template>
  <div class="expense-list">
    <h3>Expense List</h3>
    <div class="expense-content">
      <div class="row-list"><span>Expense</span> <span>Amount</span></div>
      <div
        class="row-list expense-item"
        v-for="(expense, index) in expenses"
        :key="expense"
        @click="editExpense(expense, index)"
      >
        <span>{{ expense.name }}</span> <span>${{ expense.amount }}</span>
      </div>
    </div>
    <button
      type="button"
      v-if="!isAddingExpense"
      class="btn btn-primary"
      @click="isAddingExpense = !isAddingExpense"
    >
      Add Expense
    </button>
    <div v-if="isAddingExpense" class="input-expense">
      <div class="header-input">
        <span>Expense edit</span>
        <span @click="cleanInputs()" class="close"
          ><i class="fa fa-times" aria-hidden="true"></i
        ></span>
      </div>
      <div class="form-field">
        <label for="nameExpense">Name Expense</label>
        <input
          id="nameExpense"
          class="form-control"
          type="text"
          v-model="expenseInput.input"
          maxlength="50"
          placeholder="Name"
        />
        <span class="field-error" v-show="expenseInput.error !== ''">{{
          expenseInput.error
        }}</span>
      </div>
      <div class="form-field">
        <label for="amountExpense">Amount</label>
        <input
          id="amountExpense"
          class="form-control"
          type="number"
          v-model="amountInput.input"
          placeholder="Amount"
        />
        <span class="field-error" v-show="amountInput.error !== ''">{{
          amountInput.error
        }}</span>
      </div>
      <div class="expense-buttons">
        <button
          v-if="edditingIndex >= 0"
          type="button"
          class="btn btn-danger"
          @click="removeExpense()"
        >
          Remove
        </button>
        <button type="button" class="btn btn-primary" @click="addExpense()">
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAddingExpense: false,
      edditingIndex: -1,
      expenses: [
        { name: "Expense 1", amount: 100 },
        { name: "Expense 2", amount: 150 },
        { name: "Expense 3", amount: 75 },
      ],
      expenseInput: {
        input: "",
        error: "",
      },
      amountInput: {
        input: "",
        error: "",
      },
    };
  },
  methods: {
    addExpense() {
      if (this.validateExpenseInput()) {
        this.expenses.push({
          name: this.expenseInput.input,
          amount: parseFloat(this.amountInput.input),
        });

        this.cleanInputs();
      }
    },
    cleanInputs() {
      this.expenseInput = {
        input: "",
        error: "",
      };
      this.amountInput = {
        input: "",
        error: "",
      };

      this.isAddingExpense = false;
      this.edditingIndex = -1;
    },
    validateExpenseInput() {
      if (this.expenseInput.input.replace(/\s/g, "") === "") {
        this.expenseInput.error = "Please insert a name for this expense";
      }

      if (this.amountInput.input.replace(/\s/g, "") === "") {
        this.amountInput.error = "Please insert an amount for this expense";
      }

      if (parseFloat(this.amountInput.input) <= 0) {
        this.amountInput.error = "Please insert positive number for the amount";
      }

      return this.amountInput.error === "" && this.expenseInput.error === "";
    },
    editExpense(expense, index) {
      this.expenseInput = {
        input: expense.name,
        error: "",
      };
      this.amountInput = {
        input: expense.amount,
        error: "",
      };

      this.isAddingExpense = true;
      this.edditingIndex = index;
    },
    removeExpense() {
      this.expenses.splice(this.edditingIndex, 1);
      this.cleanInputs();
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

.expense-buttons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.expense-buttons button {
  margin: 0 5px;
}

.expense-item:hover {
  cursor: pointer;
  color: #999;
}

.header-input {
  display: flex;
  justify-content: space-between;
  font-size: 24px;
}

.input-expense {
  background-color: var(--bg-card);
  padding: 10px 10px;
}

.close {
  cursor: pointer;
}

.close:hover {
  color: #dc3545;
}
</style>
