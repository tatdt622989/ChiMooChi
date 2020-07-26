<template>
  <div class="dashboardCoupon">
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
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td class="font-weight-bold text-danger">{{ item.percent }}折</td>
          <td class="responsive">{{ getTime(item.due_date) }}</td>
          <td class="font-weight-bold" :class="[item.is_enabled ? 'text-primary' : 'text-light']">
            {{ item.is_enabled ? '已啟用' : '未啟用' }}
          </td>
          <td>
            <button
              class="btn-square btn-outline-secondary"
              data-toggle="modal"
              data-target="#dashboardOrdersModal"
              @click="openEditModal(item)"
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
        <ValidationObserver tag="form" ref="form" @submit.prevent="upadateCoupons">
        <div class="modal-body pt-0 text-left">
            <ValidationProvider
              class="form-group"
              rules="required"
              v-slot="{ errors, invalid, touched, failed }"
              tag="div"
            >
              <label for="name">名稱</label>
              <input
                class="form-control"
                :class="{ 'is-invalid' : invalid && touched || invalid && failed }"
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
                v-slot="{ errors, invalid, touched, failed }"
                tag="div"
              >
                <label for="code">序號</label>
                <input
                  class="form-control"
                  :class="{ 'is-invalid' : invalid && touched || invalid && failed }"
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
                v-slot="{ errors, invalid, touched, failed }"
                tag="div"
              >
                <label for="discount">優惠折數</label>
                <input
                  class="form-control"
                  :class="{ 'is-invalid' : invalid && touched || invalid && failed }"
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
              v-slot="{ errors, invalid, touched, failed }"
              tag="div"
            >
              <select
                class="form-control"
                :class="{ 'is-invalid' : invalid && touched || invalid && failed }"
                id="year"
                @change="updateOption('year')"
                v-model="selectTime.year"
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
              v-slot="{ errors, invalid, touched, failed }"
              tag="div"
            >
              <select
                class="form-control"
                :class="{ 'is-invalid' : invalid && touched || invalid && failed }"
                id="month"
                @change="updateOption('month')"
                v-model="selectTime.month"
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
              v-slot="{ errors, invalid, touched, failed }"
              tag="div"
            >
              <select
                class="form-control"
                :class="{ 'is-invalid' : invalid && touched || invalid && failed }"
                id="day"
                @change="updateOption('day')"
                v-model="selectTime.day"
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
              v-slot="{ errors, invalid, touched, failed }"
              tag="div"
            >
              <select
                class="form-control"
                :class="{ 'is-invalid' : invalid && touched || invalid && failed }"
                id="hour"
                v-model="selectTime.hour"
              >
                <option disabled value="">時</option>
                <option
                  v-for="n in 24"
                  :key="n"
                  :value="n - 1"
                >{{ timeStr(n - 1) }}</option>
              </select>
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </ValidationProvider>
            <ValidationProvider
              class="form-group ml-8"
              rules="required"
              v-slot="{ errors, invalid, touched, failed }"
              tag="div"
            >
              <select
                class="form-control"
                :class="{ 'is-invalid' : invalid && touched || invalid && failed }"
                id="minute"
                v-model="selectTime.minute"
              >
                <option disabled value="">分</option>
                <option
                  v-for="n in 60"
                  :key="n"
                  :value="n - 1"
                >{{ timeStr(n - 1) }}</option>
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
            class="btn btn-secondary m-0 mr-sm-8"
            data-dismiss="modal"
          >取消</button>
          <button
            type="submit"
            class="btn btn-primary m-0 ml-sm-8"
          >建立</button>
        </div>
        </ValidationObserver>
      </div>
    </div>
    </div>
    <Toast />
  </div>
</template>

<script>
import $ from 'jquery';
import Toast from '@/components/Toast.vue';

export default {
  name: 'Coupons',
  components: {
    Toast,
  },
  props: ['isNewModal'],
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      now: {},
      selectTime: {
        year: '',
        month: '',
        day: '',
        hour: '',
        minute: '',
      },
      daysInMonth: 31,
      isThisYear: false,
      isLeapYear: false,
    };
  },
  methods: {
    getCoupons(page = 1, loadMethod) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=:${page}`;
      const loader = vm.$loading.show({}, {
        default: this.$createElement('LogoLoadingAnimation'),
      });
      this.$http.get(api).then((response) => {
        vm.coupons = response.data.coupons;
        console.log(response.data);
        loader.hide();
        if (loadMethod === 'update') {
          vm.$bus.$emit('message:push', '成功', '資料載入成功', 'success');
        }
      });
    },
    upadateCoupons() {
      console.log('提交');
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
      let msg;
      // 將使用者輸入的時間轉換成至1970年以來的毫秒數
      vm.tempCoupon.due_date = dueDate.getTime();
      if (vm.isNewModal) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
        console.log(api);
        httpMethod = 'post';
        msg = '建立';
      } else {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = 'put';
        msg = '修改';
      }
      vm.$refs.form.validate().then((success) => {
        if (success) {
          const loader = vm.$loading.show({}, {
            default: this.$createElement('LogoLoadingAnimation'),
          });
          vm.$http[httpMethod](api, { data: vm.tempCoupon }).then((response) => {
            loader.hide();
            console.log(response.data);
            if (response.data.success) {
              vm.$bus.$emit('message:push', '成功', `資料${msg}成功`, 'success');
            } else {
              vm.$bus.$emit('message:push', '失敗', response.data.message, 'danger');
            }
            $('#dashboardCouponsModal').modal('hide');
            vm.getCoupons(1, 'update');
          });
        }
      });
    },
    openEditModal(item) {
      const vm = this;
      const dueDate = new Date(item.due_date);
      vm.$emit('update:isNewModal', false);
      // 複製不傳參考的物件
      vm.tempCoupon = { ...item };
      console.log('now', vm.now.timestamp, 'due_date', item.due_date);
      if (vm.now.timestamp > item.due_date) {
        vm.selectTime.year = '';
        vm.selectTime.month = '';
        vm.selectTime.day = '';
        vm.selectTime.hour = '';
        vm.selectTime.minute = '';
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
  },
  watch: {
    isNewModal() {
      const vm = this;
      if (vm.isNewModal) {
        // 如果使用建立新商品的方式開啟modal，則清空modal內容
        vm.tempCoupon = {};
      }
    },
  },
  created() {
    const vm = this;
    vm.getCoupons();
    vm.getCurrentTime();
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
