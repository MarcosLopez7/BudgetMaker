<template>
  <div>
    <h3 class="subtitle">Accounts distribution</h3>

    <div class="table-account-row-carnitaasada header-account">
      <span>Account</span>
      <span>Percent</span>
      <span>Amount</span>
      <span>Blance</span>
    </div>

    <!-- MANDAR OBJETO COMO PARAMETRO Y QUITAR VARIABLES -->
    <AccountRow
      v-for="(account, index) in accounts"
      :account="account"
      :index="index"
      :availableMoney="availableMoney"
      :isValidAmountIncome="isValidAmountIncome"
      :hasError="hasError"
      :key="index"
    />
    <div class="table-account-row-carnitaasada total-row">
      <span class="start-row">Total</span>
      <span test-id="total-percent-test">%{{ totalPercent.toFixed(2) }}</span>
      <span test-id="total-amount-test">${{ totalAmount.toFixed(2) }}</span>
      <span test-id="total-balance-test">${{ totalBalance.toFixed(2) }}</span>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-mutating-props */
import AccountRow from "@/components/AccountRow.vue";

export default {
  components: {
    AccountRow,
  },
  props: {
    availableMoney: {
      type: Number,
      required: true,
    },
    isValidAmountIncome: {
      type: Boolean,
      required: true,
    },
    accounts: {
      type: Array,
      required: true,
    },
    totalExpenses: {
      type: Number,
      default: 0.0,
    },
  },
  computed: {
    totalPercent() {
      return this.getTotal("percent");
    },
    totalAmount() {
      return this.getTotal("amount");
    },
    totalBalance() {
      return this.getTotal("balance") + this.totalAmount;
    },
    isEditting() {
      for (let i = 0; i < this.accounts.length; i++) {
        if (this.accounts[i].isEditting) {
          return true;
        }
      }

      return false;
    },
    hasError() {
      for (let i = 0; i < this.accounts.length; i++) {
        if (
          this.accounts[i].errorPercentInput !== "" ||
          this.accounts[i].errorAmountInput !== ""
        ) {
          return true;
        }
      }

      return false;
    },
  },
  methods: {
    // MANDAR MÉTODO A CMP ACCOUNT ROW
    closeEditting(index) {
      if (!this.hasError) {
        // eslint-disable-next-line vue/no-mutating-props
        this.accounts[index].isEditting = false;
      }
    },
    closeAccountRow(e) {
      // HACER QUE SE TRIGGERE ESTA FUNCIÒN DESDE LA CPM MAKE BUDGET
      const edittingRowDiv = document.getElementsByClassName("edditing-row")[0];
      if (
        edittingRowDiv !== undefined &&
        !e.target.classList.contains("editting-row-input") &&
        this.isEditting &&
        !this.hasError
      ) {
        for (let i = 0; i < this.accounts.length; i++) {
          this.accounts[i].isEditting = false;
        }
      }
    },
    // MANDAR LA FUNCION PARA SER ESCUCHADA EN ACCOUNT ROW
    modifyAmountByIncome() {
      if (this.isValidAmountIncome) {
        this.accounts.forEach((account) => {
          if (account.percent !== "" && parseFloat(account.percent) >= 0) {
            if (!account.default) {
              account.amount =
                (this.availableMoney * parseFloat(account.percent)) / 100;
              account.amount = account.amount.toFixed(2);
            } else {
              account.percent =
                (parseFloat(account.amount) / this.availableMoney) * 100;
              account.percent = account.percent.toFixed(2);
            }
          } else {
            if (!account.defaul) {
              account.amount = "0";
            }
            account.percent = "0";
            account.errorAmountInput = "";
            account.errorPercentInput = "";
          }
        });
      }
    },
    modifyPercentByAmount(index) {
      let error = false;

      if (this.accounts[index].amount === "") {
        this.accounts[index].percent = "0";
        this.accounts[index].errorAmountInput = "Insert an amount";
        error = true;
      }

      if (parseFloat(this.accounts[index].amount) < 0) {
        this.accounts[index].percent = "0";
        this.accounts[index].errorAmountInput =
          "Negative numbers aren't allowes";
        error = true;
      }

      if (
        parseFloat(this.accounts[index].amount) > this.availableMoney &&
        !this.accounts[index].default
      ) {
        this.accounts[index].errorAmountInput =
          "Amount must be lower than available money";
        error = true;
      }

      if (!error) {
        if (this.availableMoney != 0) {
          this.accounts[index].percent =
            (parseFloat(this.accounts[index].amount) / this.availableMoney) *
            100;
          this.accounts[index].percent =
            this.accounts[index].percent.toFixed(2);
        } else {
          this.accounts[index].percent = "0";
        }
        this.accounts[index].errorAmountInput = "";
      }
    },
    getTotal(attr) {
      let result = 0;
      this.accounts.forEach((account) => {
        if (account[attr] !== "" && parseFloat(account[attr]) >= 0) {
          result = result + parseFloat(account[attr]);
        }
      });
      return result;
    },
  },
  watch: {
    /* MANDAR WATCHERS A ACCOUNT ROW */
    // eslint-disable-next-line no-unused-vars
    availableMoney(newValue, oldVlue) {
      this.modifyAmountByIncome();
    },
    // eslint-disable-next-line no-unused-vars
    totalExpenses(newValue, oldVlue) {
      for (let i = 0; i < this.accounts.length; i++) {
        if (this.accounts[i].default) {
          this.accounts[i].amount = this.totalExpenses;
          this.modifyPercentByAmount(i);
          break;
        }
      }
    },
  },
};
</script>

<style></style>
