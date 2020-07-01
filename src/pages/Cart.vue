<template>
  <div class="container">
    <div class="row mb-90">
      <h1 class="f-lg-30 f-24 mt-lg-30 mb-lg-45 mt-20 mb-30 w-100-pct">購物車清單</h1>
      <div class="cart-list col-lg-8 col-md-7">
        <div class="cart-list-item p-sm-16 p-12 mb-24">
          <a href="" class="cart-list-item-img-link"></a>
          <h2 class="cart-list-item-title f-16 m-sm-0 text-overflow text-left">尊爵日式雙人沙發尊爵日式雙人沙發</h2>
          <Counter class="cart-list-item-counter mt-sm-16 mt-lg-0"/>
          <p class="cart-list-item-price font-weight-bold">$
            <span>100000</span>
          </p>
          <button class="btn-square btn-outline-danger cart-list-item-delete-btn
          mt-sm-16 mt-lg-0">
            <span class="material-icons">delete</span>
          </button>
        </div>
      </div>
      <div class=" col-lg-4 col-md-5 summary text-left">
        <div class="align-items-center p-md-16 p-sm-32 p-24 d-flex flex-wrap">
          <p class="flex-grow-1">商品共計</p>
          <p class="flex-grow-1 font-weight-bold text-right">$1000</p>
          <p class="w-100-pct mb-12 mt-20">配送方式<span class="text-danger">*</span></p>
          <button class="btn btn-outline-secondary mr-16 home-delivery-btn active px-16">宅配</button>
          <button class="btn btn-outline-secondary cash-on-delivery-btn px-16">貨到付款</button>
          <p class="mt-20 w-75-pct">運費</p>
          <p class="mt-20 font-weight-bold text-right w-25-pct">$60</p>
          <div class="summary-coupon mt-20">
            <input class="summary-coupon-input mr-16" type="text" placeholder="請輸入優惠券序號">
            <button class="btn btn-secondary flex-shrink-0
            summary-coupon-apply-btn">套用</button>
          </div>
          <p class="mt-20 w-75-pct">優惠券折抵</p>
          <p class="mt-20 font-weight-bold text-right w-25-pct">-$60</p>
          <p class="mt-20 w-75-pct">合計</p>
          <p class="f-24 font-weight-bold mt-20 text-danger text-right w-25-pct">$1234</p>
          <router-link class="btn btn-primary mt-20 w-100-pct" to="/checkout">結帳去</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Counter from '@/components/catalog/Counter.vue';

export default {
  name: 'Favorite',
  components: {
    Counter,
  },
};
</script>
<style lang="scss">
.cart-list-item {
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
.cart-list-item-img-link {
  @include media-breakpoint-up(xs) {
    height: 70px;
    left: 12px;
    order: -3;
    position: absolute;
    top: 12px;
    width: 70px;
  }
  @include media-breakpoint-up(sm) {
    height: 60px;
    position: static;
    width: 80px;
  }
  @include media-breakpoint-up(lg) {
    height: 75px;
    order: 0;
    width: 100px;
  }
  background-color: $img-link-bg-color;
}
.cart-list-item-title {
  @include media-breakpoint-up(xs) {
    margin-left: 82px;
    order: -2;
    width: 60%;
  }
  @include media-breakpoint-up(sm) {
    margin-left: 0;
    width: 284px;
  }
  @include media-breakpoint-up(md) {
    order: 0;
    width: 173px;
  }
  @include media-breakpoint-up(lg) {
    width: 140px;
  }
  @include media-breakpoint-up(xl) {
    width: 240px;
  }
  flex-shrink: 0;
}
.cart-list-item-price {
  @include media-breakpoint-up(xs) {
    margin-bottom: 26px;
    margin-left: 82px;
    order: -1;
    text-align: left;
    width: 60%;
  }
  @include media-breakpoint-up(sm) {
    margin-bottom: 0;
    margin-left: 0;
    width: 80px;
  }
  @include media-breakpoint-up(md) {
    order: 0;
    text-align: right;
  }
  @include media-breakpoint-up(lg) {
    text-align: center;
    width: 80px;
  }
  @include media-breakpoint-up(xl) {
    width: 100px;
  }
  justify-content: center;
}
.cart-list-item-counter {
  @include media-breakpoint-up(xs) {
    margin-left: 0px;
    order: 0;
  }
  @include media-breakpoint-up(md) {
    margin-left: 0;
    order: 1;
  }
  @include media-breakpoint-up(lg) {
    order: 0;
  }
}
.cart-list-item-delete-btn {
  @include media-breakpoint-up(md) {
    order: 2;
  }
  @include media-breakpoint-up(lg) {
    order: 0;
  }
}
.summary {
  background-clip: content-box;
  background-color: $cart-bg-color;
}
.summary-coupon {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.summary-coupon-apply-btn {
  padding: 9px 15px 9px 15px;
}
.summary-coupon-input {
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
</style>
