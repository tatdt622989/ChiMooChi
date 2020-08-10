<template>
  <div class="dashboard-coupon">
    <table class="table mt-24">
      <thead>
        <tr>
          <th>
            <button
              class="btn font-weight-bold p-0"
              @click="couponsFilter('title')"
            >
              名稱
              <span
                class="material-icons"
                :class="{ active : sortAttr === 'title',
                reverse : isReverse }"
              >keyboard_arrow_down</span>
            </button>
          </th>
          <th class="responsive">
            <button
              class="btn font-weight-bold p-0"
              @click="couponsFilter('code')"
            >
              序號
              <span
                class="material-icons"
                :class="{ active : sortAttr === 'code',
                reverse : isReverse }"
              >keyboard_arrow_down</span>
            </button>
          </th>
          <th class="pl-12">
            <button
              class="btn font-weight-bold p-0"
              @click="couponsFilter('percent')"
            >
              折扣
              <span
                class="material-icons"
                :class="{ active : sortAttr === 'percent',
                reverse : isReverse }"
              >keyboard_arrow_down</span>
            </button>
          </th>
          <th class="responsive">
            <button
              class="btn font-weight-bold p-0"
              @click="couponsFilter('due_date')"
            >
              截止日期
              <span
                class="material-icons"
                :class="{ active : sortAttr === 'due_date',
                reverse : isReverse }"
              >keyboard_arrow_down</span>
            </button>
          </th>
          <th class="nowrap">
            <button
              class="btn font-weight-bold p-0"
              @click="couponsFilter('is_enabled')"
            >
              啟用狀態
              <span
                class="material-icons"
                :class="{ active : sortAttr === 'is_enabled',
                reverse : isReverse }"
              >keyboard_arrow_down</span>
            </button>
          </th>
          <th class="text-center nowrap info-edit"><p>詳情編輯</p></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedCoupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td class="responsive">{{ item.code }}</td>
          <td class="font-weight-bold text-danger pl-12">{{ getDiscount(item.percent) }}折</td>
          <td class="responsive">{{ getTime(item.due_date) }}</td>
          <td
            class="font-weight-bold nowrap"
            :class="[item.is_enabled ? 'text-primary' : 'text-light']"
          >
            {{ item.is_enabled ? '已啟用' : '未啟用' }}
          </td>
          <td class="text-center nowrap info-edit">
            <button
              class="btn-square btn-outline-secondary"
              @click="openEditModal(item)"
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
    <div
      class="dashboard-coupons-modal modal fade"
      id="dashboardCouponsModal"
      tabindex="-1" role="dialog"
      aria-labelledby="dashboardCouponsModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">
            {{ isNewModal ? '優惠券建立' : '優惠券編輯'}}
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <ValidationObserver
          tag="form"
          ref="form"
          @submit.prevent="upadateCoupons(isNewModal ? '建立' : '修改')"
        >
        <div class="modal-body pt-0 text-left">
            <ValidationProvider
              class="form-group"
              rules="required"
              v-slot="{ errors, failed }"
              tag="div"
            >
              <label for="name">名稱</label>
              <input
                class="form-control"
                :class="{ 'is-invalid' : failed }"
                type="text"
                id="name"
                autocomplete="name"
                v-model="tempCoupon.title"
              >
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </ValidationProvider>
            <div class="d-block d-sm-flex">
              <ValidationProvider
                class="form-group pr-8"
                rules="required|alpha_dash|max:16"
                v-slot="{ errors, failed }"
                tag="div"
              >
                <label for="code">序號</label>
                <input
                  class="form-control"
                  :class="{ 'is-invalid' : failed }"
                  type="text"
                  id="code"
                  autocomplete="on"
                  v-model="tempCoupon.code"
                >
                <div class="invalid-feedback">{{ errors[0] }}</div>
              </ValidationProvider>
              <ValidationProvider
                class="form-group ml-sm-8"
                rules="required|numeric|max:2"
                v-slot="{ errors, failed }"
                tag="div"
              >
                <label for="discount">優惠折數</label>
                <input
                  class="form-control"
                  :class="{ 'is-invalid' : failed }"
                  type="text"
                  id="discount"
                  autocomplete="on"
                  v-model="tempCoupon.percent"
                >
                <div class="invalid-feedback">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>
          <p class="mb-8">截止時間</p>
          <div class="d-flex mb-8">
            <ValidationProvider
              class="form-group mr-8"
              rules="required"
              v-slot="{ errors, failed }"
              tag="div"
            >
              <select
                class="form-control"
                :class="{ 'is-invalid' : failed }"
                id="year"
                @change="updateOption('year')"
                v-model="selectTime.year"
                required
              >
                <option disabled value="">年</option>
                <option v-for="n in 100" :key="n" :value="now.year - 1 + n">
                  {{ now.year - 1 + n }}
                </option>
              </select>
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </ValidationProvider>
            <ValidationProvider
              class="form-group mx-8"
              rules="required"
              v-slot="{ errors, failed }"
              tag="div"
            >
              <select
                class="form-control"
                :class="{ 'is-invalid' : failed }"
                id="month"
                @change="updateOption('month')"
                v-model="selectTime.month"
                required
              >
                <option disabled value="">月</option>
                <option
                  v-for="n in isThisYear ? 12 - now.month + 1 : 12"
                  :key="n"
                  :value="isThisYear ? now.month - 1 + n : n"
                >
                  {{ timeStr(isThisYear ? now.month - 1 + n : n) }}
                </option>
              </select>
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </ValidationProvider>
            <ValidationProvider
              class="form-group ml-8"
              rules="required"
              v-slot="{ errors, failed }"
              tag="div"
            >
              <select
                class="form-control"
                :class="{ 'is-invalid' : failed }"
                id="day"
                @change="updateOption('day')"
                v-model="selectTime.day"
                required
              >
                <option disabled value="">日</option>
                <option
                  v-for="n in isThisYear ? daysInMonth - now.day + 1 : daysInMonth"
                  :key="n"
                  :value="isThisYear ? now.day + n - 1 : n"
                >
                  {{ timeStr(isThisYear ? now.day + n - 1 : n) }}
                </option>
              </select>
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="d-flex mb-16">
            <ValidationProvider
              class="form-group mr-8"
              rules="required"
              v-slot="{ errors, failed }"
              tag="div"
            >
              <select
                class="form-control"
                :class="{ 'is-invalid' : failed }"
                id="hour"
                v-model="selectTime.hour"
                required
              >
                <option disabled value="">時</option>
                <option
                  v-for="n in isThisYear ? 24 - now.hour : 24"
                  :key="n"
                  :value="isThisYear ? now.hour + n - 1 : n"
                >{{ timeStr(isThisYear ? now.hour + n - 1 : n) }}</option>
              </select>
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </ValidationProvider>
            <ValidationProvider
              class="form-group ml-8"
              rules="required"
              v-slot="{ errors, failed }"
              tag="div"
            >
              <select
                class="form-control"
                :class="{ 'is-invalid' : failed }"
                id="minute"
                v-model="selectTime.minute"
                required
              >
                <option disabled value="">分</option>
                <option
                  v-for="n in isThisYear ? 60 - now.minute -1 : 60"
                  :key="n"
                  :value="isThisYear ? now.minute + n - 1 : n"
                >{{ timeStr(isThisYear ? now.minute + n - 1 : n) }}</option>
              </select>
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <p>啟用狀態</p>
          <div class="switch-group mt-8">
            <input
              class="switch-checkbox"
              type="checkbox"
              id="couponSwitch"
              v-model="tempCoupon.is_enabled"
            />
            <label class="switch-label" for="couponSwitch"></label>
          </div>
        </div>
        <div class="modal-footer p-16">
          <button
            type="button"
            class="btn my-0 mr-16"
            :class="[isNewModal ? 'btn-dark': 'btn-danger']"
            @click="openDeleteModal"
          >{{ isNewModal ? '取消' : '刪除' }}</button>
          <button
            type="submit"
            class="btn btn-tertiary m-0 ml-sm-8"
          >{{ isNewModal ? '建立' : '修改' }}</button>
          <Delete
            :isOpenDeleteModal.sync="isOpenDeleteModal"
            @deleteData="upadateCoupons('刪除')"
          >優惠券</Delete>
        </div>
        </ValidationObserver>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Delete from '@/components/Delete.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Coupons',
  components: {
    Delete,
    Pagination,
  },
  props: ['isNewModal', 'search'],
  data() {
    return {
      allCoupons: [],
      tempCoupon: {},
      searchCoupons: [],
      paginatedCoupons: [],
      pagination: {},
      now: {},
      selectTime: {
        year: '',
        month: '',
        day: '',
        hour: '',
        minute: '',
      },
      daysInMonth: 31,
      sortAttr: '',
      isThisYear: false,
      isOpenDeleteModal: false,
      isReverse: false,
    };
  },
  methods: {
    getCoupons() {
      const vm = this;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=1`;
      const loader = vm.$loading.show({}, {
        default: vm.$createElement('LogoLoadingAnimation'),
      });
      vm.$http.get(api).then((response) => {
        vm.allCoupons = response.data.coupons;
        vm.pagination = response.data.pagination;
        const otherCouponsRequest = [];
        if (vm.pagination.total_pages > 1) {
          let i = 1;
          while (i < vm.pagination.total_pages) {
            const page = i + 1;
            api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
            otherCouponsRequest.push(vm.$http.get(api));
            i += 1;
          }
          vm.$http.all(otherCouponsRequest).then(
            vm.$http.spread((...couponsResponse) => {
              const CouponsArray = couponsResponse.map((obj) => obj.data.coupons);
              let couponsConcat = [];
              CouponsArray.forEach((obj) => {
                couponsConcat = couponsConcat.concat(obj);
              });
              couponsConcat.forEach((obj) => {
                vm.allCoupons.push(obj);
              });
              vm.couponsFilter();
              loader.hide();
            }),
          );
        } else {
          vm.couponsFilter();
          loader.hide();
        }
      });
    },
    couponsFilter(sortAttr = 'title', trigger = 'table-header') {
      const vm = this;
      const target = vm.search ? vm.searchCoupons : vm.allCoupons;
      vm.sortProducts(sortAttr, trigger, target);
      vm.getPagination(target);
      vm.paginateCoupons(target);
    },
    upadateCoupons(couponHandlingmethod) {
      const vm = this;
      const dueDate = new Date(
        vm.selectTime.year,
        vm.selectTime.month - 1,
        vm.selectTime.day,
        parseInt(vm.selectTime.hour, 10),
        parseInt(vm.selectTime.minute, 10),
      );
      let api;
      let httpMethod;
      if (!vm.tempCoupon.is_enabled) { vm.tempCoupon.is_enabled = false; }
      vm.tempCoupon.due_date = dueDate.getTime();
      vm.tempCoupon.percent = vm.getPercent(vm.tempCoupon.percent);
      if (couponHandlingmethod === '建立') {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
        httpMethod = 'post';
      } else if (couponHandlingmethod === '修改') {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = 'put';
      } else if (couponHandlingmethod === '刪除') {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = 'delete';
        vm.openDeleteModal = false;
        vm.updateCouponsMethods(httpMethod, api, couponHandlingmethod);
        return;
      }
      vm.$refs.form.validate().then((success) => {
        if (success) {
          vm.$refs.form.reset();
          vm.updateCouponsMethods(httpMethod, api, couponHandlingmethod);
        }
      });
    },
    updateCouponsMethods(httpMethod, api, msg) {
      const vm = this;
      const loader = vm.$loading.show({}, {
        default: vm.$createElement('LogoLoadingAnimation'),
      });
      vm.$http[httpMethod](api, { data: vm.tempCoupon }).then((response) => {
        loader.hide();
        if (response.data.success) {
          vm.$bus.$emit('message:push', '成功', `資料${msg}成功`, 'success');
        } else {
          vm.$bus.$emit('message:push', '失敗', response.data.message, 'danger');
        }
        $('#dashboardCouponsModal').modal('hide');
        vm.getCoupons();
      });
    },
    openEditModal(item) {
      const vm = this;
      const dueDate = new Date(item.due_date);
      vm.$emit('update:isNewModal', false);
      vm.tempCoupon = { ...item };
      if (vm.now.timestamp > item.due_date) {
        vm.resetTimeSelect();
        vm.$bus.$emit('message:push', '提醒', '此優惠券已經過期，請更新日期', 'warning');
      } else {
        vm.selectTime.year = dueDate.getFullYear();
        vm.selectTime.month = dueDate.getMonth() + 1;
        vm.selectTime.day = dueDate.getDate();
        vm.selectTime.hour = dueDate.getHours();
        vm.selectTime.minute = dueDate.getMinutes();
      }
      $('#dashboardCouponsModal').modal('show');
    },
    updateOption(select) {
      const vm = this;
      const setDate = new Date(vm.selectTime.year, vm.selectTime.month, 0);
      vm.daysInMonth = setDate.getDate();
      if (vm.selectTime.year === vm.now.year) {
        vm.isThisYear = true;
      } else {
        vm.isThisYear = false;
      }
      if (select === 'year') {
        vm.selectTime.month = '';
        vm.selectTime.day = '';
      }
      if (select === 'month') {
        vm.selectTime.day = '';
      }
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
    getCurrentTime() {
      const vm = this;
      const now = new Date();
      vm.now.year = now.getFullYear();
      vm.now.month = now.getMonth() + 1;
      vm.now.day = now.getDate();
      vm.now.hour = now.getHours();
      vm.now.minute = now.getMinutes();
      vm.now.timestamp = now.getTime();
    },
    getTime(timestamp) {
      const vm = this;
      const dueDate = new Date(timestamp);
      const month = vm.timeStr(dueDate.getMonth() + 1);
      const day = vm.timeStr(dueDate.getDate());
      const str = `${dueDate.getFullYear()}-${month}-${day}`;
      return str;
    },
    openDeleteModal() {
      const vm = this;
      if (vm.isNewModal) {
        $('#dashboardCouponsModal').modal('hide');
      } else {
        vm.isOpenDeleteModal = true;
      }
    },
    resetTimeSelect() {
      const vm = this;
      vm.selectTime.year = '';
      vm.selectTime.month = '';
      vm.selectTime.day = '';
      vm.selectTime.hour = '';
      vm.selectTime.minute = '';
    },
    sortProducts(attr, trigger, target) {
      const vm = this;
      if (vm.sortAttr === attr && trigger === 'table-header') {
        vm.isReverse = !vm.isReverse;
      } else {
        vm.isReverse = false;
      }
      target.sort((a, b) => {
        if (attr === 'percent' || attr === 'due_date') {
          return vm.isReverse ? a[attr] - b[attr] : b[attr] - a[attr];
        }
        if (attr === 'is_enabled') {
          return vm.isReverse ? +a[attr] - +b[attr] : +b[attr] - +a[attr];
        }
        return vm.isReverse ? b[attr].localeCompare(a[attr], 'zh-hant') : a[attr].localeCompare(b[attr], 'zh-hant');
      });
      vm.sortAttr = attr;
    },
    getDiscount(percent) {
      if (percent % 10 === 0) {
        return percent / 10;
      }
      const discount = percent;
      return discount;
    },
    getPercent(discount) {
      if (discount < 10) {
        return discount * 10;
      }
      const percent = discount;
      return percent;
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
    paginateCoupons(array) {
      const vm = this;
      const target = array;
      const startIndex = (vm.pagination.current_page - 1) * 10;
      const result = target.filter((obj, index) => {
        if (startIndex <= index && startIndex + 9 >= index) {
          return obj;
        }
        return false;
      });
      vm.paginatedCoupons = result;
    },
    changePage(page) {
      const vm = this;
      const target = vm.search ? vm.searchCoupons : vm.allCoupons;
      vm.updatePagination(page);
      vm.paginateCoupons(target);
    },
  },
  watch: {
    search() {
      const vm = this;
      if (vm.search) {
        const result = vm.allCoupons.filter((obj) => {
          const str = obj.title + obj.code + vm.getTime(obj.due_date) + obj.percent;
          if (str.indexOf(vm.search) > -1) {
            return obj;
          }
          return false;
        });
        if (result.length) {
          vm.searchCoupons = result;
        } else {
          vm.searchCoupons = [];
        }
      }
      vm.couponsFilter('title', 'search');
    },
  },
  created() {
    const vm = this;
    vm.getCoupons();
    vm.getCurrentTime();
  },
  mounted() {
    const vm = this;
    $('#dashboardCouponsModal').on('hide.bs.modal', () => {
      vm.tempCoupon = {};
      vm.resetTimeSelect();
      vm.isOpenDeleteModal = false;
      vm.$refs.form.reset();
    });
  },
  destroyed() {
    $('#dashboardCouponsModal').off('hide.bs.modal');
  },
};
</script>

<style lang="scss">
.dashboard-coupons-modal {
  .form-group {
    padding-bottom: 12px;
  }
}
</style>
