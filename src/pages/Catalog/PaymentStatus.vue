<template>
  <div class="row justify-content-center flex-column w-100 mt-lg-36 mt-md-20 mt-0">
    <img src="@/assets/images/payment-successful.svg">
    <h1 class="font-weight-bold f-28 f-md-30 mt-20 mt-md-24">付款成功</h1>
    <h2 class="f-16 f-md-20 mb-24">感謝您的購買！<br>商品將於2-7天內送達</h2>
    <div class="d-flex flex-wrap justify-content-center mb-24">
      <div v-if="orderTotal > 3000">
        <p class="w-100 mb-12 font-weight-bold text-danger f-20">您的購物滿$3000<br>獲得七折優惠券！</p>
        <div class="order-id-group">
          <input
            id="extra-coupon"
            type="text"
            v-model="extraCoupon"
            class="order-id-input border-0"
            readonly
          >
          <button class="order-id-btn btn-square border-0" @click="copyInput('#extra-coupon')">
            <span class="material-icons">content_copy</span>
          </button>
      </div>
      </div>
      <p class="w-100 mb-12">訂單編號</p>
      <div class="order-id-group">
        <input
          id="order-id"
          type="text"
          v-model="orderId"
          class="order-id-input border-0"
          readonly
        >
        <button class="order-id-btn btn-square border-0" @click="copyInput('#order-id')">
          <span class="material-icons">content_copy</span>
        </button>
      </div>
    </div>
    <div class="d-flex justify-content-center mb-lg-90 mb-md-60 mb-45">
      <router-link class="btn btn-primary" to="/products">繼續選購</router-link>
    </div>
    <Toast />
  </div>
</template>

<script>
import $ from 'jquery';
import Toast from '@/components/Toast.vue';
import copyText from '@/copy.js';

export default {
  name: 'PaymentStatus',
  components: {
    Toast,
  },
  props: ['orderId', 'isPaid', 'orderTotal'],
  data() {
    return {
      order: {},
      extraCoupon: 'CHIMOOCHI3000',
    };
  },
  methods: {
    copyInput(id) {
      const vm = this;
      const input = $(id)[0];
      let msg = '';
      copyText(input);
      if (id === '#order-id') {
        msg = '訂單編號';
      } else if (id === '#extra-coupon') {
        msg = '優惠券';
      }
      vm.$bus.$emit('message:push', '成功', `${msg}已經複製到剪貼簿`, 'success');
    },
  },
  created() {
    const vm = this;
    if (!vm.isPaid) {
      vm.$router.push('/shopping-cart');
    }
  },
  destroyed() {
    this.$emit('update:is-paid', false);
  },
};
</script>

<style lang="scss">
.order-id-group {
  align-items: center;
  border: 1px solid $secondary;
  display: flex;
  height: 44px;
  margin-bottom: 24px;
  padding: 0 23px;
}
.order-id-input {
  background-color: #fff;
  color: $secondary;
  height: 42px;
  width: 140px;
}
.order-id-btn {
  &:hover {
    color: $primary;
  }
  background-color: #fff;
  color: $secondary;
  transition: $transition-base;
}
</style>
