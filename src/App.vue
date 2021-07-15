<template>
  <div id="nav">
    <h1>Budget Maker</h1>
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/accounts">Accounts</router-link> -->
  </div>
  <router-view />
</template>

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

body {
  background-color: var(--bg-color);
  color: var(--color-text);
  font-weight: 300;
  font-size: 18px;
  margin: 0;
  font-family: "Times New Roman", Times, serif;
}
</style>
