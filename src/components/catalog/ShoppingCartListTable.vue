<template>
  <table class="table table-white table-borderless text-left mb-32 f-14 f-md-16">
    <tbody>
      <tr class="tbody-tr">
        <td>尊爵日式雙人沙發沙發沙發沙發</td>
        <td class="text-nowrap">99/個</td>
        <td>小計</td>
        <td>$99999</td>
      </tr>
      <tr class="tbody-tr">
        <td>尊爵日式雙人沙發沙發沙發沙發</td>
        <td class="text-nowrap">99/個</td>
        <td>小計</td>
        <td>$99999</td>
      </tr>
    </tbody>
    <tfoot class="tfoot">
      <tr>
        <td colspan="2" class="pb-4"></td>
        <td class="pb-4">宅配-運費</td>
        <td class="pb-4">$60</td>
      </tr>
      <tr>
        <td colspan="2" class="py-4"></td>
        <td class="py-4 text-nowrap">優惠券折抵</td>
        <td class="py-4">-$40</td>
      </tr>
      <tr>
        <td colspan="2" class="pt-4"></td>
        <td class="pt-4">合計</td>
        <td class="text-danger font-weight-bold pt-4">$2000</td>
      </tr>
    </tfoot>
  </table>
</template>

<style lang="scss">
.tfoot-td {
  height: 32px;
}
.tbody-tr {
  border-bottom: 1px solid $gray-300;
}
.table td {
  @include media-breakpoint-up(xs) {
    padding: 8px;
  }
  @include media-breakpoint-up(md) {
    padding: 12px;
  }
}
</style>
