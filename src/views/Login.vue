<template>
  <div class="login container-fluid p-0">
    <div class="login-panel">
      <div class="login-panel-nav">
        <a href="#" class="btn-square text-hover-primary pointer-event" @click="$router.go(-1)">
          <span class="material-icons">keyboard_backspace</span>
        </a>
        <router-link to="/" class="login-panel-logo"></router-link>
      </div>
      <div class="login-panel-content">
        <h1 class="f-30 f-md-36 mt-12 mt-md-0 mb-12 mb-md-28 text-left">歡迎來到奇木奇！</h1>
        <ValidationObserver
          ref="form"
          tag="form"
          class="d-flex flex-wrap"
          @submit.prevent="signIn"
        >
          <ValidationProvider
            class="form-group mb-16"
            rules="email|required"
            v-slot="{ errors, failed }"
            tag="div"
          >
            <label class="text-left w-100" for="username">會員帳號</label>
            <input
              class="login-input form-control"
              :class="{ 'is-invalid' : failed }"
              type="email" id="username"
              autocomplete="username"
              v-model="user.username"
            />
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="form-group mb-16"
            rules="required"
            v-slot="{ errors, failed }"
            tag="div"
          >
            <label class="text-left w-100" for="current-password">會員密碼</label>
            <input
              class="login-input form-control"
              :class="{ 'is-invalid' : failed }"
              type="password"
              id="current-password"
              autocomplete="current-password"
              v-model="user.password"
            />
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </ValidationProvider>
          <button class="btn btn-primary mt-28 w-100" type="submit">登入</button>
        </ValidationObserver>
      </div>
    </div>
    <Toast />
  </div>
</template>
<script>
import Toast from '@/components/Toast.vue';

export default {
  name: 'Login',
  components: {
    Toast,
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      loader: '',
    };
  },
  methods: {
    signIn() {
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      const vm = this;
      vm.$refs.form.validate().then((success) => {
        if (success) {
          vm.loader = this.$loading.show({},
            { default: this.$createElement('LogoLoadingAnimation') });
          this.$http.post(api, vm.user).then((response) => {
            if (response.data.success) {
              vm.$router.push('dashboard/products');
            } else {
              vm.loader.hide();
              vm.$bus.$emit('message:push', '錯誤', '帳號或密碼錯誤', 'danger');
            }
          });
          vm.$refs.form.reset();
        }
      });
    },
  },
  destroyed() {
    this.loader.hide();
  },
};
</script>
<style lang="scss">
.login {
  align-items: flex-end;
  animation: slide 30s linear alternate infinite,
    change-color 7s linear alternate infinite;
  background-origin: border-box;
  background-image: url("~@/assets/images/login-bg.svg");
  background-position: center;
  background-repeat: repeat;
  display: flex;
  width: 100%;
  height: 100vh;
}
.login-panel-logo {
  background-image: url('~@/assets/images/logo.svg');
  background-repeat: no-repeat;
  background-position: center center;
  height: 44px;
  margin-left: 12px;
  width: 100px;
}
.login-input {
  border: 1px solid $secondary;
  margin-top: 16px;
  margin-bottom: 0;
}
.login-panel {
  .form-group {
    width: 100%;
  }
  @include media-breakpoint-up(xs) {
    background-color: rgba(255, 255, 255, 0.85);
    height: 100vh;
    padding: 0;
    width: 100%;
  }
  @include media-breakpoint-up(sm) {
  }
  @include media-breakpoint-up(lg) {
    background-color: #fff;
    padding: 0 24px;
    width: 60%;
  }
  @include media-breakpoint-up(xl) {
    width: 40%;
  }
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  text-align: left;
  justify-content: center;
}
.login-panel-nav {
  @include media-breakpoint-up(xs) {
    left: 12px;
  }
  @include media-breakpoint-up(lg) {
    left: 24px;
  }
  .material-icons {
    color: inherit;
  }
  display: flex;
  position: absolute;
  top: 24px;
}
.login-panel-content {
  @include media-breakpoint-up(xs) {
    max-width: 375px;
    padding: 12px;
  }
  @include media-breakpoint-up(md) {
    max-width: 510px;
    width: 510px;
  }
  margin: auto;
}
@keyframes change-color {
  from {
    background-color: $primary;
  }
  to {
    background-color: $secondary;
  }
}
@keyframes slide {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100% -100%;
  }
}
</style>
