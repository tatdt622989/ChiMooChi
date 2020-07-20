<template>
  <div>
    <table class="table mt-24">
      <thead>
        <tr>
          <th>名稱</th>
          <th>序號</th>
          <th>折扣</th>
          <th>截止日期</th>
          <th>啟用狀態</th>
          <th>詳情</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>開幕免運</td>
          <td>CMCFREESHIPING</td>
          <td class="font-weight-bold text-danger">8折</td>
          <td>2020-07-20<br>00:00:00</td>
          <td class="font-weight-bold text-primary">已啟用</td>
          <td>
            <button class="btn-square btn-outline-secondary"
                    data-toggle="modal"
                    data-target="#dashboardOrdersModal">
              <span class="material-icons">more_horiz</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="dashboard-coupons-modal modal fade" id="dashboardCouponsModal"
    tabindex="-1" role="dialog" aria-labelledby="dashboardCouponsModalLabel" aria-hidden="true">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Coupons',
};
</script>

<style lang="scss">
</style>
