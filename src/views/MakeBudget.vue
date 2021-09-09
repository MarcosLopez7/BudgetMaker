<template>
  <div class="add-income" @click="closeAccountRow($event)">
    <h2 class="title">Make Budget</h2>
    <form>
      <div class="form-field">
        <label for="amountIncome">Amount Income</label>
        <input
          id="amountIncome"
          test-id="amount-income-test"
          type="number"
          class="form-control"
          :class="{ 'input-error': amount.errorMessage !== '' }"
          placeholder="Amount"
          v-model="amount.input"
          min="0"
          @input="incomeInputHandler()"
          required
        />
        <span
          test-id="amount-input-error-msg"
          class="field-error amount-input-error"
          v-show="amount.errorMessage !== ''"
          >{{ amount.errorMessage }}</span
        >
      </div>
      <div class="form-field">
        <label for="cutOffDate">Cut Off Date</label>
        <input
          id="cutOffDate"
          type="date"
          class="form-control"
          :class="{ 'input-error': !isValidDate }"
          v-model="date"
          required
        />
        <span
          test-id="date-input-error-msg"
          class="field-error amount-input-error"
          v-show="!isValidDate"
          >Please, insert a valid date</span
        >
      </div>

      <span test-id="available-money" class="available-money">
        Available Money: ${{ availableMoney }}
      </span>

      <ExpenseList @updateExpenses="updateExpenseList" />

      <AccountDistribution
        ref="AccountDistribution"
        :availableMoney="availableMoney"
        :isValidAmountIncome="isValideIncome"
        :accounts="accounts"
        :totalExpenses="totalExpenses"
      />

      <button
        type="button"
        class="btn btn-primary submit-btn-Brasil_Espanha"
        @click="submit()"
      >
        Submit
      </button>
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

  TRATAR DE CERRAR LA EDICIÒN FILA DANDO LE CLICK A OTRO LADO EN VEZ DE USAR EL TACHE X
  
  HACER CAMBIO AUTOMÀTICO DE EDITAR LA SIGUIENTE CUENTA DESPUES DE HACER TAB


  8. Modificación automática de porcentajes, monto y balance
    1. Validar que no se envien strings por ningun input y mandar 0 u otro numero a las modificaciones

    LISTA DE VALIDACIONES
      1. El usuario modifica el amount income
        - Automáticamente las cantidades se modifican en 
          base a los porcentajes de cada cuenta, excepto la cuenta de gastos X
        - Si es un espacio en blanco, mostrar mensaje de 
          error de no dejar el campo vacio, el computed 
          de available money se manda 0, no se va poder modificar
          porcentages o cantidades X
        - Si el input es negativo, no se modifican las cantidades X
        - La cantidad mínima válida es de 1 X
        - Si había errores en porcentaje, tomar porcentajes como 0 X
        - Si hay errores en porcentajes o cantidades, limpiarlos X
      2. El usuario modifica un porcentaje
        - Se modifica automáticamente la cantidad X
        - La cantidad válida es de 0 a 100 X
        - Si el campo es vacio, la cantidad es 0, el total de porcentaje 
          lo toma como 0 X
        - Si el número es negativo o mayor al 100 no se modifica la cantidad, 
          el total de porcentaje lo toma como 0 x
        - Limpiar error en cantidad, cuando se modifique porcentaje X
      3. Si el usuario modifica la cantidad
        - Se modifica automáticamente el porcentaje X
        - La cantidad válida es de 0 a la cantidad de dinero disponible X
        - Si la cantidad es vacio, el porcentaje pasa a 0, la suma total 
          lo toma como 0 X
        - Si la cantidad es negativa, el porcentaje pasa a 0, la suma total
          lo toma como 0 X
      4. Validaciòn general
        - El porcentaje no debe pasar del 100%
        - Se tiene que validar todo lo anterior
        - Se debe confirmar al usuario si está seguro de guardar el presupuesto
        - El porcentaje que pueda sobrar se va a unassigned 


  9. Suma total de porcentaje, monto y balance X
  10. Validar Inputs númericos a sólo positivos X
  11. Validar que no se asigne mayor presupuesto 
  12. Guardar en localStorage presupuesto
  13. UT
