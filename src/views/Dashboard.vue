<template>
  <div class="header container-fluid d-flex p-0">
    <Sidebar :is-show="willShow"
    @close-sidebar-request = "closeSidebar"/>
    <div class="dashboard-body">
      <Header @open-sidebar-request = "openSidebar"/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Sidebar from '@/components/Dashboard/Sidebar.vue';
import Header from '@/components/Dashboard/Header.vue';

export default {
  name: 'Dashboard',
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      // 這筆資料使用動態props傳到子元件Sidebar內後，
      // 以資料isShow接收，用來在子元件Sidebar內更新畫面，
      // 在子元件Sidebar和Header內則使用emit來修改此資料。
      willShow: false,
    };
  },
  methods: {
    // 子元件Sidebar和Header使用emit觸發的事件，用來修改資料willShow
    openSidebar() {
      const vm = this;
      vm.willShow = true;
      $('body').css('overflow', 'hidden');
    },
    // 子元件Sidebar和Header使用emit觸發的事件，用來修改資料willShow
    closeSidebar() {
      const vm = this;
      vm.willShow = false;
      $('body').css('overflow', '');
    },
  },
};
</script>

<style lang="scss">
.dashboard {
  position: relative;
}
.dashboard-body {
  @include media-breakpoint-up(xs) {
    padding: 0 15px;
  }
  @include media-breakpoint-up(md) {
    padding: 0 30px;
  }
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
