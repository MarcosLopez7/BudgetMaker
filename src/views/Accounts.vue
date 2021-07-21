<template>
  <div class="accountsPage">
    <h2 class="title">Accounts</h2>
    <div class="balance">
      <span>Your balance is: ${{ mainBalance }}</span>
    </div>
    <div class="accountList">
      <div
        class="accountElement"
        v-for="account in accounts"
        :key="account.name"
      >
        <span> {{ account.name }}: </span> <span>${{ account.balance }} </span>
      </div>
    </div>
    <div class="bottom-button">
      <button
        type="button"
        class="btn btn-primary"
        @click="goToAddIncomeView()"
      >
        Add Income
      </button>
    </div>
    <!-- <div v-show="addingAccount" class="addingAccount">
      <input
        class="form-control"
        type="text"
        v-model="newAccountInput"
        placeholder="New Account"
        @keyup.enter="addAccount()"
      />
      <button
        class="btn btn-danger"
        type="button"
        @click="addingAccount = !addingAccount"
      >
        <i class="fa fa-times" aria-hidden="true"></i>
      </button>
    </div>
    <div v-show="!addingAccount" class="addCountSection">
      <span>Add Account</span>
      <button
        class="btn btn-primary"
        type="button"
        @click="addingAccount = !addingAccount"
      >
        <i class="fa fa-plus" aria-hidden="true"></i>
      </button>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      availableMoney: 0,
      addingAccount: false,
      accounts: [],
      newAccountInput: "",
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
      location.href = "/add-income";
    },
  },
  mounted() {
    if (localStorage.data) {
      const data = JSON.parse(localStorage.getItem("data"));
      this.availableMoney = data.availableMoney;
      this.accounts = data.accounts;
    }
  },
};
</script>

<style>
.accountsPage {
  margin-top: 20px;
}

.balance {
  margin: 10px 0;
  font-size: 24px;
  text-align: center;
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
</style>
