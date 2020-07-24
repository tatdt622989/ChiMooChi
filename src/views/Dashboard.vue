<template>
  <div class="header container-fluid d-flex p-0">
    <Sidebar :is-show="isShow"
    @close-sidebar-request = "closeSidebar"/>
    <div class="dashboard-body">
      <Header @open-sidebar-request = "openSidebar" :isNewModal.sync="isNewModal"/>
      <router-view :isNewModal.sync="isNewModal"/>
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
      isShow: false,
      isNewModal: false,
    };
  },
  methods: {
    // 子元件Header使用emit觸發的事件，用來修改資料isShow
    openSidebar() {
      const vm = this;
      vm.isShow = true;
      $('body').css('overflow', 'hidden');
    },
    // 子元件Sidebar使用emit觸發的事件，用來修改資料isShow
    closeSidebar() {
      const vm = this;
      vm.isShow = false;
      $('body').css('overflow', '');
    },
  },
};
</script>

<style lang="scss">
.dashboard-body {
  @include media-breakpoint-up(xs) {
    padding: 0 15px;
  }
  @include media-breakpoint-up(md) {
    padding: 0 30px;
  }
  .table {
    @include media-breakpoint-up(xs) {
      th {
        padding: 12px 4px;
      }
      td {
        padding: 12px 4px;
      }
      font-size: 14px;
    }
    @include media-breakpoint-up(sm) {
      th {
        padding: 12px 8px;
      }
      td {
        padding: 12px 8px;
      }
    }
    @include media-breakpoint-up(md) {
      th {
        padding: 12px 12px;
      }
      td {
        padding: 18px 12px;
      }
      font-size: 16px;
    }
    th {
      border-bottom: 0;
      white-space: normal;
    }
    td {
      vertical-align: middle;
      word-break: break-word;
    }
    .nowrap {
      @include media-breakpoint-up(xs) {
        width: 76px;
      }
      @include media-breakpoint-up(sm) {
        width: 104px;
      }
      @include media-breakpoint-up(md) {
        width: 112px;
      }
      @include media-breakpoint-up(lg) {
        width: 120px;
      }
    }
    table-layout: fixed;
    min-width: 290px;
  }
  select {
    cursor: pointer;
  }
  .form-group {
    width: 100%;
  }
  .modal-header {
    .close {
      color: $dark;
      opacity: 1;
      transition: $transition-fade;
    }
  }
  .responsive {
    @include media-breakpoint-up(xs) {
      display: none;
    }
    @include media-breakpoint-up(md) {
      display: table-cell;
    }
  }
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
