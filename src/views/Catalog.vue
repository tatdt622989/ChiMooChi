<template>
  <div class="catalog">
    <Navbar />
    <Favorite />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/catalog/Navbar.vue';
import Favorite from '@/components/catalog/Favorite.vue';
import Footer from '@/components/catalog/Footer.vue';

export default {
  name: 'Catalog',
  components: {
    Navbar,
    Favorite,
    Footer,
  },
  created() {
    // eslint-disable-next-line no-console
    console.log(process.env.VUE_APP_API);
  },
};
</script>

<style lang="scss">
.card {
  height: auto;
  display: flex;
  align-content: space-between;
}

.card-img-link {
  @include media-breakpoint-up(xs) {
    height: 132px;
    margin: 12px 12px 6px 12px;
  }
  @include media-breakpoint-up(sm) {
    height: 214px;
    margin: 12px 12px 11px 12px;
  }
  @include media-breakpoint-up(md) {
    height: 184px;
    margin: 12px 12px 7px 12px;
  }
  @include media-breakpoint-up(lg) {
  }
  @include media-breakpoint-up(xl) {
    height: 229px;
    margin: 12px 12px 14px 12px;
  }
  background-color: $img-link-bg-color;
  width: auto;
}

.card-btn-group {
  @include media-breakpoint-up(xs) {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  @include media-breakpoint-up(sm) {
    width: auto;
  }
  display: flex;
  height: 44px;
}

.card-body {
  @include media-breakpoint-up(xs) {
    .card-title {
      margin-bottom: 7px;
    }
    .product-price {
      .original-price {
        font-size: 16px;
        margin-right: 10px;
      }
      .on-sale-price {
        font-size: 20px;
      }
      align-items: center;
      display: flex;
      line-height: 1;
      margin-bottom: 16px;
    }
    padding-top: 0px;
  }
  @include media-breakpoint-up(sm) {
    .card-title {
      margin-bottom: 12px;
    }
    .product-price {
      .on-sale-price {
        margin-top: 8px;
      }
      display: block;
      margin-bottom: 0;
    }
  }
  @include media-breakpoint-up(md) {
    .card-title {
      h3 {
        font-size: 18px;
      }
      margin-bottom: 7px;
    }
  }
  @include media-breakpoint-up(xl) {
    .card-title {
      h3 {
        font-size: 20px;
      }
      margin-bottom: 15px;
    }
  }
  .card-title {
    h3 {
      margin-bottom: 0;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    width: 100%;
  }
  .product-price {
    .original-price {
      color: $gray-500;
    }
    .on-sale-price {
      color: $danger;
      font-weight: bold;
    }
  }
  align-content: space-between;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
