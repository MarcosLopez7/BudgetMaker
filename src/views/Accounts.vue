<template>
  <div>
    <h1>Accounts</h1>
    <span>Your balance is: {{ mainBalance }}</span>
    <p v-for="account in accounts" :key="account.name">
      {{ account.name }} : {{ account.balance }}
    </p>
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

<style></style>
