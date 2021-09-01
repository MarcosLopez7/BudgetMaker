<template>
  <div class="expense-list">
    <h3>Expense List</h3>
    <div class="expense-content">
      <div class="header-account row-list">
        <span
          >Expense
          <button
            type="button"
            v-if="!isAddingExpense"
            class="btn btn-primary icon-btn"
            test-id="open-add-expense-button"
            @click="isAddingExpense = !isAddingExpense"
          >
            <i class="fa fa-plus" aria-hidden="true"></i></button
        ></span>
        <span>Amount</span>
      </div>
      <div
        class="row-list expense-item"
        v-for="(expense, index) in expenses"
        :key="expense"
        test-id="expense-row"
        @click="editExpense(expense, index)"
      >
        <span test-id="expense-name-span">{{ expense.name }}</span>
        <span test-id="expense-name-amount">${{ expense.amount }}</span>
      </div>
      <div class="row-list total-expense">
        <span>Total</span><span test-id="total-sum">${{ totalExpense }}</span>
      </div>
    </div>
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
          test-id="name-expense-input"
          v-model="expenseInput.input"
          maxlength="50"
          placeholder="Name"
          @keyup.enter="saveExpense()"
        />
        <span
          class="field-error"
          test-id="expense-name-error-label"
          v-show="expenseInput.error !== ''"
          >{{ expenseInput.error }}</span
        >
      </div>
      <div class="form-field">
        <label for="amountExpense">Amount</label>
        <input
          id="amountExpense"
          class="form-control"
          type="number"
          test-id="amount-expense-input"
          v-model="amountInput.input"
          placeholder="Amount"
          @keyup.enter="saveExpense()"
        />
        <span
          class="field-error"
          test-id="expense-amount-error-label"
          v-show="amountInput.error !== ''"
          >{{ amountInput.error }}</span
        >
      </div>
      <div class="expense-buttons">
        <button
          v-if="edditingIndex >= 0"
          type="button"
          class="btn btn-danger"
          test-id="remove-expense"
          @click="removeExpense()"
        >
          Remove
        </button>
        <button
          type="button"
          class="btn btn-primary"
          test-id="save-expense"
          @click="saveExpense()"
        >
          Save
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
  computed: {
    totalExpense() {
      let result = 0;

      this.expenses.forEach((expense) => (result = expense.amount + result));

      return result;
    },
  },
  methods: {
    saveExpense() {
      if (this.validateExpenseInput()) {
        const expenseObject = {
          name: this.expenseInput.input,
          amount: parseFloat(this.amountInput.input),
        };

        if (this.edditingIndex < 0) {
          this.expenses.push(expenseObject);
        } else {
          this.expenses[this.edditingIndex] = expenseObject;
        }

        this.$emit("updateExpenses", this.expense);
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
      this.expenseInput.error = "";
      this.amountInput.error = "";

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
        input: expense.amount.toString(),
        error: "",
      };

      this.isAddingExpense = true;
      this.edditingIndex = index;
    },
    removeExpense() {
      this.expenses.splice(this.edditingIndex, 1);
      this.$emit("updateExpenses", this.expense);
      this.cleanInputs();
    },
  },
  created() {
    this.$emit("updateExpenses", this.expenses);
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
  padding: 10px 10px;
  border: solid 2px var(--bg-card);
  border-radius: 5px;
}

.close {
  cursor: pointer;
}

.close:hover {
  color: #dc3545;
}

.total-expense {
  margin: 20px 0;
  font-size: 22px;
}

.icon-btn {
  padding: 0px 5px;
  height: 23px;
}
</style>
