import { createRouter, createWebHistory } from "vue-router";
// import Home from "../views/Home.vue";
import Accounts from "@/views/Accounts.vue";
import About from "@/views/About.vue";
import MakeBudget from "@/views/MakeBudget.vue";

const routes = [
  {
    path: "/",
    name: "index",
    component: Accounts,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/make-budget",
    name: "MakeBudget",
    component: MakeBudget,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
