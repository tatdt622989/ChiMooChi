<template>
  <div class="catalog">
    <Navbar/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/catalog/Navbar.vue';
import Footer from '@/components/catalog/Footer.vue';

export default {
  name: 'Catalog',
  components: {
    Navbar,
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

.product-img {
  @include media-breakpoint-up (xs) {
    height: 134px;
    margin: 11px 11px 9px 11px;
  }
  @include media-breakpoint-up (sm) {
    height: 216px;
    margin: 11px 11px 11px 11px;
  }
  @include media-breakpoint-up (md) {
    height: 186px;
    margin: 11px 11px 5px 11px;
  }
  @include media-breakpoint-up (lg) {
    height: 186px;
    margin: 11px 11px 5px 11px;
  }
  @include media-breakpoint-up (xl) {
    height: 231px;
  }
  background-color: $gray-400;
  width: auto;
}

.card-body {
  @include media-breakpoint-up (xs) {
    .card-title {
      margin-bottom: 9px;
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
    }
    .card-btn-group {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      width: 100%
    }
    padding-top: 0px;
  }
  @include media-breakpoint-up (sm) {
    .card-title {
      margin-bottom: 0px;
    }
    .product-price {
      .on-sale-price {
        margin-top: 8px;
      }
      display: block;
      margin-top: 11px;
    }
    .card-btn-group {
      margin-top: 10px;
      width: auto;
    }
  }
  @include media-breakpoint-up (md) {
    .card-btn-group {
      margin-top: 5px;
    }
    .product-price {
      margin-top: 5px;
    }
  }
  @include media-breakpoint-up (lg) {
  }
  @include media-breakpoint-up (xl) {
    .card-title {
      margin-bottom: 6px;
    }
  }
  .card-title{
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    white-space: nowrap;
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
  .card-btn-group {
    button {
      border: 0;
      color: $white;
      padding: 10px;
      transition: $transition-base;
    }
    .favorite {
      &:hover,&:active {
        background-color: $gray-500;
      }
      margin-right: 12px;
      background-color: $gray-400;
    }
    .add-to-cart {
      &:hover,&:active {
        background-color: $tertiary;
      }
      background-color: $primary;
    }
    display: flex;
    height: 44px;
  }
  align-content: space-between;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
