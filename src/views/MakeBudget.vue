<template>
  <div class="add-income">
    <h2 class="title">Make Budget</h2>
    <form>
      <div class="form-field">
        <label for="amountIncome">Amount Income</label>
        <input
          id="amountIncome"
          type="number"
          class="form-control"
          placeholder="Amount"
          v-model="amount"
          required
        />
      </div>
      <div class="form-field">
        <label for="cutOffDate">Cut Off Date</label>
        <input
          id="cutOffDate"
          type="date"
          class="form-control"
          v-model="date"
          required
        />
      </div>

      <span class="available-money">
        Money available: ${{ availableMoney }}
      </span>

      <ExpenseList />
    </form>
  </div>
</template>

<script>
/* TODO LIST 
  1. Crear componente X
  2. Obtener datos del local storage de las cuentas X
  3. Obtener inputs de fecha e ingreso X
    Arreglar CSS después
  4. Renderizar monto disponible X
  5. Creación de componente de lista de gastos 
    1. Renderizar lista de gastos proveniente de array
    2. Agregar, eliminar y editar lista de array
      Validar inputs de cantidad y nombre
      Hacer CSS para errores en el input
      Botón para eliminar
    3. Suma automática por modificación en la lista con computer
    4. Salvar lista de gastos en el presupuesto correspondiente
    5. Emitir a componente padre el total de gastos
    6. UT
  6. Obtener total de gastos y agregar automáticamente a la lista
  7. Renderizar tabla de cuentas para asignar por porcentaje y monto, 
  más balance acumulado
  8. Modificación automática de porcentajes, monto y balance
  9. Suma total de porcentaje, monto y balance
  10. Validar Inputs númericos a sólo positivos
  11. Validar que no se asigne mayor presupuesto
  12. Guardar en localStorage presupuesto
  13. UT
*/
import LocalStorageManager from "@/utilities/LocalStorageManager.js";
import ExpenseList from "@/components/ExpenseList.vue";

export default {
  components: {
    ExpenseList,
  },
  data() {
    return {
      amount: "0.00",
      date: "",
      accounts: [],
      unassigned: 0,
    };
  },
  computed: {
    availableMoney() {
      let result = this.unassigned;

      if (this.amount !== "") {
        result += this.amount;
      }

      return Math.round(result * 100) / 100;
    },
  },
  created() {
    const date = new Date(Date.now());
    let month = date.getMonth() + 1;
    if (10 > month) {
      month = "0" + month;
    }
    this.date = `${date.getFullYear()}-${month}-${date.getDate()}`;

    LocalStorageManager.load();

    const dataObj = JSON.parse(localStorage.getItem("data"));
    this.accounts = dataObj.accounts;
    this.unassigned = dataObj.unassigned;
  },
};
</script>

<style>
.add-income {
  padding: 0px 25px;
  /* margin: 0 10px; */
  /* max-width: 100%;*/
}

.form-field {
  margin: 25px auto;
}

.add-income input {
  width: 285px;
  font-size: 1.2rem;
  margin-top: 10px;
}

.available-money {
  text-align: center;
  font-size: 24px;
  display: block;
}
</style>
