<template>
  <transition name="delete-fade">
  <div
    class="delete-alert m-0"
    v-if="isOpenDeleteModal"
  >
    <p class="text-left">確定要刪除此<slot></slot>嗎?<br>(刪除後無法復原)</p>
    <div>
      <button
        type="button"
        class="btn btn-white text-danger mr-8 mr-sm-16"
        @click="$emit('update:isOpenDeleteModal', false);"
      >取消</button>
      <button
        type="button"
        class="btn btn-outline-white"
        @click="$emit('deleteData')"
      >確定刪除</button>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'Delete',
  props: ['isOpenDeleteModal'],
};
</script>

<style lang="scss">
.delete-alert {
  @include media-breakpoint-up(xs) {
    .btn {
      padding: 10px 10px;
    }
    font-size: 14px;
  }
  @include media-breakpoint-up(sm) {
    .btn {
      padding: 10px 32px;
    }
    font-size: 16px;
  }
  .btn-outline-white {
    &:hover {
      color: $danger;
    }
  }
  align-items: center;
  background-color: $danger;
  color: $white;
  display: flex;
  height: 100%;
  justify-content: space-between;
  left: 0;
  padding: 0 16px 0 16px;
  position: absolute;
  transition: $transition-base;
  top: 0;
  width: 100%;
}

.delete-fade-enter-active, .delete-fade-leave-active {
  transition: $transition-base;
}
.delete-fade-enter, .delete-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
