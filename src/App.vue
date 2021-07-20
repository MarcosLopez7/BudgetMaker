<template>
  <div id="nav">
    <h1>Budget Maker</h1>
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/accounts">Accounts</router-link> -->
  </div>
  <router-view />
</template>

<script>
export default {
  mounted() {
    const recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://use.fontawesome.com/aa4ffc396e.js"
    );
    document.head.appendChild(recaptchaScript);
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

#nav {
  background-color: var(--bg-card);
  padding: 5px 10px;
}

#nav a {
  color: inherit;
  text-decoration: none;
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
}
</style>
