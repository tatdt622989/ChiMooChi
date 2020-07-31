<template>
  <div>
    <div class="sidebar" :class="{'show' : isShow}" :style="{ height: windowHeight}">
      <button class="sidebar-close-btn my-24 my-md-32 btn-square btn-secondary"
      @click="closeSidebarRequest">
        <span class="material-icons">close</span>
      </button>
      <router-link to="/">
        <img class="my-24 my-md-32 mr-16 mx-lg-24" src="@/assets/images/white-logo.svg">
      </router-link>
      <ul class="sidebar-list">
        <li class="sidebar-item" @click="closeSidebarRequest">
          <router-link to="/dashboard/products" class="sidebar-link btn btn-secondary"
          active-class="active">
            <span class="material-icons">local_mall</span>
            商品管理</router-link></li>
        <li class="sidebar-item" @click="closeSidebarRequest">
          <router-link to="/dashboard/orders" class="sidebar-link btn btn-secondary"
          active-class="active">
            <span class="material-icons">receipt</span>
            訂單管理</router-link></li>
        <li class="sidebar-item" @click="closeSidebarRequest">
          <router-link to="/dashboard/coupons" class="sidebar-link btn btn-secondary"
          active-class="active">
            <img class="sidebar-icon" src="@/assets/images/coupon.svg">
            優惠券管理</router-link></li>
      </ul>
      <button class="logout-btn align-self-end btn btn-secondary w-100" @click="signout">
        <span class="material-icons">keyboard_backspace</span>
        登出
      </button>
    </div>
    <transition name="bg-fade">
      <div v-if="isShow === true" class="fullscreen-bg"
      @click="closeSidebarRequest">
      </div>
    </transition>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'Sidebar',
  props: ['isShow'],
  data() {
    return {
      windowHeight: `${window.innerHeight}px`,
    };
  },
  methods: {
    signout() {
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      const vm = this;
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.$router.push('/');
        }
      });
      vm.closeSidebarRequest();
    },
    closeSidebarRequest() {
      this.$emit('close-sidebar-request');
    },
  },
  created() {
    const vm = this;
    // 視窗大小改變，關閉導覽列
    $(window).resize(() => {
      vm.$emit('close-sidebar-request');
      $('body').css('overflow', '');
      vm.windowHeight = `${window.innerHeight}px`;
    });
  },
  destroyed() {
    $('body').css('overflow', '');
    // 導覽列移除後，將resize事件也移除
    $(window).off('resize');
  },
};
</script>

<style lang="scss">
.sidebar {
  @include media-breakpoint-up(xs) {
    box-shadow: 2px 0px 6px rgba(0, 0, 0, 0.4);
    left: -226px;
    width: 220px;
  }
  @include media-breakpoint-up(lg) {
    box-shadow: none;
    left: 0;
    width: 180px;
  }
  &.show {
    left: 0;
  }
  align-items: flex-start;
  align-content: flex-start;
  background-color: $sidebar-bg-color;
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  height: 100%;
  justify-content: flex-start;
  position: fixed;
  top: 0;
  transition: $transition-base;
  z-index: 1000;
}
.sidebar-list {
  .material-icons,.sidebar-icon {
    @include media-breakpoint-up(xs) {
      margin-right: 26px;
    }
    @include media-breakpoint-up(lg) {
      margin-right: 8px;
    }
    color: white;
  }
  list-style: none;
  padding: 0;
  width: 100%;
}
.sidebar-link {
  &.btn-secondary:not(:disabled):not(.disabled).active {
    &:active {
      background-color: $dark;
    }
    &:focus {
      box-shadow: none;
    }
    background-color: $dark;
    border: 1px solid $dark;
  }
  align-items: center;
  color: $sidebar-link-color;
  display: flex;
  padding-left: 24px;
  text-align: left;
  width: 100%;
}
.sidebar-item {
  display: flex;
}
.logout-btn {
  .material-icons,.sidebar-icon {
    @include media-breakpoint-up(xs) {
      margin-right: 26px;
    }
    @include media-breakpoint-up(lg) {
      margin-right: 8px;
    }
  }
  bottom: 16px;
  display: flex;
  justify-content: flex-start;
  left: 0;
  padding-left: 24px;
  position: absolute;
}
.sidebar-close-btn {
  @include media-breakpoint-up(xs) {
    display: block;
  }
  @include media-breakpoint-up(lg) {
    display: none;
  }
  margin-top: 32px;
  margin-left: 14px;
  margin-right: 14px;
}
</style>
