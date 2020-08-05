<template>
  <div class="catalog">
    <Navbar
      :favorite-length="favoriteLength"
      @shopping-cart="getShoppingCart"
    />
    <Favorite
      @favorite-length="getFavoriteLength"
    />
    <router-view :shopping-cart="shoppingCart" />
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
      shoppingCart: {},
    };
  },
  methods: {
    getFavoriteLength(Length) {
      this.favoriteLength = Length;
    },
    getShoppingCart(shoppingCart) {
      console.log('有被觸發');
      this.shoppingCart = shoppingCart;
    },
  },
};
</script>

<style lang="scss">
</style>
