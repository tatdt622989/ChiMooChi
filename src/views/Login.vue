<template>
  <div class="login container-fluid p-0">
    <div class="login-panel">
      <div class="login-panel-nav">
        <a href="#" class="btn-square text-hover-primary pointer-event" @click="$router.go(-1)">
          <span class="material-icons">keyboard_backspace</span>
        </a>
        <router-link to="/" class="login-panel-logo"></router-link>
      </div>
      <div class="login-panel-body">
          <h1 class="f-30 f-md-36 mb-28 text-left">歡迎來到奇木奇！</h1>
          <form class="d-flex flex-wrap" @submit.prevent="signIn">
            <label class="text-left w-100-pct" for="username">會員帳號</label>
            <input class="login-input" type="text" id="username" autocomplete="username" />
            <label class="text-left w-100-pct" for="current-password">會員密碼</label>
            <input
              class="login-input"
              type="text"
              id="current-password"
              autocomplete="current-password"
            />
            <button class="btn btn-primary mt-28 w-100-pct">登入</button>
          </form>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  methods: {
    signIn() {
      const vm = this;
      vm.$router.push('dashboard/products');
    },
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
  @include media-breakpoint-up(xs) {
    background-image: url('~@/assets/images/white-logo.svg');
  }
  @include media-breakpoint-up(lg) {
    background-image: url('~@/assets/images/logo.svg');
  }
  background-repeat: no-repeat;
  background-position: center center;
  height: 44px;
  margin-left: 12px;
  width: 100px;
}
.login-input {
  @include media-breakpoint-up(xs) {
    border: 1px solid white;
    color: $white;
  }
  @include media-breakpoint-up(lg) {
    border: 1px solid $secondary;
    color: $secondary;
  }
  background-color: rgba(0, 0, 0, 0);
  height: 44px;
  margin-top: 16px;
  margin-bottom: 16px;
  width: 100%;
}
.login-panel {
  @include media-breakpoint-up(xs) {
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    height: 100vh;
    padding: 0 24px;
    width: 100%;
  }
  @include media-breakpoint-up(lg) {
    background-color: #fff;
    color: $secondary;
    width: 60%;
  }
  @include media-breakpoint-up(xl) {
    width: 40%;
  }
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  justify-content: center;
}
.login-panel-nav {
  .material-icons {
    @include media-breakpoint-up(xs) {
      color: white;
    }
    @include media-breakpoint-up(lg) {
      color: inherit;
    }
  }
  display: flex;
  left: 24px;
  position: absolute;
  top: 24px;
}
.login-panel-body {
  margin: auto;
  width: 375px;
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
