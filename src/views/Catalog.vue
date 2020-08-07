<template>
  <div class="catalog">
    <Navbar
      :favorite-products="favoriteProducts"
      @shopping-cart="getShoppingCart"
    />
    <Favorite
      @favorite-products="getFavoriteProducts"
    />
    <router-view
      :shopping-cart="shoppingCart"
      :favorite-products="favoriteProducts"
    />
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
      favoriteProducts: [],
      shoppingCart: {},
    };
  },
  methods: {
    getFavoriteProducts(products) {
      this.favoriteProducts = products;
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
