<template>
  <div class="container">
    <div class="row mb-lg-90 mb-md-60 mb-45">
      <h1 class="f-lg-30 f-24 mt-lg-16 mb-lg-45 mt-12 mb-30 w-100">購物車清單</h1>
      <div class="col-lg-8 col-md-7">
        <ul class="shopping-cart-list p-0 m-0">
          <li
            class="shopping-cart-list-item p-xl-16 p-md-12 p-sm-16 p-12 mb-24"
            v-for="obj in shoppingCart"
            :key="obj.product.id"
          >
            <a href="#" class="img-link">
              <img :src="obj.product.imageUrl">
            </a>
            <h2 class="tilte f-16
            text-overflow text-left">{{ obj.product.title }}</h2>
            <Counter
              :qty.sync="obj.qty"
              :unit.sync="obj.product.unit"
            />
            <p class="price font-weight-bold">
              {{ obj.product.price | currency }}
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
          v-if="shoppingCart.length === 0"
        >
          <p class="f-20 f-md-24 w-100 mb-20">購物車內沒有商品喔！</p>
          <router-link to="products" class="btn btn-primary">去逛逛</router-link>
        </div>
      </div>
      <div class=" col-lg-4 col-md-5 total text-left">
        <div class="total-body">
          <p class="flex-grow-1">商品共計</p>
          <p class="flex-grow-1 font-weight-bold text-right">
            {{ shoppingCartPrice.total | currency }}
          </p>
          <!-- <p class="w-100 mb-12 mt-20">配送方式<span class="text-danger">*</span></p>
          <button class="btn btn-outline-secondary mr-16 home-delivery-btn active px-16">宅配</button>
          <button class="btn btn-outline-secondary cash-on-delivery-btn px-16">貨到付款</button>
          <p class="mt-20 w-75">運費</p>
          <p class="mt-20 font-weight-bold text-right w-25">$60</p> -->
          <div class="total-coupon mt-20">
            <input class="total-coupon-input mr-16" type="text" placeholder="請輸入優惠券序號">
            <button class="btn btn-secondary flex-shrink-0
            total-coupon-apply-btn">套用</button>
          </div>
          <p class="mt-20 w-75">優惠券折抵</p>
          <p class="mt-20 font-weight-bold text-right w-25">
            {{ shoppingCartPrice.final_total - shoppingCartPrice.total | currency }}
          </p>
          <p class="mt-20 w-75">合計</p>
          <p class="f-24 font-weight-bold mt-20 text-danger text-right w-25">
            {{ shoppingCartPrice.final_total | currency }}
          </p>
          <router-link class="btn btn-primary mt-20 w-100"
          to="/checkout/order-form">結帳去</router-link>
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
  data() {
    return {
      shoppingCart: [],
      shoppingCartPrice: {
        total: 0,
        final_total: 0,
      },
      tempProductId: '',
      deleteModalMsg: '',
    };
  },
  methods: {
    getShoppingCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const loader = vm.$loading.show({}, {
        default: this.$createElement('LogoLoadingAnimation'),
      });
      this.$http.get(api).then((response) => {
        console.log(response.data.data.carts);
        vm.shoppingCart = response.data.data.carts;
        vm.shoppingCartPrice.total = response.data.data.total;
        vm.shoppingCartPrice.final_total = response.data.data.final_total;
        loader.hide();
      });
    },
    openDeleteModal(product) {
      const vm = this;
      console.log(product);
      $('#deleteModal').modal('show');
      vm.deleteModalMsg = product.product.title;
      vm.tempProductId = product.id;
    },
    deleteProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${vm.tempProductId}`;
      const loader = vm.$loading.show({}, {
        default: this.$createElement('LogoLoadingAnimation'),
      });
      this.$http.delete(api).then((response) => {
        console.log(response.data);
        loader.hide();
        $('#deleteModal').modal('hide');
        vm.getShoppingCart();
      });
    },
  },
  created() {
    this.getShoppingCart();
  },
};
</script>
<style lang="scss">
.shopping-cart-list {
  .img-link {
    @include media-breakpoint-up(xs) {
      height: 70px;
      margin-bottom: 12px;
      order: -3;
      width: 70px;
    }
    @include media-breakpoint-up(sm) {
      height: 60px;
      margin-bottom: 16px;
      position: static;
      width: 80px;
    }
    @include media-breakpoint-up(lg) {
      height: 75px;
      margin-bottom: 0;
      order: 0;
      width: 100px;
    }
    img {
      object-fit: cover;
      width: 100%;
    }
    background-color: $img-link-bg-color;
    flex-shrink: 0;
    overflow: hidden;
  }
  .tilte {
    @include media-breakpoint-up(xs) {
      margin-bottom: 12px;
      margin-left: 16px;
      order: -2;
      width: 45%;
    }
    @include media-breakpoint-up(sm) {
      margin-bottom: 16px;
      margin-left: 20px;
      width: 50%;
    }
    @include media-breakpoint-up(lg) {
      margin: 0 12px;
      order: 0;
      width: auto;
    }
    @include media-breakpoint-up(xl) {
      margin: 0 16px;
    }
    flex-shrink: 0;
    flex-grow: 2;
  }
  .price {
    @include media-breakpoint-up(xs) {
      text-align: right;
    }
    @include media-breakpoint-up(sm) {
      margin-left: 32px;
      width: 80px;
    }
    @include media-breakpoint-up(md) {
      text-align: right;
    }
    @include media-breakpoint-up(lg) {
      margin: 0 12px;
      order: 0;
      text-align: center;
      width: auto;
    }
    @include media-breakpoint-up(xl) {
      margin: 0 16px;
      width: 100px;
    }
    flex-grow: 1;
    font-size: 20px;
  }
  .delete-btn {
    @include media-breakpoint-up(xs) {
      margin-bottom: 12px;
      order: -1;
    }
    @include media-breakpoint-up(sm) {
      margin-bottom: 16px;
    }
    @include media-breakpoint-up(md) {
      margin-bottom: 12px;
    }
    @include media-breakpoint-up(lg) {
      margin-bottom: 0;
      order: 0;
    }
  }
}
.shopping-cart-list-item {
  @include media-breakpoint-up(xs) {
    flex-wrap: wrap;
  }
  @include media-breakpoint-up(lg) {
    flex-wrap: nowrap;
  }
  align-items: center;
  border: 1px solid $secondary;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.total {
  background-clip: content-box;
  background-color: $shopping-cart-bg-color;
  font-size: 16px;
}
.total-body {
  @include media-breakpoint-up(xs) {
    padding: 20px 12px;
  }
  @include media-breakpoint-up(sm) {
    padding: 24px 16px;
  }
  @include media-breakpoint-up(md) {
    padding: 20px 12px;
  }
  @include media-breakpoint-up(xs) {
    padding: 24px 16px;
  }
  align-items: center;
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
  @include media-breakpoint-up(xs) {
    text-indent: 8px;
    width: 100%;
  }
  @include media-breakpoint-up(sm) {
    text-indent: 16px;
    width: 366px;
  }
  @include media-breakpoint-up(md) {
    text-indent: 8px;
    width: 158px;
  }
  @include media-breakpoint-up(lg) {
    text-indent: 16px;
    width:178px;
  }
  @include media-breakpoint-up(lg) {
    text-indent: 16px;
    width:178px;
  }
  @include media-breakpoint-up(xl) {
    width:238px;
  }
  border: 0;
}
.home-delivery-btn:active,  .cash-on-delivery-btn:active{
  background-color: $secondary;
}
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
