<template>
  <div class="card">
    <router-link :to="`/product-info/${product.id}`" class="card-img-link">
      <img :src="product.imageUrl" class="card-img" />
    </router-link>
    <div class="card-body">
      <a class="card-title" href="#">
        <h3>{{ product.title }}</h3>
      </a>
      <div class="product-price">
        <del class="original-price">{{ product.origin_price | currency }}</del>
        <p class="on-sale-price">{{ product.price | currency }}</p>
      </div>
      <div class="card-btn-group">
        <button
          class="btn-square btn-danger mr-12"
          :class="[ isRemove ? 'btn-danger' : 'btn-dark' ]"
          @click="updateFavorite()"
        >
          <transition name="base">
            <span class="material-icons" v-if="isRemove">favorite</span>
            <span class="material-icons" v-if="!isRemove">favorite_border</span>
          </transition>
        </button>
        <button
        class="btn-square btn-primary"
        @click="addToShoppingCart(product.id)"
        >
          <span class="material-icons">shopping_cart</span>
        </button>
      </div>
    </div>
    <div
      class="sold-out"
      v-if="!product.is_enabled"
    >
    <div class="border border-white">
      <p>已售完</p>
    </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Card',
  props: ['product', 'favoriteProducts', 'shopping-cart'],
  data() {
    return {
      isRemove: false,
      matchIndex: 0,
    };
  },
  methods: {
    updateFavorite() {
      const vm = this;
      if (vm.matchIndex === -1) {
        vm.$set(vm.product, 'qty', 1);
        vm.$bus.$emit('favorite:update', 'add', vm.product);
      } else {
        vm.$bus.$emit('favorite:update', 'delete', undefined, vm.matchIndex);
      }
    },
    addToShoppingCart(productId) {
      const vm = this;
      const loader = vm.$loading.show({}, {
        default: vm.$createElement('LogoLoadingAnimation'),
      });
      const matchProduct = vm.shoppingCart.carts.filter((obj) => {
        if (obj.product_id === productId) {
          return obj;
        }
        return false;
      });
      const addApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const productInfo = {};
      productInfo.product_id = productId;
      if (matchProduct.length !== 0) {
        const deleteApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${matchProduct[0].id}`;
        productInfo.qty = matchProduct[0].qty + 1;
        vm.$http.delete(deleteApi).then(() => {
          vm.$http.post(addApi, { data: productInfo }).then(() => {
            loader.hide();
            vm.$bus.$emit('shopping-cart:update');
            vm.$bus.$emit('message:push', '成功', '商品已成功加入購物車', 'success');
          });
        });
      } else {
        productInfo.qty = 1;
        vm.$http.post(addApi, { data: productInfo }).then(() => {
          loader.hide();
          vm.$bus.$emit('shopping-cart:update');
          vm.$bus.$emit('message:push', '成功', '商品已成功加入購物車', 'success');
        });
      }
    },
    getBtnState() {
      const vm = this;
      vm.matchIndex = vm.favoriteProducts.findIndex((obj) => obj.id === vm.product.id);
      if (vm.matchIndex === -1) {
        vm.isRemove = false;
      } else {
        vm.isRemove = true;
      }
    },
  },
  watch: {
    favoriteProducts() {
      this.getBtnState();
    },
  },
  created() {
    this.getBtnState();
  },
};
</script>

<style lang="scss">
.card {
  align-content: space-between;
  display: flex;
  height: auto;
  position: relative;
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
  animation: product-loading 1s ease-in-out infinite normal;
  @keyframes product-loading {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 100% 100%;
    }
  }
  background: no-repeat
  linear-gradient(90deg, $light 0%, $light 20%, $gray-300 40%,
  $gray-300 60%, $light 80%, $light 100% ) 0/1000%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: auto;
}

.card-img {
  &:hover {
    transform: scale(1.2);
  }
  transition: $transition-base;
  height: 100%;
  object-fit: cover;
  width: 100%;
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
      justify-content: space-between;
      line-height: 1;
      margin-bottom: 16px;
      width: 100%;
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
      width: auto;
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
    text-align: left;
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
    text-align: left;
  }
  align-content: space-between;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.sold-out {
  p {
    @include media-breakpoint-up(xs) {
      margin: 10px 16px;
    }
    @include media-breakpoint-up(md) {
      margin: 10px 32px;
    }
  }
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  display: flex;
  font-size: 28px;
  font-weight: bold;
  height: 100%;
  justify-content: center;
  position: absolute;
  width: 100%;
}
</style>
