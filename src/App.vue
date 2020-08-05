<template>
  <div id="app">
    <Toast />
    <router-view/>
  </div>
</template>

<script>
import Toast from '@/components/Toast.vue';

export default {
  name: 'App',
  components: {
    Toast,
  },
};
</script>

<style lang="scss">
// 這裡的scss會套用到全部的元件上，但是因為vue-loader在轉換成css的時候是分元件轉換，所以
// 變數必須在每一個元件上載入(使用vue.config.js)，才能夠在轉換的時候讀得到變數。
@import "./assets/scss/app.scss";
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.base-enter-active, .base-leave-active{
  transition: $transition-base;
}
.base-enter, .base-leave-to {
  opacity: 0;
}
</style>
