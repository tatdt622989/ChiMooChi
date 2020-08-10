<template>
  <div class="dashboard-header">
    <button class="sidebar-toggler btn-square btn-outline-secondary"
    @click="openSidebarRequest">
      <span class="material-icons">menu</span>
    </button>
    <h1
      class="dashboard-header-title f-lg-30 f-24 my-24 ml-0 ml-lg-0"
      :class="{ 'is-order' : isOrder  }"
    >{{ headerText }}管理</h1>
    <button
      class="btn-square btn-tertiary d-block d-lg-none"
      v-if="targetModal"
      @click="openModal"
    >
      <span class="material-icons">add</span>
    </button>
    <Search
      class="search-form"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <button
      class="btn btn-tertiary d-none d-lg-block order-2"
      @click="openModal"
      v-if="targetModal"
    >建立{{ headerText }}</button>
  </div>
</template>

<script>
import $ from 'jquery';
import Search from '@/components/Search.vue';

export default {
  name: 'Header',
  components: {
    Search,
  },
  data() {
    return {
      headerText: '商品',
      targetModal: '#dashboardProductsModal',
      isOrder: false,
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
      vm.isOrder = false;
      switch (path) {
        case '/dashboard/products':
          vm.headerText = '商品';
          vm.targetModal = '#dashboardProductsModal';
          break;
        case '/dashboard/orders':
          vm.headerText = '訂單';
          vm.targetModal = false;
          vm.isOrder = true;
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
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.dashboard-header-title {
  &.is-order {
    padding-right: 44px;
  }
  @include media-breakpoint-up(xs) {
    text-align: center;
  }
  @include media-breakpoint-up(lg) {
    text-align: left;
  }
  flex-grow: 1;
}
</style>
