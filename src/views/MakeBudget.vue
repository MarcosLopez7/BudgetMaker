<template>
  <div class="add-income" @click="closeAccountRow($event)">
    <h2 class="title">Make Budget</h2>
    <form>
      <div class="form-field">
        <label for="amountIncome">Amount Income</label>
        <input
          id="amountIncome"
          type="number"
          class="form-control"
          :class="{ 'input-error': amount.errorMessage !== '' }"
          placeholder="Amount"
          v-model="amount.input"
          min="0"
          @input="modifyAmountByIncome()"
          required
        />
        <span
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
          v-model="date"
          required
        />
      </div>

      <span class="available-money">
        Available Money: ${{ availableMoney }}
      </span>

      <ExpenseList @updateExpenses="updateExpenseList" />

      <h3 class="subtitle">Accounts distribution</h3>

      <div class="table-account-row-carnitaasada header-account">
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
        <span class="start-row">{{ account.name }}</span>
        <span v-show="!account.isEditting">%{{ account.percent }}</span>
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
        <span v-show="!account.isEditting">${{ account.amount }}</span>
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
      </div>
      <div class="table-account-row-carnitaasada total-row">
        <span class="start-row">Total</span>
        <span>%{{ totalPercent.toFixed(2) }}</span>
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
        - Si había errores en porcentaje, tomar porcentajes como 0
        - Si hay errores en porcentajes o cantidades, limpiarlos
      2. El usuario modifica un porcentaje
        - Se modifica automáticamente la cantidad
        - La cantidad válida es de 0 a 100
        - Si el campo es vacio, la cantidad es 0, el total de porcentaje 
          lo toma como 0
        - Si el número es negativo o mayor al 100 no se modifica la cantidad, 
          el total de porcentaje lo toma como 0
      3. Si el usuario modifica la cantidad
        - Se modifica automáticamente el porcentaje
        - La cantidad válida es de 0 a la cantidad de dinero disponible
        - Si la cantidad es vacio, el porcentaje pasa a 0, la suma total 
          lo toma como 0
        - Si la cantidad es negativa, el porcentaje pasa a 0, la suma total
          lo toma como 0
      4. Validaciòn general
        - El porcentaje no debe pasar del 100%
        - Se tiene que validar todo lo anterior
        - Se debe confirmar al usuario si está seguro de guardar el presupuesto
        - El porcentaje que pueda sobrar se va a unassigned 


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
      let result = this.unassigned;

      if (this.amount.input !== "") {
        result += this.amount.input;
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
    closeEditting(index) {
      if (!this.hasError) {
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
      if (this.isValidateAmountIncome()) {
        this.amount.errorMessage = "";
        this.accounts.forEach((account) => {
          if (account.percent !== "" && parseFloat(account.percent) >= 0) {
            account.amount =
              (this.availableMoney * parseFloat(account.percent)) / 100;
          } else {
            account.amount = 0;
            account.percent = 0;
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

        this.accounts[index].amount.toString();
        this.accounts[index].errorPercentInput = "";
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

      if (parseFloat(this.accounts[index].amount) > this.availableMoney) {
        this.accounts[index].errorAmountInput =
          "Amount must be lower than available money";
        error = true;
      }

      if (!error) {
        if (this.availableMoney != 0) {
          this.accounts[index].percent =
            (parseFloat(this.accounts[index].amount) / this.availableMoney) *
            100;

          this.accounts[index].percent.toString();
        } else {
          this.accounts[index].percent = "0";
        }
        this.accounts[index].errorAmountInput = "";
      }
    },
    getTotal(attr) {
      let result = 0;
      this.accounts.forEach(
        (account) => (result = result + parseFloat(account[attr]))
      );
      return result;
    },
    editAccountRow(index) {
      if (!this.hasError && this.isValidateAmountIncome()) {
        setTimeout(() => {
          if (!this.accounts[index].isEditting) {
            for (let i = 0; i < this.accounts.length; i++) {
              if (i != index) {
                this.accounts[i].isEditting = false;
              } else {
                this.accounts[i].isEditting = true;
              }
            }

            const input = document.getElementById(`percent-input-${index}`);
            setTimeout(() => input.focus(), 25);
          }
        }, 25);
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
        account.errorPercentInput = "";
        account.errorAmountInput = "";
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
</style>
