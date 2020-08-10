<template>
  <div class="row w-100 mb-lg-90 mb-md-60 mb-45">
    <div
      class="payment-wrap col-12 col-md-10 col-lg-8 d-flex flex-wrap justify-content-center
      offset-md-1 offset-lg-2 p-md-24 p-16"
    >
      <h1 class="f-lg-30 f-24 mt-8 mb-32 w-100">確認付款</h1>
      <ShoppingCartListTable :shopping-cart="orderShoppingCart"/>
      <table class="orderer-info-table table table-white f-14 f-md-16">
        <tbody>
          <tr>
            <td>姓名</td>
            <td>{{ checkOrder.order.user.name }}</td>
          </tr>
          <tr>
            <td>手機</td>
            <td>{{ checkOrder.order.user.tel }}</td>
          </tr>
          <tr>
            <td>電子郵件</td>
            <td>{{ checkOrder.order.user.email }}</td>
          </tr>
          <tr>
            <td>地址</td>
            <td>{{ checkOrder.order.user.address }}</td>
          </tr>
          <tr>
            <td>備註</td>
            <td>{{ checkOrder.order.message }}</td>
          </tr>
          <tr>
            <td>付款狀態</td>
            <td class="text-danger">未付款</td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex mt-md-32 mt-24 justify-content-between">
        <button class="btn btn-tertiary" @click="checkOut">確認付款</button>
      </div>
    </div>
  </div>
</template>

<script>
import ShoppingCartListTable from '@/components/Catalog/ShoppingCartListTable.vue';

export default {
  name: 'Payment',
  components: {
    ShoppingCartListTable,
  },
  props: ['shoppingCart', 'order', 'orderId'],
  data() {
    return {
      orderShoppingCart: {},
      checkOrder: {
        order: {
          user: this.order.user || {},
          message: this.order.message || '',
        },
        orderId: this.orderId,
      },
    };
  },
  methods: {
    checkOut() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.checkOrder.orderId}`;
      const loader = vm.$loading.show({}, {
        default: vm.$createElement('LogoLoadingAnimation'),
      });
      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.$emit('update:is-paid', true);
          vm.$bus.$emit('message:push', '成功', response.data.message, 'success');
          vm.$router.push('payment-status');
        } else {
          vm.$bus.$emit('message:push', '失敗', response.data.message, 'danger');
        }
        loader.hide();
      });
    },
    copyShoppingCart() {
      const vm = this;
      // 在清空購物車前，將購物車內容深度複製
      vm.orderShoppingCart = JSON.stringify(vm.shoppingCart);
      vm.orderShoppingCart = JSON.parse(vm.orderShoppingCart);
    },
  },
  created() {
    const vm = this;
    vm.copyShoppingCart();
    if (!('carts' in vm.orderShoppingCart) || vm.orderShoppingCart.carts.length === 0) {
      vm.$router.push('/shopping-cart');
      return;
    }
    vm.$bus.$emit('shopping-cart:update');
  },
};
</script>

<style lang="scss">
.payment-wrap {
  background-color: $payment-bg-color;
}
.orderer-info-table {
  td {
    &:first-child {
      width: 100px;
    }
    @include media-breakpoint-up(xs) {
      padding: 12px;
    }
    @include media-breakpoint-up(md) {
      padding: 16px;
    }
    border-color: $payment-broder-color;
  }
  text-align: left;
}
</style>
