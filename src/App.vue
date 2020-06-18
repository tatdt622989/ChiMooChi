<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
// 這裡的scss會套用到全部的元件上，但是因為vue-loader在轉換成css的時候是分元件轉換，所以
// 變數必須在每一個元件上載入(使用vue.config.js)，才能夠在轉換的時候讀得到變數。
@import "./assets/scss/app.scss";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
