<template>
  <div class="header container-fluid d-flex p-0">
    <Sidebar :is-show="isShow"
    @close-sidebar-request = "closeSidebar"/>
    <div class="dashboard-body">
      <Header
        @open-sidebar-request = "openSidebar"
        :is-new-modal.sync="isNewModal"
        :search.sync="search"
      />
      <router-view
        :isNewModal.sync="isNewModal"
        :search="search"
      />
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
      search: '',
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
        padding: 0;
      }
      td {
        padding: 12px 0px;
      }
      font-size: 14px;
      margin-top: 16px;
    }
    @include media-breakpoint-up(sm) {
      th {
        padding: 0 12px;
      }
      td {
        padding: 12px;
      }
      font-size: 16px;
      margin-top: 20px;
    }
    @include media-breakpoint-up(md) {
      td {
        padding: 16px 12px;
      }
      margin-top: 24px;
    }
    th {
      .btn {
        &:focus {
          box-shadow: none;
        }
        @include media-breakpoint-up(xs) {
          font-size: 14px;
          margin: 10px 0;
        }
        @include media-breakpoint-up(sm) {
          font-size: 16px;
          margin: 12px 0;
        }
        border: 0;
        display: flex;
        align-items: center;
        height: 24px;
        vertical-align: middle;
      }
      p {
        @include media-breakpoint-up(xs) {
          margin: 8px 0;
        }
        line-height: 24px;
      }
      .material-icons {
        &.active {
          opacity: 1;
        }
        &.reverse {
          transform: rotate(180deg);
        }
        opacity: 0;
        transition: $transition-base;
      }
      border-top: none;
      border-bottom: 0;
      vertical-align: middle;
      white-space: normal;
    }
    td {
      vertical-align: middle;
      word-break: break-word;
    }
    .nowrap {
      @include media-breakpoint-up(xs) {
        width: 90px;
      }
      @include media-breakpoint-up(sm) {
        width: 120px;
      }
      @include media-breakpoint-up(md) {
        width: 120px;
      }
      @include media-breakpoint-up(lg) {
        width: 126px;
      }
    }
    .info-edit {
      @include media-breakpoint-up(xs) {
        width: 65px;
      }
      @include media-breakpoint-up(sm) {
        width: 90px;
      }
    }
    .status {
      @include media-breakpoint-up(xs) {
        padding-left: 4px;
      }
      @include media-breakpoint-up(sm) {
        padding-left: 16px;
      }
    }
    table-layout: fixed;
    text-align: left;
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
  .modal-footer {
    position: relative;
  }
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
