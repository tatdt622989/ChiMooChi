<template>
  <div class="favorite-modal modal fade" id="exampleModal">
    <div class="modal-dialog modal-sm modal-lg" role="document">
      <div class="modal-content" tabindex="-1" role="dialog">
        <div class="modal-header">
          <h5 class="modal-title">我的最愛</h5>
          <button type="button" class="close p-16" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <ul class="m-0 p-0">
            <li
              class="favorite-modal-item flex-wrap border-bottom border-light"
              v-for="(obj, index) in favoriteProducts"
              :key="obj.id"
            >
              <div class="favorite-modal-product-img">
                <img :src="obj.imageUrl" />
              </div>
              <p class="product-title text-overflow">{{ obj.title }}</p>
              <!-- 在這裡的$event等同於emit傳來的第一個參數 -->
              <Counter
                :qty.sync="obj.qty"
                :unit="obj.unit"
                @update:qty="updateQty($event, index)"
              />
              <p class="price font-weight-bold">
                {{ obj.price * obj.qty | currency }}
              </p>
              <div class="btn-group">
                <button
                  class="btn-square btn-outline-secondary mr-16"
                  @click="addToShoppingCart(obj, index)"
                >
                  <span class="material-icons">shopping_cart</span>
                </button>
                <button
                  class="btn-square btn-outline-danger"
                  @click="updateFavorite('delete', null, index)"
                >
                  <span class="material-icons">delete</span>
                </button>
              </div>
            </li>
          </ul>
          <div
            class="favorite-modal-empty"
            v-if="favoriteProducts.length === 0"
          >
            <p class="mb-3 fz-3">還沒有最愛的商品喔！</p>
            <a href class="btn btn-tertiary text-white">去逛逛</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Counter from '@/components/Catalog/Counter.vue';

