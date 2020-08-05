<template>
  <table class="table table-white table-borderless text-left mb-32 f-14 f-md-16">
    <tbody>
      <tr
        class="tbody-tr"
        v-for="obj in shoppingCart.carts"
        :key="obj.id"
      >
        <td>{{ obj.product.title }}</td>
        <td class="text-nowrap">{{ `${obj.qty}/${obj.product.unit}` }}</td>
        <td>{{ obj.coupon ? obj.total * (obj.coupon.percent / 100)
              : obj.total | currency }}</td>
      </tr>
    </tbody>
    <tfoot class="tfoot">
      <tr>
        <td></td>
        <td class="text-nowrap">優惠券折抵</td>
        <td >{{ shoppingCart.total - shoppingCart.final_total | currency }}</td>
      </tr>
      <tr>
        <td></td>
        <td>合計</td>
        <td class="text-danger font-weight-bold">{{ shoppingCart.final_total | currency }}</td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
export default {
  name: 'ShoppingCartListTable',
  props: ['shoppingCart'],
};
</script>

<style lang="scss" scoped>
.tfoot {
  tr:nth-of-type(1) {
    td {
      @include media-breakpoint-up(xs) {
        padding-top: 12px;
        padding-bottom: 6px;
      }
      @include media-breakpoint-up(md) {
        padding-top: 16px;
        padding-bottom: 8px;
      }
    }
  }
  tr:nth-of-type(2) {
    td {
      @include media-breakpoint-up(xs) {
        padding-top: 6px;
        padding-bottom: 12px;
      }
      @include media-breakpoint-up(md) {
        padding-top: 8px;
        padding-bottom: 16px;
      }
    }
  }
}
.tbody-tr {
  border-bottom: 1px solid $checkout-table-border-color;
}
.table td {
  @include media-breakpoint-up(xs) {
    padding: 12px;
  }
  @include media-breakpoint-up(md) {
    padding: 16px;
  }
}
</style>
