<template>
  <div class="accountsPage">
    <h2 class="title">Accounts</h2>
    <div class="balance">
      <span test-id="mainBalanceTest">Your balance is: ${{ mainBalance }}</span>
      <span test-id="unassignedTest" class="unassigned-money"
        >Unassigned money: ${{ unassigned }}
      </span>
    </div>
    <div class="accountList">
      <div
        class="accountElement"
        test-id="accountTest"
        v-for="account in accounts"
        :key="account.name"
      >
        <span> {{ account.name }}: </span> <span>${{ account.balance }} </span>
      </div>
      <a href="#">Add Account</a>
    </div>
    <div class="bottom-button">
      <router-link :to="{ name: 'MakeBudget' }">
        <button type="button" class="btn btn-primary">Add Income</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import LocalStorageManager from "@/utilities/LocalStorageManager.js";

export default {
  data() {
    return {
      accounts: [],
      unassigned: 0,
    };
  },
  computed: {
    mainBalance() {
      let totalAmountAccounts = 0;
      this.accounts.forEach(
        (account) => (totalAmountAccounts += account.balance)
      );
      return totalAmountAccounts + this.unassigned;
    },
  },
  methods: {
    addAccount() {
      if (this.newAccountInput.replace(/\s/g, "") !== "") {
        this.accounts.push({
          name: this.newAccountInput,
          balance: 0,
        });
        this.newAccountInput = "";
        this.addingAccount = false;
      }
    },
    goToAddIncomeView() {
      location.href = "/make-budget";
    },
  },
  created() {
    LocalStorageManager.load();

    const dataObj = JSON.parse(localStorage.getItem("data"));
    // this.availableMoney = dataObj.availableMoney;
    this.accounts = dataObj.accounts;
    this.unassigned = dataObj.unassigned;
  },
};
</script>

<style>
.accountsPage {
  margin-top: 15px;
}

.balance {
  margin: 10px 0;
  font-size: 24px;
  text-align: center;
}

.balance span {
  display: block;
}

.unassigned-money {
  margin: 15px 0;
  font-size: 18px;
}

/* .acoountList {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
} */

.accountElement {
  display: flex;
  justify-content: space-between;
  /* width: 100%; */
  padding: 0 20px;
  margin: 25px 0;
}

.addCountSection {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 80px;
}

.addCountSection button {
  padding: 1px 5px;
  height: 25px;
  margin: 0 10px;
}

.addingAccount {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 25px 0;
}

.addingAccount input {
  width: 300px;
  margin: 0 30px;
}

.addingAccount button {
  margin: 0 5px;
}

.bottom-button {
  display: flex;
  justify-content: center;
  margin: 40px 0;
}

.accountList a {
  text-decoration: none;
  color: var(--bg-card);
  padding: 0 20px;
}
</style>
