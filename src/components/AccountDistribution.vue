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
      :index="index"
      :availableMoney="availableMoney"
      :isValidAmountIncome="isValidAmountIncome"
      :hasError="hasError"
      :key="index"
    />

    <!-- <div
      v-for="(account, index) in accounts"
      class="table-account-row-carnitaasada"
      test-id="row-account-test"
      :class="[
        account.isEditting ? 'edditing-row' : '',
        account.default ? 'total-row' : '',
      ]"
      @click="editAccountRow(index)"
      :key="index"
    >
      <span class="start-row">{{ account.name }}</span>
      <span test-id="account-percent-test" v-show="!account.isEditting"
        >%{{ account.percent }}</span
      >
      <div v-show="account.isEditting">
        <input
          :id="`percent-input-${index}`"
          class="editting-row-input"
          :class="{ 'input-error': account.errorPercentInput !== '' }"
          v-model="account.percent"
          type="number"
          @keyup.enter="closeEditting(index)"
          @input="modifyAmountByPercent(index)"
        />
        <span v-show="account.errorPercentInput !== ''" class="field-error">
          {{ account.errorPercentInput }}
        </span>
      </div>
      <span test-id="account-amount-test" v-show="!account.isEditting"
        >${{ account.amount }}</span
      >
      <div v-show="account.isEditting">
        <input
          class="editting-row-input"
          :class="{ 'input-error': account.errorAmountInput !== '' }"
          v-model="account.amount"
          type="number"
          @keyup.enter="closeEditting(index)"
          @input="modifyPercentByAmount(index)"
        />
        <span v-show="account.errorAmountInput !== ''" class="field-error">
          {{ account.errorAmountInput }}
        </span>
      </div>
      <span
        >${{
          account.amount !== ""
            ? (
                parseFloat(account.amount) + parseFloat(account.balance)
              ).toFixed(2)
            : parseFloat(account.balance)
        }}</span
      >
    </div> -->
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
    closeEditting(index) {
      if (!this.hasError) {
        // eslint-disable-next-line vue/no-mutating-props
        this.accounts[index].isEditting = false;
      }
    },
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
    modifyAmountByPercent(index) {
      let error = false;

      if (this.accounts[index].percent === "") {
        this.accounts[index].amount = "0";
        this.accounts[index].errorPercentInput = "Insert a percent";
        error = true;
      }

      if (
        parseFloat(this.accounts[index].percent) > 100 ||
        parseFloat(this.accounts[index].percent) < 0
      ) {
        this.accounts[index].errorPercentInput =
          "Percent must be between 0 - 100";
        error = true;
      }

      if (!error) {
        this.accounts[index].amount =
          this.availableMoney *
          (parseFloat(this.accounts[index].percent) / 100);

        this.accounts[index].amount = this.accounts[index].amount.toFixed(2);
        this.accounts[index].errorPercentInput = "";
        this.accounts[index].errorAmountInput = "";
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
    // editAccountRow(index) {
    //   if (
    //     !this.hasError &&
    //     this.isValidAmountIncome &&
    //     !this.accounts[index].default
    //   ) {
    //     setTimeout(() => {
    //       if (!this.accounts[index].isEditting) {
    //         for (let i = 0; i < this.accounts.length; i++) {
    //           if (i != index) {
    //             this.accounts[i].isEditting = false;
    //           } else {
    //             this.accounts[i].isEditting = true;
    //           }
    //         }

    //         const input = document.getElementById(`percent-input-${index}`);
    //         setTimeout(() => input.focus(), 25);
    //       }
    //     }, 25);
    //   }
    // },
  },
  watch: {
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
