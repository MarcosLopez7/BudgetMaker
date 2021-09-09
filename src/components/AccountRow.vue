<template>
  <div
    class="table-account-row-carnitaasada"
    test-id="row-account-test"
    :class="[
      account.isEditting ? 'edditing-row' : '',
      account.default ? 'total-row' : '',
    ]"
    @click="editAccountRow(index)"
  >
    <span class="start-row">{{ account.name }}</span>
    <span test-id="account-percent-test" v-show="!account.isEditting"
      >%{{ account.percent }}</span
    >
    <div v-show="account.isEditting">
      <!-- eslint-disable -->
      <input
        :id="`percent-input-${index}`"
        class="editting-row-input"
        :class="{ 'input-error': account.errorPercentInput !== '' }"
        v-model="account.percent"
        type="number"
        @keyup.enter="closeEditting()"
        @input="modifyAmountByPercent()"
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
        @keyup.enter="closeEditting()"
        @input="modifyPercentByAmount()"
      />
      <span v-show="account.errorAmountInput !== ''" class="field-error">
        {{ account.errorAmountInput }}
      </span>
    </div>
    <span
      >${{
        account.amount !== ""
          ? (parseFloat(account.amount) + parseFloat(account.balance)).toFixed(
              2
            )
          : parseFloat(account.balance)
      }}</span
    >
  </div>
</template>

<script>
/* eslint-disable vue/no-mutating-props */
export default {
  props: {
    account: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    availableMoney: {
      type: Number,
      required: true,
    },
    hasError: {
      type: Boolean,
      required: true,
    },
    isValidAmountIncome: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeEditting() {
      if (!this.hasError) {
        this.account.isEditting = false;
      }
    },
    modifyAmountByPercent() {
      let error = false;

      if (this.account.percent === "") {
        this.account.amount = "0";
        this.account.errorPercentInput = "Insert a percent";
        error = true;
      }

      if (
        parseFloat(this.account.percent) > 100 ||
        parseFloat(this.account.percent) < 0
      ) {
        this.account.errorPercentInput = "Percent must be between 0 - 100";
        error = true;
      }

      if (!error) {
        this.account.amount =
          this.availableMoney * (parseFloat(this.account.percent) / 100);

        this.account.amount = this.account.amount.toFixed(2);
        this.account.errorPercentInput = "";
        this.account.errorAmountInput = "";
      }
    },
    modifyPercentByAmount() {
      let error = false;

      if (this.account.amount === "") {
        this.account.percent = "0";
        this.account.errorAmountInput = "Insert an amount";
        error = true;
      }

      if (parseFloat(this.account.amount) < 0) {
        this.account.percent = "0";
        this.account.errorAmountInput = "Negative numbers aren't allowes";
        error = true;
      }

      if (
        parseFloat(this.account.amount) > this.availableMoney &&
        !this.account.default
      ) {
        this.account.errorAmountInput =
          "Amount must be lower than available money";
        error = true;
      }

      if (!error) {
        if (this.availableMoney != 0) {
          this.account.percent =
            (parseFloat(this.account.amount) / this.availableMoney) * 100;
          this.account.percent = this.account.percent.toFixed(2);
        } else {
          this.account.percent = "0";
        }
        this.account.errorAmountInput = "";
      }
    },
    editAccountRow(index) {
      if (!this.hasError && this.isValidAmountIncome && !this.account.default) {
        setTimeout(() => {
          if (!this.account.isEditting) {
            this.account.isEditting = true;

            const input = document.getElementById(`percent-input-${index}`);
            setTimeout(() => input.focus(), 25);
          }
        }, 25);
      }
    },
  },
};
</script>

<style></style>
