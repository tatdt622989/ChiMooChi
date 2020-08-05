<template>
<div class="dashboard-orders">
  <table class="table mt-24">
    <thead>
      <tr>
        <th>
          <button
            class="btn font-weight-bold p-0"
            @click="sortOrders('create_at')"
          >
            時間
            <span
              class="material-icons"
              :class="{ active : sortAttr === 'create_at',
              reverse : isReverse }"
            >keyboard_arrow_down</span>
          </button>
        </th>
        <th class="responsive">編號</th>
        <th class="pl-16">
          <button
            class="btn font-weight-bold p-0"
            @click="sortOrders('total')"
          >
            金額
            <span
              class="material-icons"
              :class="{ active : sortAttr === 'total',
              reverse : isReverse }"
            >keyboard_arrow_down</span>
          </button>
        </th>
        <th class="nowrap">
          <button
            class="btn font-weight-bold p-0"
            @click="sortOrders('is_paid')"
          >
            付款狀態
            <span
              class="material-icons"
              :class="{ active : sortAttr === 'is_paid',
              reverse : isReverse }"
            >keyboard_arrow_down</span>
          </button>
        </th>
        <th class="info-edit text-center">詳情編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="obj in paginatedOrders" :key="obj.id">
        <td>{{ getTime(obj.create_at) }}</td>
        <td class="responsive">{{ obj.id }}</td>
        <td class="pl-16">{{ obj.total | currency }}</td>
        <td
          class="font-weight-bold nowrap"
          :class="[ obj.is_paid ? 'text-primary' : 'text-dark' ]"
        >
          {{ obj.is_paid ? '已付款' : '未付款' }}
          </td>
        <td class="info-edit text-center">
          <button class="btn-square btn-outline-secondary"
                  data-toggle="modal"
                  data-target="#dashboardOrdersModal">
            <span class="material-icons">edit</span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination
    :pagination="pagination"
    @change-page="changePage"
    />
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
          <button type="button" class="btn btn-primary m-0">編輯</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Orders',
  components: {
    Pagination,
  },
  props: ['search'],
  data() {
    return {
      allOrders: [],
      searchOrders: [],
      paginatedOrders: [],
      pagination: {},
      sortAttr: '',
      isReverse: false,
    };
  },
  methods: {
    getOrders(page = 1) {
      const vm = this;
      let orderPage = page;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${orderPage}`;
      const loader = vm.$loading.show({}, {
        default: this.$createElement('LogoLoadingAnimation'),
      });
      // 這段目的是取得全部的訂單列表，因為api提供的是分頁資料，並且有排序全部資料的需要
      vm.$http.get(api).then((response) => {
        // 先取得第一頁的資料
        vm.allOrders = response.data.orders;
        vm.pagination = response.data.pagination;
        const otherOrdersRequest = [];
        // 判斷總頁數是否大於一頁
        if (vm.pagination.total_pages > 1) {
          // 判斷剩餘的頁數
          let i = 1;
          while (i < vm.pagination.total_pages) {
            orderPage = i + 1;
            api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${orderPage}`;
            otherOrdersRequest.push(vm.$http.get(api));
            i += 1;
          }
          // 將剩餘頁數的資料取回
          vm.$http.all(otherOrdersRequest).then(
            vm.$http.spread((...orderResponse) => {
              console.log(response);
              const ordersArray = orderResponse.map((obj) => obj.data.orders);
              let orderConcat = [];
              ordersArray.forEach((obj) => {
                orderConcat = orderConcat.concat(obj);
              });
              // 加入第一頁的陣列中
              orderConcat.forEach((obj) => {
                vm.allOrders.push(obj);
              });
              vm.paginateOrders(vm.allOrders);
              loader.hide();
            }),
          );
        }
      });
      vm.sortAttr = '';
      vm.sortOrders();
    },
    getTime(timestamp) {
      const vm = this;
      let timestampStr = timestamp.toString();
      if (timestampStr.length < 13) {
        let i = 0;
        const len = 13 - timestampStr.length;
        while (i < len) {
          timestampStr += '0';
          i += 1;
        }
      }
      timestampStr = parseInt(timestampStr, 10);
      const createDate = new Date(timestampStr);
      const month = vm.timeStr(createDate.getMonth() + 1);
      const day = vm.timeStr(createDate.getDate());
      const hour = vm.timeStr(createDate.getHours());
      const minute = vm.timeStr(createDate.getMinutes());
      const second = vm.timeStr(createDate.getSeconds());
      const str = `
      ${createDate.getFullYear()}-${month}-${day}
      ${hour}:${minute}:${second}
      `;
      return str;
    },
    timeStr(num) {
      let str = '';
      if (num < 10) {
        str = `0${num}`;
      } else {
        str = `${num}`;
      }
      return str;
    },
    sortOrders(attr = 'create_at') {
      const vm = this;
      const sortTarget = vm.search ? vm.searchOrders : vm.allOrders;
      if (vm.sortAttr === attr) {
        vm.isReverse = !vm.isReverse;
      } else {
        vm.isReverse = false;
      }
      sortTarget.sort((a, b) => {
        if (attr === 'total' || attr === 'create_at') {
          return vm.isReverse ? a[attr] - b[attr] : b[attr] - a[attr];
        }
        return vm.isReverse ? +a[attr] - +b[attr] : +b[attr] - +a[attr];
      });
      vm.sortAttr = attr;
    },
    paginateOrders(array) {
      const vm = this;
      const target = array;
      console.log(target);
      const startIndex = (vm.pagination.current_page - 1) * 10;
      const result = target.filter((obj, index) => {
        if (startIndex <= index && startIndex + 9 >= index) {
          return obj;
        }
        return false;
      });
      vm.paginatedOrders = result;
    },
    changePage(page) {
      const vm = this;
      vm.pagination.current_page = page;
      if (page === 1) {
        vm.$set(vm.pagination, 'has_pre', false);
      } else {
        vm.$set(vm.pagination, 'has_pre', true);
      }
      if (page < vm.pagination.total_pages) {
        vm.$set(vm.pagination, 'has_next', true);
      } else {
        vm.$set(vm.pagination, 'has_next', false);
      }
      vm.paginateOrders(vm.allOrders);
    },
  },
  created() {
    this.getOrders();
  },
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
  .form-group {
    margin-bottom: 8px;
  }
}
</style>
