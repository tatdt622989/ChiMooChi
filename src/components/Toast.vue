<template>
  <div class="toast-list">
    <div class="toast" :class="obj.status" role="alert" aria-live="assertive" aria-atomic="true"
    v-for="(obj, index) in messages" :key="index">
      <div class="toast-header">
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
    pushToast(title, message, status) {
      const vm = this;
      const timestamp = Math.floor(new Date() / 1000);
      vm.messages.push({
        title,
        message,
        status,
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
      }, 5000);
    },
  },
  created() {
    const vm = this;
    vm.$bus.$on('message:push', (title, message, status) => {
      vm.pushToast(title, message, status);
    });
  },
};
</script>

<style lang="scss">
.toast-list {
  color: $white;
  position: absolute;
  right: 16px;
  top: 16px;
  z-index: $zindex-toast;
}
  .toast {
    &.success {
      background-color: $success;
    }
    opacity: 1;
  }
</style>
