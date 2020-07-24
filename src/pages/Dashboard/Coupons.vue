<template>
  <div>
    <table class="table mt-24">
      <thead>
        <tr>
          <th>名稱</th>
          <th>序號</th>
          <th>折扣</th>
          <th class="responsive">截止日期</th>
          <th>啟用狀態</th>
          <th>詳情編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>開幕免運</td>
          <td>CMCFREESHIPING</td>
          <td class="font-weight-bold text-danger">8折</td>
          <td class="responsive">2020-07-20<br>00:00:00</td>
          <td class="font-weight-bold text-primary">已啟用</td>
          <td>
            <button
              class="btn-square btn-outline-secondary"
              data-toggle="modal"
              data-target="#dashboardOrdersModal"
              @click="openEditModal()"
            >
              <span class="material-icons">edit</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="dashboard-coupons-modal modal fade"
      id="dashboardCouponsModal"
      tabindex="-1" role="dialog"
      aria-labelledby="dashboardCouponsModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">優惠券建立</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group pl-12">
            <label for="name">名稱</label>
            <input class="form-control" type="text" id="name" autocomplete="name">
          </div>
          <div class="switch-group">
            <input
              class="switch-checkbox"
              type="checkbox"
              id="couponSwitch"
            />
            <label class="switch-label" for="couponSwitch"></label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'Coupons',
  methods: {
    openEditModal(item) {
      const vm = this;
      vm.$emit('update:isNewModal', false);
      // 複製不傳參考的物件
      vm.tempProduct = { ...item };
      $('#dashboardCouponsModal').modal('show');
    },
  },
};
</script>

<style lang="scss">
</style>
