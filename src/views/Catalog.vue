<template>
  <div class="catalog">
    <Navbar />
    <Favorite />
    <router-view />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Catalog/Navbar.vue';
import Favorite from '@/components/Catalog/Favorite.vue';
import Footer from '@/components/Catalog/Footer.vue';

export default {
  name: 'Catalog',
  components: {
    Navbar,
    Favorite,
    Footer,
  },
  created() {
  },
};
</script>

<style lang="scss">
</style>
