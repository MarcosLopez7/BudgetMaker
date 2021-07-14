<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/accounts">Accounts</router-link>
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

body {
  background-color: var(--bg-color);
  color: var(--color-text);
  font-weight: 300;
  margin: 0;
}
</style>
