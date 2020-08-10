<template>
  <div class="container">
    <div class="row">
      <h1 class="f-lg-30 f-24 mt-lg-16 mb-lg-45 mt-12 mb-30 w-100">購物車清單</h1>
      <div class="col-lg-8 col-md-7">
        <ul class="shopping-cart-list p-0 m-0">
          <li
            class="shopping-cart-list-item mb-24"
            v-for="obj in shoppingCart.carts"
            :key="obj.id"
          >
            <div class="product-img">
              <img :src="obj.product.imageUrl">
            </div>
            <h2 class="tilte f-16
            text-overflow text-left">{{ obj.product.title }}</h2>
            <Counter
              :qty="obj.qty"
              @update:qty="changeShoppingCartPage(obj, $event)"
              :unit.sync="obj.product.unit"
            />
            <p class="price font-weight-bold">
              {{ obj.coupon ? obj.total * (obj.coupon.percent / 100)
              : obj.total | currency }}
              <br><span v-if="obj.coupon" class="f-14 text-primary">已套用優惠券</span>
            </p>
            <button
              class="btn-square btn-outline-danger shopping-cart-list-item-delete-btn"
              @click="openDeleteModal(obj)"
            >
              <span class="material-icons">delete</span>
            </button>
          </li>
        </ul>
        <div
          class="h-100 d-flex justify-content-center align-content-center flex-wrap py-45"
          v-if="!('carts' in shoppingCart) || shoppingCart.carts.length === 0"
        >
          <p class="f-20 f-md-24 w-100 mb-20">購物車內沒有商品喔！</p>
          <router-link to="products" class="btn btn-tertiary">去逛逛</router-link>
        </div>
      </div>
      <div
        class=" col-lg-4 col-md-5 total text-left"
      >
        <div class="total-body" :class="{ fixed : isFixed }">
          <p class="flex-grow-1">商品共計</p>
          <p class="flex-grow-1 font-weight-bold text-right">
            {{ shoppingCart.total | currency }}
          </p>
          <div class="total-coupon mt-20">
            <ValidationObserver
              ref="form"
              class="w-100"
              tag="form"
              @submit.prevent="applyCoupon"
            >
              <ValidationProvider
                tag="div"
                rules="alpha_dash"
                v-slot="{ errors, failed }"
              >
                <div class="d-flex">
                  <input
                  class="total-coupon-input form-control mr-16"
                  :class="{ 'is-invalid' : failed }"
                  type="text"
                  placeholder="請輸入優惠券序號"
                  v-model="coupon"
                  >
                  <button
                  class="btn btn-secondary flex-shrink-0 total-coupon-apply-btn"
                  type="submit"
                  >套用</button>
                </div>
                <div
                  class="invalid-feedback"
                  :style="{ display : failed ? 'block' : 'none' }"
                >{{ errors[0] }}</div>
              </ValidationProvider>
            </ValidationObserver>
          </div>
          <p class="mt-20 w-75">優惠券折抵</p>
          <p class="mt-20 font-weight-bold text-right w-25">
            {{ shoppingCart.total - shoppingCart.final_total | currency }}
          </p>
          <p class="mt-20 w-25">合計</p>
          <p class="f-24 font-weight-bold mt-20 text-danger text-right w-75">
            {{ shoppingCart.final_total | currency }}
          </p>
          <router-link
            class="btn btn-tertiary mt-20 w-100"
            to="/checkout/order-form"
          >結帳去</router-link>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
    <div class="modal-dialog modal-sm modal-dialog-centered " role="document">
      <div class="delete-modal-content modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteModalLabel">刪除</h5>
          <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body f-20">
          確定要從購物車刪除商品"{{ deleteModalMsg }}"嗎?"
        </div>
        <div class="modal-footer delete-modal-footer">
          <button type="button" class="cancel-btn btn btn-white" data-dismiss="modal">取消</button>
          <button
            type="button"
            class="delete-btn btn btn-outline-white"
            @click="deleteProduct"
          >確定刪除</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import Counter from '@/components/Catalog/Counter.vue';

