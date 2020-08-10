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
@import "./assets/scss/app.scss";
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html, body, #app {
  height: 100%;
}
.base-enter-active, .base-leave-active{
  transition: $transition-base;
}
.base-enter, .base-leave-to {
  opacity: 0;
}
</style>
