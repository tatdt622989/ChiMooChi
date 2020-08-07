<template>
  <div class="toast-list">
    <div class="toast" :class="obj.mode" role="alert" aria-live="assertive" aria-atomic="true"
    v-for="(obj, index) in messages" :key="index">
      <div class="toast-header pb-0">
        <strong class="mr-auto">{{ obj.title }}</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"
        @click="removeToast(index)">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">{{ obj.message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'toast',
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    pushToast(title, message, mode) {
      const vm = this;
      const timestamp = Math.floor(new Date() / 1000);
      vm.messages.push({
        title,
        message,
        mode,
        timestamp,
      });
      vm.removeToastWithTiming(timestamp);
    },
    removeToast(index) {
      const vm = this;
      vm.messages.splice(index, 1);
    },
    removeToastWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((obj, index) => {
          if (obj.timestamp === timestamp) {
            vm.messages.splice(index, 1);
          }
        });
      }, 3000);
    },
  },
  created() {
    console.log('建立');
    const vm = this;
    vm.$bus.$on('message:push', (title, message, mode) => {
      vm.pushToast(title, message, mode);
    });
  },
};
</script>

<style lang="scss">
.toast-list {
  @include media-breakpoint-up(xs) {
    top: 54px;
  }
  @include media-breakpoint-up(md) {
    top: 60px;
  }
  @include media-breakpoint-up(lg) {
    top: 72px;
  }
  .toast {
  &.success {
    background-color: $success;
    color: $white;
  }
  &.danger {
    background-color: $danger;
    color: $white;
  }
  &.warning {
    background-color: $warning;
    color: black;
  }
  .toast-header {
      color: inherit;
  }
  opacity: 1;
  }
  position: fixed;
  right: 16px;
  z-index: $zindex-toast;
}
</style>
