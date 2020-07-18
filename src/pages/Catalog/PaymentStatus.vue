<template>
  <div class="row justify-content-center flex-column w-100 mt-lg-36 mt-md-20 mt-0">
    <img src="@/assets/images/payment-successful.svg">
    <h1 class="font-weight-bold f-28 f-md-30 mt-20 mt-md-24">付款成功</h1>
    <h2 class="f-16 f-md-20">感謝您的購買！<br>商品將於2-7天內送達</h2>
    <h3 class="f-16 mt-12 mt-md-16">訂單編號</h3>
    <div class="d-flex justify-content-center">
      <div class="order-num-group">
        <input type="text" v-model="orderNum" class="order-num-input border-0" readonly>
        <button class="order-num-btn btn-square border-0" @click="copyOrderNum">
          <span class="material-icons">content_copy</span>
        </button>
      </div>
    </div>
    <div class="d-flex justify-content-center mb-lg-90 mb-md-60 mb-45">
      <router-link class="btn btn-primary" to="/product">繼續選購</router-link>
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
  data() {
    return {
      orderNum: 'ABCD12345678',
    };
  },
  components: {
    Toast,
  },
  methods: {
    copyOrderNum() {
      const vm = this;
      const input = $('.order-num-input')[0];
      copyText(input);
      vm.$bus.$emit('message:push', '成功', '訂單編號已經複製到剪貼簿', 'success');
    },
  },
};
</script>

<style lang="scss">
.order-num-group {
  align-items: center;
  border: 1px solid $secondary;
  display: flex;
  height: 44px;
  margin-bottom: 32px;
  padding: 0 23px;
}
.order-num-input {
  background-color: #fff;
  color: $secondary;
  height: 42px;
  width: 140px;
}
.order-num-btn {
  &:hover {
    color: $primary;
  }
  background-color: #fff;
  color: $secondary;
  transition: $transition-base;
}
</style>
