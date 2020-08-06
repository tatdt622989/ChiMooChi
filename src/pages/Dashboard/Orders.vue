<template>
<div class="dashboard-orders">
  <table class="table mt-24">
    <thead>
      <tr>
        <th>
          <button
            class="btn font-weight-bold p-0"
            @click="ordersFilter('create_at')"
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
            @click="ordersFilter('total')"
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
            @click="ordersFilter('is_paid')"
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
          <button
            class="btn-square btn-outline-secondary"
            @click="openEditModal(obj)"
          >
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
        <ValidationObserver
          ref="form"
          tag="form"
          class="order-form"
          @submit.prevent="editOrder"
        >
          <div class="modal-body text-left">
            <p class="mb-8">
              訂單時間：{{'\xa0'}}{{'\xa0'}}
              <span>{{ getTime(tempOrder.create_at) }}</span>
            </p>
            <p class="pb-8">
              訂單編號：{{'\xa0'}}{{'\xa0'}}
              <span>{{ tempOrder.id }}</span>
            </p>
            <p class="order-products mb-12">訂購商品：</p>
            <table class="table table-borderless m-0">
              <tbody>
                <tr
                  class="tbody-tr"
                  v-for="obj in tempOrder.products"
                  :key="obj.id"
                >
                  <td class="text-overflow pl-12 pl-md-16">{{ obj.product.title }}</td>
                  <td class="text-nowrap text-center">{{ `${obj.qty} / ${obj.product.unit}` }}</td>
                  <td class="text-right pr-12 pr-md-16">{{ obj.product.price | currency }}</td>
                </tr>
              </tbody>
            </table>
            <p class="order-total pt-16 pb-20 text-right">
              總計(已扣優惠券){{'\xa0'}}{{'\xa0'}}
              <span class="text-danger font-weight-bold">{{ tempOrder.total | currency }}</span>
            </p>
            <p class="mr-16 my-12">訂購人資訊：</p>
            <ValidationProvider
              class="form-group"
              rules="required"
              tag="div"
              v-slot="{ errors, failed }"
            >
              <label for="user-name" class="w-100 text-left">姓名</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid' : failed }"
                id="user-name"
                placeholder="請輸入姓名"
                autocomplete="name"
                v-model="tempOrder.user.name"
              />
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </ValidationProvider>
            <p class="mb-8">地址</p>
            <div class="d-flex mb-12 mb-md-16">
              <ValidationProvider
                class="form-group w-50 county mb-0"
                rules="required"
                tag="div"
                v-slot="{ errors, failed }"
              >
                <select
                  class="form-control"
                  :class="{ 'is-invalid' : failed }"
                  @change="getRegion(selectCountyIndex)"
                  v-model="selectCountyIndex"
                  required
                >
                  <option selected disabled value="">請選擇縣市</option>
                  <option
                    v-for="(item, index) in areaList"
                    :key="item.county"
                    :value="index"
                  > {{ item.county }} </option>
                </select>
                <div class="invalid-feedback">{{ errors[0] }}</div>
              </ValidationProvider>
              <ValidationProvider
              class="form-group w-50 region mb-0"
              rules="required"
              tag="div"
              v-slot="{ errors, failed }"
              >
                <select
                  class="form-control"
                  :class="{ 'is-invalid' : failed }"
                  v-model="selectRegion"
                  required
                >
                  <option selected disabled value="">請選擇鄉鎮區</option>
                  <option v-for="item in regionList" :key="item" :value="item">
                    {{ item }}
                  </option>
                </select>
                <div class="invalid-feedback">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>
            <ValidationProvider
              class="form-group"
              rules="required"
              tag="div"
              v-slot="{ errors, failed }"
            >
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid' : failed }"
                placeholder="請輸入地址"
                autocomplete="on"
                v-model="otherAddress"
              />
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </ValidationProvider>
            <div class="d-flex">
              <ValidationProvider
                class="form-group w-50 mobile-phone"
                rules="required|numeric|max:10"
                tag="div"
                v-slot="{ errors, failed }"
              >
                <label for="mobile-phone">手機</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid' : failed }"
                  id="mobile-phone"
                  placeholder="請輸入手機號碼"
                  autocomplete="on"
                  v-model="tempOrder.user.tel"
                />
                <div class="invalid-feedback">{{ errors[0] }}</div>
              </ValidationProvider>
              <ValidationProvider
                class="form-group w-50 email"
                rules="required|email"
                tag="div"
                v-slot="{ errors, failed }"
              >
                <label for="email">電子信箱</label>
                <input
                  type="email"
                  class="form-control"
                  :class="{ 'is-invalid' : failed }"
                  id="email"
                  placeholder="請輸入電子信箱"
                  autocomplete="email"
                  v-model="tempOrder.user.email"
                />
                <div class="invalid-feedback">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <label for="notes" class="textarea-form-label">備註</label>
              <textarea
                class="form-control"
                id="notes"
                rows="3"
                v-model="tempOrder.message"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="paymentMethodSelect">付款狀態</label>
              <select
                class="form-control"
                id="paymentStatusSelect"
                v-model="isPaid"
              >
                <option value="0">未付款</option>
                <option value="1">已付款</option>
              </select>
            </div>
          </div>
          <div class="modal-footer p-16">
            <button type="submit" class="btn btn-primary m-0">編輯</button>
          </div>
        </ValidationObserver>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import $ from 'jquery';