export default {
  name: 'Favorite',
  props: ['shopping-cart'],
  components: {
    Counter,
  },
  data() {
    return {
      favoriteProducts: [],
      allProducts: [],
      product: {},
    };
  },
  methods: {
    getFavorite() {
      const vm = this;
      if (localStorage.getItem('favoriteProducts')) {
        vm.favoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts'));
      }
    },
    addToShoppingCart(obj, index) {
      const vm = this;
      const productsApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      const loader = vm.$loading.show({}, {
        default: vm.$createElement('LogoLoadingAnimation'),
      });
      vm.$http.get(productsApi).then((response) => {
        vm.allProducts = response.data.products;
        const matchIndex = vm.allProducts.findIndex((product) => product.id === obj.id);
        loader.hide();
        if (matchIndex === -1) {
          vm.updateFavorite('delete', undefined, index);
          vm.$bus.$emit('message:push', '提醒', '此產品已經下架', 'warning');
        } else {
          const internalLoader = vm.$loading.show({}, {
            default: vm.$createElement('LogoLoadingAnimation'),
          });
          const matchProduct = vm.shoppingCart.carts.filter((shoppingCartObj) => {
            if (shoppingCartObj.product_id === obj.id) {
              return obj;
            }
            return false;
          });
          const productInfo = {};
          const cartApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
          if (matchProduct.length !== 0) {
            console.log(matchProduct);
            const deleteApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${matchProduct[0].id}`;
            productInfo.qty = matchProduct[0].qty + obj.qty;
            vm.$http.delete(deleteApi).then(() => {
              productInfo.product_id = obj.id;
              vm.$http.post(cartApi, { data: productInfo }).then(() => {
                internalLoader.hide();
                vm.$bus.$emit('shopping-cart:update');
                vm.$bus.$emit('message:push', '成功', '商品已成功加入購物車', 'success');
              });
            });
          } else {
            productInfo.qty = obj.qty;
            productInfo.product_id = obj.id;
            vm.$http.post(cartApi, { data: productInfo }).then(() => {
              internalLoader.hide();
              vm.$bus.$emit('shopping-cart:update');
              vm.$bus.$emit('message:push', '成功', '商品已成功加入購物車', 'success');
            });
          }
        }
      });
    },
    updateFavorite(method, product, index) {
      const vm = this;
      if (method === 'add') {
        vm.favoriteProducts.push(product);
      }
      if (method === 'delete') {
        vm.favoriteProducts.splice(index, 1);
      }
      const stringify = JSON.stringify(vm.favoriteProducts);
      localStorage.setItem('favoriteProducts', stringify);
      vm.$emit('favorite-products', vm.favoriteProducts);
    },
    updateQty(qty, index) {
      const i = index;
      this.favoriteProducts[i].qty = qty;
      const stringify = JSON.stringify(this.favoriteProducts);
      localStorage.setItem('favoriteProducts', stringify);
    },
  },
  created() {
    const vm = this;
    vm.$bus.$on('favorite:update', (method, product, index) => {
      vm.updateFavorite(method, product, index);
    });
    vm.getFavorite();
    vm.$emit('favorite-products', vm.favoriteProducts);
  },
};
</script>

<style lang="scss" scoped>
.favorite-modal {
  .modal-dialog {
    @include media-breakpoint-up(xs) {
      margin-top: 76px;
    }
    @include media-breakpoint-up(sm) {
      margin-top: 76px;
    }
    @include media-breakpoint-up(md) {
      margin-top: 76px;
      max-width: 630px;
    }
    @include media-breakpoint-up(lg) {
      margin-top: 100px;
      max-width: 730px;
    }
  }
  .modal-content {
    @include media-breakpoint-up(xs) {
      min-height: 510px;
    }
    @include media-breakpoint-up(sm) {
      min-height: 570px;
    }
    @include media-breakpoint-up(lg) {
      min-height: 730px;
    }
    box-shadow: 2px 0px 6px rgba(0, 0, 0, 0.4);
  }
  .modal-header {
    @include media-breakpoint-up(xs) {
      padding: 12px;
    }
    @include media-breakpoint-up(sm) {
      padding: 16px;
    }
  }
  .modal-body {
    @include media-breakpoint-up(xs) {
      padding: 0 12px 0 12px;
    }
    @include media-breakpoint-up(sm) {
      padding: 16px 16px 0 16px;
    }
  }
}
.favorite-modal-item {
  @include media-breakpoint-up(xs) {
    align-items: center;
    padding: 12px 0 12px 80px;
  }
  @include media-breakpoint-up(sm) {
    padding-left: 104px;
  }
  @include media-breakpoint-up(md) {
    padding: 16px 0;
  }
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  position: relative;
}
.counter {
  @include media-breakpoint-up(xs) {
    margin-bottom: 8px;
  }
  @include media-breakpoint-up(sm) {
    margin-left: 0;
  }
}
.product-title,
.price {
  @include media-breakpoint-up(md) {
    margin-left: 0;
  }
  text-align: left;
}
.product-title {
  @include media-breakpoint-up(xs) {
    font-size: 16px;
    margin-bottom: 8px;
    text-align: left;
    width: 45%;
  }
  @include media-breakpoint-up(sm) {
    font-size: 16px;
    width: 40%;
  }
  @include media-breakpoint-up(md) {
    margin-left: 0px;
    width: 136px;
  }
  @include media-breakpoint-up(lg) {
    width: 186px;
  }
}
.price {
  @include media-breakpoint-up(xs) {
    flex-grow: 0;
    font-size: 16px;
    text-align: left;
    width: 30%;
  }
  @include media-breakpoint-up(sm) {
    font-size: 16px;
    margin-bottom: 0px;
    width: 100px;
  }
  @include media-breakpoint-up(md) {
    width: 70px;
    text-align: center;
  }
  @include media-breakpoint-up(lg) {
    width: 100px;
  }
}
.favorite-modal-product-img {
  @include media-breakpoint-up(xs) {
    flex-shrink: 0;
    height: 96px;
    left: 0;
    position: absolute;
    top: 12px;
    width: 72px;
  }
  @include media-breakpoint-up(sm) {
    height: 96px;
    width: 96px;
  }
  @include media-breakpoint-up(md) {
    height: 60px;
    position: static;
    width: 80px;
  }
  @include media-breakpoint-up(lg) {
    height: 75px;
    width: 100px;
  }
  img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
  background-color: $img-link-bg-color;
}
.btn-group {
  @include media-breakpoint-up(xs) {
    display: flex;
    flex-basis: 10%;
    flex-grow: 0;
    justify-content: flex-end;
  }
  @include media-breakpoint-up(sm) {
  }
}
.favorite-modal-empty {
  height: 100px;
  left: 50%;
  margin-left: -150px;
  margin-top: -50px;
  position: absolute;
  top: 50%;
  width: 300px;
}
</style>
