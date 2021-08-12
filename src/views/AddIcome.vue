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
/* TODO LIST 
  1. Crear componente
  2. Obtener datos del local storage de las cuentas
  3. Obtener inputs de fecha e ingreso 
  4. Renderizar monto disponible
  5. Creación de componente de lista de gastos
    1. Renderizar lista de gastos proveniente de array
    2. Agregar, eliminar y editar lista de array
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
