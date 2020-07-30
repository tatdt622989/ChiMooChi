import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
  configure,
} from 'vee-validate';
import {
  required,
  email,
  // eslint-disable-next-line camelcase
  alpha_dash,
  max,
  numeric,
} from 'vee-validate/dist/rules';
import TW from 'vee-validate/dist/locale/zh_TW.json';
import 'bootstrap';
import LogoLoadingAnimation from '@/components/LogoLoadingAnimation.vue';
import App from './App.vue';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';

Vue.config.productionTip = false;

Vue.use(Loading, {
  opacity: 0.8,
  zIndex: 1060,
});
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;

Vue.component('LogoLoadingAnimation', LogoLoadingAnimation);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.filter('currency', currencyFilter);

localize('zh_TW', TW);

extend('required', {
  ...required,
  message: '此欄位為必填',
});

// Add the email rule
extend('email', {
  ...email,
  message: '此欄位需為電子郵件',
});

extend('alpha_dash', {
  // eslint-disable-next-line camelcase
  ...alpha_dash,
  message: '此欄位需為英文字母或數字',
});

extend('max', {
  ...max,
  message: '此欄位最大不可超過{length}個字元',
});

extend('numeric', {
  ...numeric,
  message: '此欄位需為數字',
});

configure({
  classes: {
    invalid: 'is-invalid',
  },
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

router.beforeEach((to, from, next) => {
  // 確認前往的頁面是否需要要驗證
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    // 在這裡不使用this而是直接使用axios來使用套件
    axios.post(api).then((response) => {
      console.log(response.data);
      // 確認使用者是否登入
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});
