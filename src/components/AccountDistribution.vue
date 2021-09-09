<template>
  <div>
    <h3 class="subtitle">Accounts distribution</h3>

    <div class="table-account-row-carnitaasada header-account">
      <span>Account</span>
      <span>Percent</span>
      <span>Amount</span>
      <span>Blance</span>
    </div>

    <AccountRow
      v-for="(account, index) in accounts"
      :account="account"
      :dataCMP="{
        index: index,
        availableMoney: availableMoney,
        isValidAmountIncome: isValidAmountIncome,
        hasError: hasError,
        totalExpenses: totalExpenses,
      }"
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
    closeAccountRow(e) {
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
};
</script>

<style></style>