import areaList from '@/assets/area-list.json';
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
      tempOrder: {
        user: {},
      },
      areaList,
      regionList: [],
      selectCountyIndex: '',
      selectRegion: '',
      isPaid: 0,
      tempAddress: '',
      otherAddress: '',
      sortAttr: '',
      isReverse: false,
    };
  },
  methods: {
    getOrders() {
      const vm = this;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=1`;
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
            const page = i + 1;
            api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
            otherOrdersRequest.push(vm.$http.get(api));
            i += 1;
          }
          // 將剩餘頁數的資料取回
          vm.$http.all(otherOrdersRequest).then(
            vm.$http.spread((...ordersResponse) => {
              console.log(response);
              const ordersArray = ordersResponse.map((obj) => obj.data.orders);
              let ordersConcat = [];
              ordersArray.forEach((obj) => {
                ordersConcat = ordersConcat.concat(obj);
              });
              // 加入第一頁的陣列中
              ordersConcat.forEach((obj) => {
                vm.allOrders.push(obj);
              });
              vm.ordersFilter();
              loader.hide();
            }),
          );
        } else {
          vm.couponsFilter();
          loader.hide();
        }
      });
    },
    getTime(timestamp) {
      const vm = this;
      console.log(timestamp);
      if (!timestamp) { return false; }
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
    ordersFilter(sortAttr = 'create_at', trigger = 'table-header') {
      const vm = this;
      const target = vm.search ? vm.searchOrders : vm.allOrders;
      vm.sortOrders(sortAttr, trigger, target);
      vm.getPagination(target);
      vm.paginateOrders(target);
    },
    sortOrders(attr = 'create_at', trigger = 'table-header', target) {
      const vm = this;
      if (vm.sortAttr === attr && trigger === 'table-header') {
        vm.isReverse = !vm.isReverse;
      } else {
        vm.isReverse = false;
      }
      target.sort((a, b) => {
        if (attr === 'total' || attr === 'create_at') {
          return vm.isReverse ? a[attr] - b[attr] : b[attr] - a[attr];
        }
        return vm.isReverse ? +a[attr] - +b[attr] : +b[attr] - +a[attr];
      });
      vm.sortAttr = attr;
    },
    getPagination(array) {
      const vm = this;
      const target = array;
      const targetLen = target.length;
      vm.$set(vm.pagination, 'current_page', 1);
      if (targetLen % 10 !== 0) {
        vm.$set(vm.pagination, 'total_pages', Math.floor(targetLen / 10) + 1);
      } else {
        vm.$set(vm.pagination, 'total_pages', Math.floor(targetLen / 10));
      }
      vm.$set(vm.pagination, 'has_pre', false);
      if (vm.pagination.total_pages > 1) {
        vm.$set(vm.pagination, 'has_next', true);
      } else {
        vm.$set(vm.pagination, 'has_next', false);
      }
    },
    updatePagination(page) {
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
      const target = vm.search ? vm.searchOrders : vm.allOrders;
      vm.updatePagination(page);
      vm.paginateOrders(target);
    },
    openEditModal(obj) {
      const vm = this;
      vm.tempOrder = JSON.stringify(obj);
      vm.tempOrder = JSON.parse(vm.tempOrder);
      vm.isPaid = vm.tempOrder.is_paid ? 1 : 0;
      const county = vm.tempOrder.user.address.slice(4, 7);
      const postalCode = vm.tempOrder.user.address.slice(0, 3);
      vm.areaList.forEach((area, index) => {
        if (area.county === county) {
          vm.selectCountyIndex = index;
        }
      });
      vm.getRegion(vm.selectCountyIndex);
      vm.regionList.forEach((item) => {
        const region = item.split(' ');
        console.log(region[1], postalCode);
        if (region[1] === postalCode) {
          vm.selectRegion = item;
          console.log(vm.selectRegion);
        }
      });
      const region = vm.selectRegion.split(' ');
      console.log(region);
      const otherAddress = vm.tempOrder.user.address.split(region[0]);
      [, vm.otherAddress] = otherAddress;
      $('#dashboardOrdersModal').modal('show');
    },
    getRegion(countyIndex) {
      if (countyIndex !== '') {
        this.regionList = this.areaList[countyIndex].region;
      }
    },
    editOrder() {
      const vm = this;
      vm.$refs.form.validate().then((success) => {
        if (success) {
          const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${vm.tempOrder.id}`;
          const region = vm.selectRegion.split(' ');
          vm.tempOrder.user.address = `${region[1]} ${vm.areaList[vm.selectCountyIndex].county}${region[0]}${vm.otherAddress}`;
          console.log(vm.tempOrder.user.address);
          vm.tempOrder.is_paid = !!parseInt(vm.isPaid, 10);
          const loader = vm.$loading.show({}, {
            default: this.$createElement('LogoLoadingAnimation'),
          });
          this.$http.put(api, { data: vm.tempOrder }).then((response) => {
            console.log(response.data);
            if (response.data.success) {
              vm.$bus.$emit('message:push', '成功', '訂單修改成功', 'success');
              $('#dashboardOrdersModal').modal('hide');
              vm.getOrders();
            } else {
              vm.$bus.$emit('message:push', '失敗', response.data.message, 'danger');
            }
            loader.hide();
          });
        }
      });
    },
  },
  watch: {
    search() {
      const vm = this;
      if (vm.search) {
        const result = vm.allOrders.filter((obj) => {
          const str = vm.getTime(obj.create_at)
          + obj.id
          + obj.message
          + obj.total;
          if (str.indexOf(vm.search) > -1) {
            return obj;
          }
          return false;
        });
        if (result.length) {
          vm.searchOrders = result;
        } else {
          vm.searchOrders = [];
        }
      }
      vm.ordersFilter('create_at', 'search');
    },
  },
  created() {
    this.getOrders();
  },
};
</script>

