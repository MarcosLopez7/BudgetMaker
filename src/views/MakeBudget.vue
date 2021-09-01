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
          min="0"
          @input="modifyAmountByIncome()"
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

      <ExpenseList @updateExpenses="updateExpenseList" />

      <h3 class="subtitle">Accounts distribution</h3>

      <div class="table-account-row-carnitaasada header-account edditing-row">
        <span>Account</span>
        <span>Percent</span>
        <span>Amount</span>
        <span>Blance</span>
      </div>

      <div
        v-for="(account, index) in accounts"
        class="table-account-row-carnitaasada"
        :class="{ 'edditing-row': account.isEditting }"
        @click="editAccountRow(index)"
        :key="index"
      >
        <span class="start-row"
          ><i
            v-show="account.isEditting"
            class="fa fa-times"
            aria-hidden="true"
            @click.stop="account.isEditting = false"
          ></i
          >{{ account.name }}</span
        >
        <span v-show="!account.isEditting">%{{ account.percent }}</span>
        <div v-show="account.isEditting">
          <input
            :id="`percent-input-${index}`"
            v-model="account.percent"
            type="number"
            @keyup.enter="account.isEditting = false"
            @input="modifyAmountByPercent(index)"
          />
        </div>
        <span v-show="!account.isEditting">${{ account.amount }}</span>
        <div v-show="account.isEditting">
          <input
            v-model="account.amount"
            type="number"
            @keyup.enter="account.isEditting = false"
            @input="modifyPercentByAmount(index)"
          />
        </div>
        <span
          >${{
            (parseFloat(account.amount) + parseFloat(account.balance)).toFixed(
              2
            )
          }}</span
        >
      </div>
      <div class="table-account-row-carnitaasada edditing-row">
        <span class="start-row">Total</span>
        <span>%{{ totalPercent }}</span>
        <span>${{ totalAmount }}</span>
        <span>${{ totalBalance }}</span>
      </div>
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
      Validar inputs de cantidad y nombre X
      Hacer CSS para errores en el input X
      Botón para eliminar
      Modal para editar gasto
    3. Suma automática por modificación en la lista con computer X
    4. Salvar lista de gastos en el presupuesto correspondiente X
    5. Emitir a componente padre el total de gastos X
    6. UT X
  6. Obtener total de gastos y agregar automáticamente a la lista X
  7. Renderizar tabla de cuentas para asignar por porcentaje y monto,
  más balance acumulado X
    1. Poner inputs en cada columna  X
    2. Poner una fila modificable X
    3. Hacer click a row para poner inputs X

  TRATAR DE CERRAR LA EDICIÒN FILA DANDO LE CLICK A OTRO LADO EN VEZ DE USAR EL TACHE

  8. Modificación automática de porcentajes, monto y balance
    1. Validar que no se envien strings por ningun input y mandar 0 u otro numero a las modificaciones
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
      amount: "",
      date: "",
      accounts: [],
      unassigned: 0,
      expenses: [],
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
    totalPercent() {
      return this.getTotal("percent");
    },
    totalAmount() {
      return this.getTotal("amount");
    },
    totalBalance() {
      return this.getTotal("balance");
    },
  },
  methods: {
    modifyAmountByIncome() {
      this.accounts.forEach((account) => {
        account.amount =
          (this.availableMoney * parseFloat(account.percent)) / 100;
      });
    },
    modifyAmountByPercent(index) {
      this.accounts[index].amount =
        this.availableMoney * (parseFloat(this.accounts[index].percent) / 100);

      this.accounts[index].amount.toString();
    },
    modifyPercentByAmount(index) {
      this.accounts[index].percent =
        (parseFloat(this.accounts[index].amount) / this.availableMoney) * 100;

      this.accounts[index].percent.toString();
    },
    getTotal(attr) {
      let result = 0;
      this.accounts.forEach(
        (account) => (result = result + parseFloat(account[attr]))
      );
      return result;
    },
    editAccountRow(index) {
      if (!this.accounts[index].isEditting) {
        for (let i = 0; i < this.accounts.length; i++) {
          if (i != index) {
            this.accounts[i].isEditting = false;
          } else {
            this.accounts[i].isEditting = true;
          }
        }

        const input = document.getElementById(`percent-input-${index}`);
        setTimeout(() => input.focus(), 100);
      }
    },
    updateExpenseList(expenseList) {
      this.expenses = expenseList;
    },
    loadDate() {
      const date = new Date(Date.now());
      let month = date.getMonth() + 1;
      if (10 > month) {
        month = "0" + month;
      }
      this.date = `${date.getFullYear()}-${month}-${date.getDate()}`;
    },
    loadDataFromStorage() {
      LocalStorageManager.load();

      const dataObj = JSON.parse(localStorage.getItem("data"));
      const accountsData = dataObj.accounts;

      accountsData.forEach((account) => {
        account.isEditting = false;
        account.percent = "0";
        account.amount = "0";
      });

      this.accounts = dataObj.accounts;
      this.unassigned = dataObj.unassigned;
    },
  },
  created() {
    this.loadDate();
    this.loadDataFromStorage();
  },
};
</script>

<style>
.add-income {
  padding: 0px 25px;
}

.form-field {
  margin: 25px auto;
}

.add-income input {
  font-size: 1.2rem;
  margin: 10px 0;
}

.available-money {
  text-align: center;
  font-size: 24px;
  display: block;
}

.subtitle {
  margin-top: 35px;
  /* margin: 40px 0; */
}

/* VARIABLE CANJEADA POR EL OSO */
.table-account-row-carnitaasada {
  display: grid;
  grid-template-columns: repeat(5, 25%);
  text-align: center;
  margin: 20px 0;
}

.table-account-row-carnitaasada:hover {
  cursor: pointer;
  color: #999;
}

.header-account {
  font-size: 1.25rem;
  margin: 25px 0;
}

.start-row {
  text-align: left;
  word-wrap: break-word;
  font-size: 0.9rem;
}

.table-account-row-carnitaasada div {
  align-items: center;
}

/* .table-account-row-carnitaasada span {
  display: flex;
  align-items: center;
  justify-content: center;
} */

.table-account-row-carnitaasada input {
  height: 15px;
  width: 12vw;
  margin: 0;
  font-size: 0.9rem;
}

.fa-times {
  margin-right: 3px;
}

.fa-times:hover {
  color: #dc3545;
}

.edditing-row:hover {
  cursor: initial;
  color: var(--color-text);
}
</style>
