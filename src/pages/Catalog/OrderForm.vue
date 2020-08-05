<template>
  <div class="row w-100 mb-lg-90 mb-md-60 mb-45">
    <div class="order-form-wrap col-12 col-md-10 col-lg-8 d-flex flex-wrap justify-content-center
    offset-lg-2 offset-md-1 p-md-24 p-sm-16 p-12">
      <h1 class="f-lg-30 f-24 mt-8 mb-32 w-100">訂單資料</h1>
      <button
        class="order-form-cart-list-btn btn btn-outline-secondary
        d-flex justify-content-center f-16 mb-20"
        data-toggle="collapse"
        data-target="#order-form-table"
      >
        購物車清單
        <span class="material-icons">arrow_drop_down</span>
      </button>
      <div class="collapse w-100" id="order-form-table">
        <ShoppingCartListTable v-bind="$attrs"/>
      </div>
      <ValidationObserver
        ref="form"
        tag="form"
        class="order-form"
        @submit.prevent="setOrder"
      >
        <ValidationProvider
          class="order-form-group form-group"
          rules="required"
          tag="div"
          v-slot="{ errors, failed }"
        >
          <label for="user-name" class="w-100 text-left">姓名</label>
          <input
            type="text"
            class="order-form-input form-control"
            :class="{ 'is-invalid' : failed }"
            id="user-name"
            placeholder="請輸入姓名"
            autocomplete="name"
            v-model="order.user.name"
          />
          <div class="invalid-feedback">{{ errors[0] }}</div>
        </ValidationProvider>
        <p class="text-left w-100 mb-8">地址</p>
        <div class="d-flex w-100 align-items-start">
          <ValidationProvider
            class="order-form-group form-group pr-4 mb-8"
            rules="required"
            tag="div"
            v-slot="{ errors, failed }"
          >
            <select
              class="form-control px-md-24 px-16"
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
            class="order-form-group form-group pl-4 mb-8"
            rules="required"
            tag="div"
            v-slot="{ errors, failed }"
          >
            <select
              class="form-control px-md-24 px-16"
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
          class="order-form-group form-group"
          rules="required"
          tag="div"
          v-slot="{ errors, failed }"
        >
          <input
            type="text"
            class="order-form-input form-control"
            :class="{ 'is-invalid' : failed }"
            placeholder="請輸入地址"
            autocomplete="on"
            v-model="tempAddress"
          />
          <div class="invalid-feedback">{{ errors[0] }}</div>
        </ValidationProvider>
        <ValidationProvider
          class="order-form-group form-group"
          rules="required|numeric|max:10"
          tag="div"
          v-slot="{ errors, failed }"
        >
          <label for="mobile-phone">手機</label>
          <input
            type="text"
            class="order-form-input form-control"
            :class="{ 'is-invalid' : failed }"
            id="mobile-phone"
            placeholder="請輸入手機號碼"
            autocomplete="on"
            v-model="order.user.tel"
          />
          <div class="invalid-feedback">{{ errors[0] }}</div>
        </ValidationProvider>
        <ValidationProvider
          class="order-form-group form-group"
          rules="required|email"
          tag="div"
          v-slot="{ errors, failed }"
        >
          <label for="email">電子信箱</label>
          <input
            type="email"
            class="order-form-input form-control"
            :class="{ 'is-invalid' : failed }"
            id="email"
            placeholder="請輸入電子信箱"
            autocomplete="email"
            v-model="order.user.email"
          />
          <div class="invalid-feedback">{{ errors[0] }}</div>
        </ValidationProvider>
        <div class="order-form-group form-group">
          <label for="notes" class="textarea-form-label">備註</label>
          <textarea
            class="form-control border-0 form-textarea"
            id="notes"
            rows="3"
            autocomplete="on"
            v-model="order.message"
          ></textarea>
        </div>
        <div class="d-flex mt-md-32 mt-24
        justify-content-between w-100">
          <router-link class="btn btn-dark" to="/shopping-cart">回購物車</router-link>
          <button class="btn btn-primary" type="submit">開始結帳</button>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import ShoppingCartListTable from '@/components/Catalog/ShoppingCartListTable.vue';
import areaList from '@/assets/area-list.json';

export default {
  name: 'OrderForm',
  components: {
    ShoppingCartListTable,
  },
  data() {
    return {
      order: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      areaList,
      regionList: [],
      selectCountyIndex: '',
      selectRegion: '',
      tempAddress: '',
    };
  },
  methods: {
    setOrder() {
      const vm = this;
      vm.$refs.form.validate().then((success) => {
        if (success) {
          const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
          const loader = vm.$loading.show({}, {
            default: this.$createElement('LogoLoadingAnimation'),
          });
          vm.selectRegion = vm.selectRegion.split(' ');
          vm.order.user.address = `${vm.selectRegion[1]} ${vm.areaList[vm.selectCountyIndex].county}${vm.selectRegion[0]}${vm.tempAddress}`;
          console.log(api);
          this.$http.post(api, { data: vm.order }).then((response) => {
            console.log(response.data);
            if (response.data.success) {
              vm.$emit('update:order', vm.order);
              vm.$emit('update:order-id', response.data.orderId);
              vm.$emit('update:order-total', response.data.total);
              vm.$router.push('payment');
            } else {
              vm.$bus.$emit('message:push', '失敗', response.data.message, 'danger');
            }
            loader.hide();
          });
        }
      });
    },
    getRegion(countyIndex) {
      if (countyIndex !== '') {
        this.regionList = this.areaList[countyIndex].region;
      }
    },
  },
};
</script>

<style lang="scss">
.order-form-wrap {
  background-color: $order-form-bg-color;
}
.order-form-cart-list-btn {
  padding-right: 20px;
}
.order-form-cart-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  width: 100%;
}
.order-form {
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.order-form-group {
  select {
    border: 1px solid #fff;
  }
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;
  width: 100%;
}
.order-form-input {
  @include media-breakpoint-up(xs) {
    padding-left: 16px;
  }
  @include media-breakpoint-up(md) {
    padding-left: 24px;
  }
  border: 1px solid #fff;
  height: 44px;
  width: 100%;
}
.form-control {
  resize: none;
}
.form-row {
  margin: 0;
}
.form-textarea {
  @include media-breakpoint-up(xs) {
    padding: 10px 16px;
  }
  @include media-breakpoint-up(md) {
    padding: 10px 24px;
  }
  height: 88px;
  padding: 8px 0;
}
</style>
