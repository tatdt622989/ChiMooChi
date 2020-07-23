<template>
  <div class="dashboard-header">
    <button class="sidebar-toggler btn-square btn-outline-secondary"
    @click="openSidebarRequest">
      <span class="material-icons">menu</span>
    </button>
    <h1 class="dashboard-header-title f-lg-30 f-24 my-24 ml-0 ml-lg-0">{{ headerText }}管理</h1>
    <button
      class="btn-square btn-primary d-block d-lg-none"
      v-if="targetModal"
      @click="openModal"
    >
      <span class="material-icons">add</span>
    </button>
    <form class="search-form form-inline">
      <button class="search-btn">
        <span class="material-icons lh-1">search</span>
      </button>
      <input class="search-input" type="search" placeholder="搜尋" />
    </form>
    <button
      class="btn btn-primary d-none d-lg-block order-2"
      @click="openModal"
      v-if="targetModal"
    >建立{{ headerText }}</button>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'Header',
  data() {
    return {
      headerText: '商品',
      targetModal: '#dashboardProductsModal',
    };
  },
  methods: {
    openSidebarRequest() {
      this.$emit('open-sidebar-request');
    },
    openModal() {
      const vm = this;
      vm.$emit('update:isNewModal', true);
      $(vm.targetModal).modal('show');
    },
    updateHeader(path) {
      const vm = this;
      switch (path) {
        case '/dashboard/products':
          vm.headerText = '商品';
          vm.targetModal = '#dashboardProductsModal';
          break;
        case '/dashboard/orders':
          vm.headerText = '訂單';
          vm.targetModal = false;
          break;
        case '/dashboard/coupons':
          vm.headerText = '優惠券';
          vm.targetModal = '#dashboardCouponsModal';
          break;
        default:
          break;
      }
    },
  },
  created() {
    const { path } = this.$route;
    this.updateHeader(path);
  },
  watch: {
    $route(to) {
      this.updateHeader(to.path);
    },
  },
};
</script>

<style lang="scss">
.dashboard-header {
  .search-form {
    @include media-breakpoint-up(xs) {
      margin: 0;
      width: 100%;
    }
    @include media-breakpoint-up(lg) {
      margin-right: 24px;
      width: auto;
    }
    border: 0;
    height: 44px;
    padding: 0;
  }
  .search-input {
    @include media-breakpoint-up(xs) {
      width: 100%;
    }
    @include media-breakpoint-up(lg) {
      width: 180px;
    }
    height: 44px;
  }
  .search-btn {
    height: 42px;
    padding: 0 10px;
  }
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.dashboard-header-title {
  @include media-breakpoint-up(xs) {
    text-align: center;
  }
  @include media-breakpoint-up(lg) {
    text-align: left;
  }
  flex-grow: 1;
}
</style>
