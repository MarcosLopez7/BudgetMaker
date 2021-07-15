<template>
  <div class="accountsPage">
    <h1 class="title">Accounts</h1>
    <div class="balance">
      <span>Your balance is: {{ mainBalance }}</span>
    </div>
    <div class="acoountList">
      <div
        class="accountElement"
        v-for="account in accounts"
        :key="account.name"
      >
        <span> {{ account.name }} : {{ account.balance }} </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      availableMoney: 2000,
      accounts: [
        { name: "Expenses", balance: 0 },
        { name: "Fun", balance: 200 },
        { name: "Offering", balance: 100 },
        { name: "Education", balance: 200 },
        { name: "Savings", balance: 250 },
        { name: "Investments", balance: 150 },
      ],
    };
  },
  computed: {
    mainBalance() {
      let totalAmountAccounts = 0;
      this.accounts.forEach(
        (account) => (totalAmountAccounts += account.balance)
      );
      return this.availableMoney - totalAmountAccounts;
    },
  },
};
</script>

<style>
.accountsPage {
  margin-top: 20px;
}

.title {
  text-align: center;
}

.balance {
  margin: 10px 0;
  font-size: 24px;
  text-align: center;
}

.acoountList {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}

.accountElement {
  display: flex;
  align-items: center;
  width: 100%;
}
</style>
