<template>
  <iframe :src="`${publicPath}logo-loading-animation.html`" frameborder="0"></iframe>
</template>

<script>
export default {
  name: 'LogoLoadingAnimation',
  data() {
    return {
      // 靜態資源位址
      publicPath: process.env.BASE_URL,
    };
  },
};
</script>

<style lang="scss">
</style>
