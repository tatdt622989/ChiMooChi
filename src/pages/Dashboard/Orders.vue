<template>
<div class="dashboard-orders">
  <table class="table mt-24">
      <thead>
        <tr>
          <th class="responsive">時間</th>
          <th>編號</th>
          <th>金額</th>
          <th>付款狀態</th>
          <th>詳情編輯</th>
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
              <span class="material-icons">edit</span>
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
        <div class="modal-body text-left pt-0">
          <p class="mb-8">
            訂單時間：{{'\xa0'}}{{'\xa0'}}
            <span>2020-07-19{{'\xa0'}}{{'\xa0'}}00:00:00</span>
          </p>
          <p class="pb-8">
            訂單編號：{{'\xa0'}}{{'\xa0'}}
            <span>L9tH8jxVb2Ka_DYPwng</span>
          </p>
          <p class="order-products mb-12">訂購商品：</p>
          <table class="table table-light table-borderless m-0">
            <tbody>
              <tr class="tbody-tr">
                <td class="text-overflow">尊爵日式雙人沙發沙發沙發沙發</td>
                <td class="text-nowrap text-center">99/個</td>
                <td class="text-right">小計{{'\xa0'}}{{'\xa0'}}$99999</td>
              </tr>
            </tbody>
          </table>
          <p class="order-total pt-16 pr-8 pr-md-12 pb-20 text-right">
            總計(已扣優惠券){{'\xa0'}}{{'\xa0'}}
            <span class="text-danger">$99999</span>
          </p>
          <p class="mr-16 my-12">訂購人資訊：</p>
          <div class="form-group">
            <label for="name">姓名</label>
            <input class="form-control" type="text" id="name" autocomplete="name">
          </div>
          <div class="d-flex">
            <div class="form-group pr-12">
              <label for="county">縣市</label>
              <select class="form-control" id="excounty">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div class="form-group pl-12">
              <label for="region">鄉鎮區</label>
              <select class="form-control" id="region">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="address">地址</label>
            <input class="form-control" type="text" id="address" autocomplete="street-address">
          </div>
          <div class="d-flex">
            <div class="form-group pr-12">
              <label for="telephone">手機</label>
              <input class="form-control" type="text" id="telephone" autocomplete="tel">
            </div>
            <div class="form-group pl-12">
              <label for="email">電子信箱</label>
              <input class="form-control" type="text" id="email" autocomplete="email">
            </div>
          </div>
          <div class="order-form-group form-group">
            <label for="notes" class="textarea-form-label">備註</label>
            <textarea class="form-control form-textarea" id="notes" rows="3"></textarea>
          </div>
          <div class="d-flex">
            <div class="form-group pr-12">
              <label for="paymentMethodSelect">付款方式</label>
              <select class="form-control" id="paymentMethodSelect">
                <option>信用卡</option>
                <option>貨到付款</option>
              </select>
            </div>
            <div class="form-group pl-12">
              <label for="paymentMethodSelect">付款狀態</label>
              <select class="form-control" id="paymentStatusSelect">
                <option>未付款</option>
                <option>已付款</option>
              </select>
            </div>
            </div>
        </div>
        <div class="modal-footer p-16">
          <button type="button" class="btn btn-danger my-0 mr-20"
          data-dismiss="modal">刪除</button>
          <button type="button" class="btn btn-primary m-0">編輯</button>
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

<style lang="scss">
.dashboard-orders-modal {
  .order-products {
    border-top: 1px solid $white;
  }
  .order-total {
    background-color: $gray-300;
  }
  .table {
    background-color: $gray-300;
    min-width: 100%;
  }
  .tbody-tr {
    td {
      padding: 16px 8px 16px 8px;
    }
    td:nth-of-type(1) {
      @include media-breakpoint-up(xs) {
        width: 40%;
      }
      @include media-breakpoint-up(md) {
        width: 50%;
      }
    }
    td:nth-of-type(2) {
      width: 20%;
    }
    border-bottom: 1px solid $white;
    font-size: 16px;
  }
  .form-group {
    margin-bottom: 8px;
  }
}
</style>
