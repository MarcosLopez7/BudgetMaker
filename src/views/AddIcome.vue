<template>
  <div class="add-income">
    <h2 class="title">Add Income</h2>
    <input
      type="number"
      class="form-control"
      placeholder="Amount"
      v-model="amount"
    />
    <input type="date" class="form-control" v-model="date" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: "",
      date: "",
    };
  },
  mounted() {
    const date = new Date(Date.now());
    let month = date.getMonth();
    if (10 > month) {
      month = "0" + month;
    }
    this.date = `${date.getFullYear()}-${month}-${date.getDate()}`;
  },
};
</script>

<style>
/* .add-income {
  display: flex;
  justify-content: center;
} */

.add-income input {
  width: 280px;
  margin: 25px auto;
  font-size: 1.2rem;
}
</style>
