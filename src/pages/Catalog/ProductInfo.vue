<template>
  <div class="container">
    <Breadcrumb class="mb-16" :product="product"/>
    <div class="row product-info">
      <div class="col-md-6 col-12 product-info-img-link">
        <img :src="product.imageUrl" />
      </div>
      <div class="col-12 col-md-6 text-left d-flex flex-column">
        <p class="badge badge-secondary">{{ product.category }}</p>
        <h1 class="f-lg-30 f-24 mb-lg-32 mb-md-24 mb-16">{{ product.title }}</h1>
        <div class="product-info-price">
          <p class="text-danger f-lg-28 f-20 font-weight-bold mr-lg-24
          mr-12">{{ product.price | currency }}</p>
          <del class="f-lg-20 f-16 text-dark">{{ product.origin_price | currency }}</del>
        </div>
        <h2 class="font-weight-bold f-16 f-md-20">
          產品尺寸
        </h2>
        <p class="f-14 f-sm-16 mb-lg-20 mb-md-24 mb-20">
          尺寸:  長1.2m x 寬0.6m x 高1.0m<br>材質:  皮革、泡棉、木材
        </p>
        <h2 class="font-weight-bold f-16 f-md-20">
            產品說明
        </h2>
        <p class="f-14 f-md-16 mb-lg-45 mb-md-24 mb-24">
          皮製經典復古沙發，是由多位大師級的工匠和設計師，
          經過不容妥協的選材和設計，再經由專家嚴格的多項耐用性和安全性的測試，
          聯手打造出兼具尊爵的視覺饗宴以及最高等級的使用體驗的產品。
        </p>
        <div class="d-flex align-items-center">
          <span class="f-lg-20 mr-lg-32 mr-16">數量：</span>
          <Counter :unit="product.unit" :qty.sync="qty"/>
        </div>
        <div class="product-info-btn-group">
          <button
            class="btn product-info-favorite"
            :class="[ isRemove ? 'btn-danger' : 'btn-dark' ]"
            @click="updateFavorite()"
          >{{ isRemove ? '從我的最愛移除' : '加入我的最愛' }}</button>
          <button
            class="btn btn-tertiary product-info-cart"
            @click="addToShoppingCart(product.id)">加入購物車</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Catalog/Breadcrumb.vue';
import Counter from '@/components/Catalog/Counter.vue';

export default {
  name: 'ProductInfo',
  components: {
    Breadcrumb,
    Counter,
  },
  props: ['favoriteProducts', 'shopping-cart'],
  data() {
    return {
      product: {},
      productId: '',
      qty: 1,
      matchIndex: 0,
      isRemove: false,
    };
  },
  methods: {
    getProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.productId}`;
      const loader = vm.$loading.show({}, {
        default: vm.$createElement('LogoLoadingAnimation'),
      });
      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.product = response.data.product;
          vm.getBtnState();
        } else {
          vm.$router.push('/');
        }
        loader.hide();
      });
    },
    updateFavorite() {
      const vm = this;
      if (vm.matchIndex === -1) {
        vm.$set(vm.product, 'qty', vm.qty);
        vm.$bus.$emit('favorite:update', 'add', vm.product);
      } else {
        vm.$bus.$emit('favorite:update', 'delete', undefined, vm.matchIndex);
      }
    },
    addToShoppingCart(productId) {
      const vm = this;
      const matchProduct = vm.shoppingCart.carts.filter((obj) => {
        if (obj.product_id === productId) {
          return obj;
        }
        return false;
      });
      const addApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const loader = vm.$loading.show({}, {
        default: vm.$createElement('LogoLoadingAnimation'),
      });
      const productInfo = {};
      productInfo.product_id = productId;
      if (matchProduct.length !== 0) {
        const deleteApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${matchProduct[0].id}`;
        productInfo.qty = matchProduct[0].qty + vm.qty;
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
    const vm = this;
    vm.productId = vm.$route.params.id;
    vm.getProduct();
  },
};
</script>

<style lang="scss">
.product-info {
  @include media-breakpoint-up(xs) {
    margin-bottom: 45px;
  }
  @include media-breakpoint-up(sm) {
    min-height: 360px;
    margin-bottom: 45px;
  }
  @include media-breakpoint-up(md) {
    min-height: 480px;
    margin-bottom: 60px;
  }
  @include media-breakpoint-up(lg) {
    min-height: 570px;
    margin-bottom: 90px;
  }
  .badge {
    @include media-breakpoint-up(xs) {
      font-size: 16px;
      height: 28px;
      margin: 12px 0;
      width: 88px;
    }
    @include media-breakpoint-up(md) {
      font-size: 20px;
      height: 32px;
      margin: 0 0 24px 0;
      width: 100px;
    }
    align-items: center;
    background-color: $dark;
    border-radius: 0;
    color: #fff;
    display: flex;
    justify-content: center;
  }
}
.product-info-img-link{
  @include media-breakpoint-up(xs) {
    margin-bottom: 16px;
    height: 240px;
  }
  @include media-breakpoint-up(sm) {
    margin-bottom: 0;
  }
  @include media-breakpoint-up(md) {
    height: 600px;
  }
  @include media-breakpoint-up(lg) {
    height: 720px;
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
  img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
  background: no-repeat
  linear-gradient(90deg, $light 0%, $light 20%, $gray-300 40%,
  $gray-300 60%, $light 80%, $light 100% ) 0/1000%;
  background-color: $img-link-bg-color;
  background-clip: content-box;
}
.product-info-price {
  @include media-breakpoint-up(xs) {
    height: 45px;
    margin-bottom: 16px;
    padding: 6px 16px 6px 16px;
  }
  @include media-breakpoint-up(md) {
    height: 45px;
    margin-bottom: 24px;
  }
  @include media-breakpoint-up(lg) {
    height: 60px;
    margin-bottom: 32px;
    padding: 8px 24px 8px 24px;
  }
  align-items: center;
  border: 1px solid $light;
  display: flex;
}
.product-info-btn-group {
  @include media-breakpoint-up(xs) {
    margin-top: 32px;
  }
  @include media-breakpoint-up(sm) {
    margin-top: 32px;
  }
  @include media-breakpoint-up(md) {
    flex-basis: auto;
    flex-grow: 1;
  }
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
}
.product-info-favorite, .product-info-cart {
  flex-grow: 1;
  height: 60px;
  padding: 0;
}
.product-info-favorite {
  margin-right: 30px;
}
</style>