<style lang="scss">
.dashboard-orders-modal {
  .modal-header {
    @include media-breakpoint-up(xs) {
      padding: 12px;
    }
    @include media-breakpoint-up(md) {
      padding: 16px;
    }
  }
  .modal-body {
    @include media-breakpoint-up(xs) {
      padding: 0 12px 12px 12px;
    }
    @include media-breakpoint-up(md) {
      padding: 0 16px 16px 16px;
    }
    td:nth-of-type(1) {
      width: 40%;
    }
    .county, .moblie-phone {
      @include media-breakpoint-up(xs) {
        padding-right: 6px;
      }
      @include media-breakpoint-up(md) {
        padding-right: 8px;
      }
    }
    .region, .email {
      @include media-breakpoint-up(xs) {
        padding-left: 6px;
      }
      @include media-breakpoint-up(md) {
        padding-left: 8px;
      }
    }
  }
  table {
    background-color: $gray-300;
  }
  tbody {
    tr {
      border-bottom: 1px solid #fff;
    }
  }
  .order-products {
    border-top: 1px solid $white;
  }
  .order-total {
    @include media-breakpoint-up(xs) {
      padding-right: 12px;
    }
    @include media-breakpoint-up(md) {
      padding-right: 16px;
    }
    background-color: $gray-300;
    font-size: 14px;
  }
  .form-group {
    margin-bottom: 16px;
  }
}
</style>