*/
import LocalStorageManager from "@/utilities/LocalStorageManager.js";
import ExpenseList from "@/components/ExpenseList.vue";
import AccountDistribution from "@/components/AccountDistribution.vue";

export default {
  components: {
    ExpenseList,
    AccountDistribution,
  },
  data() {
    return {
      amount: {
        input: "",
        errorMessage: "",
      },
      date: "",
      accounts: [],
      unassigned: 0,
      expenses: [],
    };
  },
  computed: {
    availableMoney() {
      let result = parseFloat(this.unassigned);

      if (this.amount.input !== "") {
        result += parseFloat(this.amount.input);
      }

      return Math.round(result * 100) / 100;
    },
    totalExpenses() {
      let result = 0;
      this.expenses.forEach((expense) => (result = result + expense.amount));
      return result;
    },
    isValideIncome() {
      return this.amount.errorMessage === "" && this.amount.input !== "";
    },
    currentDay() {
      const date = new Date(Date.now());
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (10 > month) {
        month = "0" + month;
      }

      if (10 > day) {
        day = "0" + day;
      }

      return `${date.getFullYear()}-${month}-${day}`;
    },
    isValidDate() {
      return this.date >= this.currentDay;
    },
    getTotal() {
      let result = 0;
      this.accounts.forEach((account) => {
        if (account["amount"] !== "" && parseFloat(account["amount"]) >= 0) {
          result = result + parseFloat(account["amount"]);
        }
      });
      return result;
    },
  },
  methods: {
    isValidateAmountIncome() {
      if (this.amount.input === "") {
        this.amount.errorMessage = "Please, insert an amount for the income";
        return false;
      }

      if (parseFloat(this.amount.input) < 1) {
        this.amount.errorMessage = "The minimun value for the income is 1";
        return false;
      }

      return true;
    },
    closeAccountRow(e) {
      this.$refs.AccountDistribution.closeAccountRow(e);
    },
    incomeInputHandler() {
      if (this.isValidateAmountIncome()) {
        this.amount.errorMessage = "";
      }
    },
    updateExpenseList(expenseList) {
      this.expenses = expenseList;
    },
    loadDate() {
      this.date = this.currentDay;
    },
    loadDataFromStorage() {
      LocalStorageManager.load();

      const dataObj = JSON.parse(localStorage.getItem("data"));
      const accountsData = dataObj.accounts;

      accountsData.forEach((account) => {
        account.isEditting = false;
        account.percent = "0";
        account.amount = "0";
        account.errorPercentInput = "";
        account.errorAmountInput = "";
      });

      this.accounts = dataObj.accounts;
      this.unassigned = dataObj.unassigned;
    },
    submit() {
      if (this.isisValideIncome && this.isValidDate) {
        const dataObj = JSON.parse(localStorage.getItem("data"));
        // const budgetData = dataObj.budgets;
        const id = dataObj.budgetData.length + 1;

        const unassigned = this.availableMoney - this.getTotal;
        dataObj.unassigned = dataObj.unassigned + unassigned;

        dataObj.budgetData.push({
          id: id,
          expenses: this.expenses,
          accounts: this.accounts,
          income: parseFloat(this.amount.input),
          date: this.currentDay,
          cuttOffDay: this.date,
        });

        for (let i = 0; i < this.accounts.length; i++) {
          dataObj.accounts[i].balance =
            dataObj.accounts[i].balance + this.accounts[i].amount;
        }

        const dataJSON = JSON.stringify(dataObj);

        localStorage.setItem("data", dataJSON);
      }
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
  padding: 0 10px;
}

/* .table-account-row-carnitaasada span {
  display: flex;
  align-items: center;
  justify-content: center;
} */

.table-account-row-carnitaasada input {
  height: 15px;
  width: 100%;
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

.header-account:hover {
  cursor: initial;
  color: var(--color-text);
}

.total-row:hover {
  cursor: initial;
  color: var(--color-text);
}

.field-error {
  font-size: 10px;
}

.amount-input-error {
  font-size: 14px;
}

.submit-btn-Brasil_Espanha {
  display: flex;
  margin: 0 auto;
}
</style>
