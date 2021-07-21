import { createRouter, createWebHistory } from "vue-router";
// import Home from "../views/Home.vue";
import Accounts from "@/views/Accounts.vue";
import About from "@/views/About.vue";
import AddIncome from "@/views/AddIcome.vue";

const routes = [
  {
    path: "/",
    name: "Accounts",
    component: Accounts,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/add-income",
    name: "AddIncome",
    component: AddIncome,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
