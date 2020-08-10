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
      this.shoppingCart = shoppingCart;
    },
  },
};
</script>

<style lang="scss">
.catalog {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
