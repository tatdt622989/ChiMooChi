<template>
  <div class="row w-100 mb-lg-90 mb-md-60 mb-45">
    <div
      class="payment-wrap col-12 col-md-10 col-lg-8 d-flex flex-wrap justify-content-center
      offset-md-1 offset-lg-2 p-md-24 p-16"
    >
      <h1 class="f-lg-30 f-24 mt-8 mb-32 w-100">確認付款</h1>
      <ShoppingCartListTable />
      <table class="orderer-info-table table table-white f-14 f-md-16">
        <tbody>
          <tr>
            <td>姓名</td>
            <td>劉流流</td>
          </tr>
          <tr>
            <td>手機</td>
            <td>0912345678</td>
          </tr>
          <tr>
            <td>市話</td>
            <td>02-12345678</td>
          </tr>
          <tr>
            <td>電子郵件</td>
            <td>abcd12345678@6yuwei.tw</td>
          </tr>
          <tr>
            <td>地址</td>
            <td>433 台中市沙鹿區南陽路xxx號</td>
          </tr>
          <tr>
            <td>備註</td>
            <td>請在早上五點前到貨</td>
          </tr>
          <tr>
            <td>付款狀態</td>
            <td class="text-danger">未付款</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-12 col-md-10 col-lg-8 d-flex offset-lg-2 mt-md-32 mt-24 offset-md-1
    justify-content-between p-0">
      <router-link class="btn btn-dark" to="order-form">上一步</router-link>
      <router-link class="btn btn-primary" to="payment-status">確認付款</router-link>
    </div>
  </div>
</template>

<script>
import ShoppingCartListTable from '@/components/Catalog/ShoppingCartListTable.vue';

export default {
  name: 'OrderForm',
  components: {
    ShoppingCartListTable,
  },
};
</script>

<style lang="scss">
.payment-wrap {
  background-color: $payment-bg-color;
}
.orderer-info-table {
  td {
    border-color: $payment-broder-color;
  }
  text-align: left;
}
</style>
