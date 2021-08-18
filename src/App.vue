<template>
  <nav id="nav" class="topnav">
    <div class="top">
      <span>
        <a
          href="javascript:void(0);"
          class="icon"
          @click="showMenu = !showMenu"
        >
          <i class="fa fa-bars"></i>
        </a>
      </span>
      <span>
        <router-link :to="{ name: 'index' }" class="active"
          ><h1>Budget Maker</h1></router-link
        >
      </span>
    </div>
    <!-- Navigation links (hidden by default) -->
    <div id="myLinks" v-show="showMenu">
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
      <router-link to="/about">About</router-link>
    </div>
    <!-- "Hamburger menu" / "Bar icon" to toggle the navigation links -->
  </nav>
  <router-view />
</template>

<script>
import { data } from "@/utilities/initData.js";

export default {
  data() {
    return {
      showMenu: false,
    };
  },
  mounted() {
    const recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://use.fontawesome.com/aa4ffc396e.js"
    );
    document.head.appendChild(recaptchaScript);
    if (typeof localStorage.data === "undefined") {
      localStorage.setItem("data", JSON.stringify(data));
    }
  },
};
</script>

<style>
:root {
  --bg-color: #222;
  --bg-card: #208aae;
  --color-text: #fff;
  --heght-nav: 65px;
  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

@font-face {
  font-family: "Lato", sans-serif;
  src: local("Lato"), url("./assets/fonts/lato/Lato-Regular.ttf");
}

body {
  background-color: var(--bg-color);
  color: var(--color-text);
  font-size: 18px;
  margin: 0;
  font-family: "Lato", sans-serif;
  font-weight: 300;
}

h1 {
  margin: 0;
}

.btn {
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-primary {
  color: #fff;
  background-color: var(--bg-card);
  border-color: var(--bg-card);
}

.btn-danger {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  box-sizing: border-box;
}

/*                     BLOQUE PARA EL NAV BAR             */
#nav {
  background-color: var(--bg-card);
  padding: 5px 10px;
}

#nav a {
  color: inherit;
  text-decoration: none;
}

#myLinks {
  position: fixed;
  background: #333;
  width: 40%;
  height: 100%;
}

.topnav {
  overflow: hidden;
  background-color: var(--bg-card);
  position: relative;
}

.top {
  display: flex;
  /* width: 100%; */
  justify-content: center;
}

.top h1 {
  font-size: 1.2rem;
}

/* Style navlabel {
    display: inline-block;
}ration: none;
  font-size: 17px;
  display: block;
}

/* Style the hamburger menu */
.topnav a.icon {
  background: var(--bg-card);
  display: block;
  position: absolute;
  left: 0;
  top: 3px;
}

/* Style the active link (or home/logo) */
.active {
  background-color: var(--bg-card);
  color: white;
}

.title {
  text-align: center;
  font-size: 2.3rem;
  margin: 25px 0;
}

.input-error {
  border: #dc3545;
  border-style: inset;
}

.field-error {
  color: #dc3545;
  margin-top: 5px;
  font-size: 14px;
}

/* FORMULARIOS */
/* .form-label {
  margin-bottom: 0.5rem;
}

label {
  display: inline-block;
} */
</style>
