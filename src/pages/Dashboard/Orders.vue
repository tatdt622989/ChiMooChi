<template>
<div>
  <table class="table mt-24">
      <thead>
        <tr>
          <th class="responsive">時間</th>
          <th>編號</th>
          <th>金額</th>
          <th>付款狀態</th>
          <th>詳情</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="responsive">2020-07-19<br>00:00:00</td>
          <td>L9tH8jxVb2Ka_DYPwng</td>
          <td>$2000</td>
          <td class="font-weight-bold text-primary">已付款</td>
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
  <div class="dashboard-orders-modal modal fade" id="dashboardOrdersModal"
    tabindex="-1" role="dialog" aria-labelledby="dashboardOrdersModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="dashboardOrdersModalLabel">訂單詳情</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body text-left">
          <p>訂單時間:{{'\xa0'}}<span>2020-07-19 00:00:00</span></p>
          <p>訂單編號:{{'\xa0'}}<span>L9tH8jxVb2Ka_DYPwng</span></p>
          <div class="form-group">
            <label for=""></label>
            <input type="text">
          </div>
          <div class="form-group">
            <label for="paymentMethodSelect">付款狀態</label>
            <select class="form-control" id="paymentMethodSelect">
              <option>未付款</option>
              <option>已付款</option>
            </select>
            <select class="form-control" id="paymentStatusSelect">
              <option>未付款</option>
              <option>已付款</option>
            </select>
          </div>
        </div>
        <div class="modal-footer p-20">
          <button type="button" class="btn btn-dark my-0 mr-20"
          data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary m-0">建立</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Orders',
};
</script>

<style lang="scss"></style>
