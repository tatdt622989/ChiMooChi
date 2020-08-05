<template>
  <div class="container d-flex justify-content-center flex-wrap">
    <div class="checkout-flowchart mt-32">
      <div class="checkout-flowchart-status-frame">
        <div class="checkout-flowchart-status" :class="{ active : isOrderForm}"></div>
      </div>
      <div class="checkout-flowchart-status-frame">
        <div class="checkout-flowchart-status" :class="{ active : isPayment}"></div>
      </div>
      <div class="checkout-flowchart-status-frame">
        <div class="checkout-flowchart-status" :class="{ active : isPaymentStatus}"></div>
      </div>
      <div class="checkout-flowchart-line"></div>
      <ul class="checkout-flowchart-title mb-32">
        <li>訂單資料</li>
        <li>確認付款</li>
        <li>完成購買</li>
      </ul>
    </div>
    <router-view
      v-bind="$attrs"
      :order.sync="order"
      :order-id.sync="orderId"
      :order-total.sync="orderTotal"
      :is-paid.sync="isPaid"
    ></router-view>
  </div>
</template>

<script>
export default {
  name: 'Checkout',
  data() {
    return {
      isOrderForm: true,
      isPayment: false,
      isPaymentStatus: false,
      order: {},
      orderId: '',
      orderTotal: 0,
      isPaid: false,
    };
  },
  methods: {
    updateClass(path) {
      const vm = this;
      vm.isOrderForm = false;
      vm.isPayment = false;
      vm.isPaymentStatus = false;
      switch (path) {
        case '/checkout/order-form':
          vm.isOrderForm = true;
          break;
        case '/checkout/payment':
          vm.isPayment = true;
          break;
        case '/checkout/payment-status':
          vm.isPaymentStatus = true;
          break;
        default:
          break;
      }
    },
  },
  created() {
    const { path } = this.$route;
    this.updateClass(path);
  },
  watch: {
    $route(to) {
      this.updateClass(to.path);
    },
  },
};
</script>

<style lang="scss">
.checkout-flowchart {
  @include media-breakpoint-up(xs) {
    width: 100%;
  }
  @include media-breakpoint-up(md) {
    width: 571px;
  }
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
}
.checkout-flowchart-line {
  @include media-breakpoint-up(xs) {
    padding: 0 32px;
  }
  background-color: $secondary;
  background-clip: content-box;
  height: 3px;
  left: 0;
  margin: 0 auto;
  position: absolute;
  right: 0;
  top: 15px;
  z-index: 0;
}
.checkout-flowchart-status-frame {
  &:nth-of-type(1) {
    margin-left: 18px;
  }
  &:nth-of-type(3) {
    margin-right: 18px;
  }
  align-items: center;
  background-color: white;
  border: 3px solid $secondary;
  border-radius: 999rem;
  display: flex;
  height: 28px;
  justify-content: center;
  padding: 3px;
  width: 28px;
  z-index: 1;
}
.checkout-flowchart-status {
  background-color: $flowchart-status-bg-color;
  border-radius: 999rem;
  height: 16px;
  width: 16px;
}
.checkout-flowchart-status.active {
  @keyframes flashing {
    0% {
      opacity: 0.5;
      transform: scale(0.9);
    }
    50% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0.5;
      transform: scale(0.9);
    }
  }
  animation-name: flashing;
  animation-iteration-count: infinite;
  animation-duration: 1s;
  background-color: $flowchart-status-active-bg-color;
}
.checkout-flowchart-title {
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  width: 100%;
}
</style>