export default {
  name: 'ShoppingCart',
  components: {
    Counter,
  },
  props: ['shoppingCart'],
  data() {
    return {
      tempProductId: '',
      deleteModalMsg: '',
      isFixed: false,
      coupon: '',
      couponMessage: '',
    };
  },
  methods: {
    updateShoppingCart() {
      this.$bus.$emit('shopping-cart:update');
    },
    openDeleteModal(product) {
      const vm = this;
      $('#deleteModal').modal('show');
      vm.deleteModalMsg = product.product.title;
      vm.tempProductId = product.id;
    },
    deleteProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${vm.tempProductId}`;
      const loader = vm.$loading.show({}, {
        default: vm.$createElement('LogoLoadingAnimation'),
      });
      vm.$http.delete(api).then(() => {
        loader.hide();
        $('#deleteModal').modal('hide');
        vm.updateShoppingCart();
      });
    },
    changeShoppingCartPage(obj, qty) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const loader = vm.$loading.show({}, {
        default: vm.$createElement('LogoLoadingAnimation'),
      });
      const product = obj;
      product.qty = qty;
      vm.tempProductId = product.id;
      vm.deleteProduct();
      vm.$http.post(api, { data: obj }).then(() => {
        loader.hide();
        vm.$bus.$emit('shopping-cart:update');
        vm.$bus.$emit('message:push', '成功', '商品已成功加入購物車', 'success');
      });
    },
    applyCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      vm.$refs.form.validate().then((success) => {
        if (success) {
          const loader = vm.$loading.show({}, {
            default: vm.$createElement('LogoLoadingAnimation'),
          });
          vm.$http.post(api, { data: { code: vm.coupon } }).then((response) => {
            if (response.data.success) {
              vm.couponMessage = response.data.message;
              vm.$bus.$emit('message:push', '成功', response.data.message, 'success');
            } else {
              vm.$bus.$emit('message:push', '錯誤', response.data.message, 'danger');
            }
            loader.hide();
            vm.updateShoppingCart();
          });
        }
      });
    },
  },
  mounted() {
    const vm = this;
    $(window).scroll(() => {
      if ($(window).scrollTop() > 182) {
        vm.isFixed = true;
      } else {
        vm.isFixed = false;
      }
    });
  },
  destroyed() {
    $(window).off('scroll');
  },
};
</script>
<style lang="scss">
.shopping-cart-list {
  .product-img {
    @include media-breakpoint-up(xs) {
      height: 72px;
      order: -3;
      left: 12px;
      position: absolute;
      top: 12px;
      width: 72px;
    }
    @include media-breakpoint-up(sm) {
      width: 96px;
      height: 96px;
      margin-bottom: 0;
      width: 80px;
    }
    @include media-breakpoint-up(md) {
      height: 96px;
      left: 12px;
      margin-bottom: 12px;
      position: absolute;
      top: 12px;
      width: 76px;
    }
    @include media-breakpoint-up(lg) {
      height: 75px;
      left: auto;
      margin-bottom: 0;
      order: 0;
      position: static;
      top: auto;
      width: 100px;
    }
    img {
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
    background-color: $img-link-bg-color;
    flex-shrink: 0;
    overflow: hidden;
  }
  .tilte {
    @include media-breakpoint-up(xs) {
      margin-bottom: 8px;
      order: -2;
      width: 100%
    }
    @include media-breakpoint-up(sm) {
      margin-right: 6px;
      width: 40%;
    }
    @include media-breakpoint-up(md) {
      width: 30%;
    }
    @include media-breakpoint-up(lg) {
      padding: 0 6px 0 12px;
      margin: 0;
      order: 0;
      width: 120px;
    }
    @include media-breakpoint-up(xl) {
      padding: 0 8px 0 16px;
      width: 132px;
    }
    flex-grow: 1;
  }
  .price {
    @include media-breakpoint-up(xs) {
      flex-grow: 2;
      flex-shrink: 2;
      margin-bottom: 8px;
      text-align: left;
      width: 50%;
    }
    @include media-breakpoint-up(sm) {
      flex-grow: 1;
      margin-bottom: 0;
      margin-right: 12px;
      width: 80px;
    }
    @include media-breakpoint-up(md) {
      width: 50%;
      text-align: left;
    }
    @include media-breakpoint-up(lg) {
      margin: 0;
      padding-left: 24px;
      order: 0;
      text-align: left;
      width: 70px;
    }
    @include media-breakpoint-up(xl) {
      padding: 0 16px 0 32px;
      width: 90px;
    }
    font-size: 16px;
  }
  .shopping-cart-list-item-delete-btn {
    @include media-breakpoint-up(xs) {
      margin-bottom: 8px;
    }
    @include media-breakpoint-up(sm) {
      margin-bottom: 0;
    }
  }
  .counter {
    @include media-breakpoint-up(xs) {
      margin-bottom: 8px;
      margin-right: 100px;
    }
    @include media-breakpoint-up(sm) {
      margin-right: 0;
    }
    @include media-breakpoint-up(md) {
      margin-left: 12px;
    }
    @include media-breakpoint-up(lg) {
      margin: 0;
    }
  }
  .counter-quantity {
    @include media-breakpoint-up(md) {
      padding: 0 4px;
      width: 40px;
    }
    @include media-breakpoint-up(lg) {
      padding: 0 12px;
      width: 60px;
    }
  }
  position: relative;
}
.shopping-cart-list-item {
  @include media-breakpoint-up(xs) {
    align-items: center;
    flex-wrap: wrap;
    padding: 12px 12px 4px 96px;
  }
  @include media-breakpoint-up(sm) {
    padding-bottom: 12px;
    padding-left: 104px;
  }
  @include media-breakpoint-up(md) {
    padding-left: 100px;
  }
  @include media-breakpoint-up(lg) {
    padding: 16px;
    flex-wrap: nowrap;
  }
  align-items: center;
  border: 1px solid $secondary;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.total {
  font-size: 16px;
  padding-bottom: 24px;
}
.total-body {
  @include media-breakpoint-up(xs) {
    padding: 20px 12px;
  }
  @include media-breakpoint-up(lg) {
    padding: 24px 16px;
  }
  &.fixed {
    @include media-breakpoint-up(md) {
      position: sticky;
      top: 24px;
      width: 270px;
    }
    @include media-breakpoint-up(lg) {
      width: 290px;
    }
    @include media-breakpoint-up(xl) {
      width: 350px;
    }
  }
  align-items: center;
  background-color: $shopping-cart-bg-color;
  display: flex;
  flex-wrap: wrap;
}
.total-coupon {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.total-coupon-apply-btn {
  padding: 9px 15px 9px 15px;
}
.total-coupon-input {
  padding-left: 16px;
  border: 0;
  flex-grow: 1;
  width: 100%;
}
// .home-delivery-btn:active,  .cash-on-delivery-btn:active{
//   background-color: $secondary;
// }
.delete-modal-content {
  background-color: $danger;
  color: #fff;
}
.delete-modal-footer {
  .cancel-btn {
    color: $danger;
  }
  .delete-btn {
    &:hover {
      color: $danger;
    }
  }
}
</style>
