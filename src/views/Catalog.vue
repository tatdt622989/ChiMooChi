<template>
  <div class="catalog">
    <Navbar :favorite-length="favoriteLength"/>
    <Favorite
      @favorite-length="getFavoriteLength"
      @update-shopping-cart="updateShoppingCart = true"
    />
    <router-view :update-shopping-cart.sync="updateShoppingCart"/>
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
  data() {
    return {
      favoriteLength: 0,
      updateShoppingCart: false,
    };
  },
  methods: {
    getFavoriteLength(Length) {
      this.favoriteLength = Length;
    },
  },
  created() {
  },
};
</script>

<style lang="scss">
</style>
