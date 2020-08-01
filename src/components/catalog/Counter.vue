<template>
  <div class="counter">
    <button
      class="counter-btn btn-square btn-outline-secondary"
      @click="$emit('update:qty', parseInt($refs.qty.value, 10) + 1) "
    >
      <span class="material-icons fz-4 counter-btn-icon">add</span>
    </button>
    <div class="counter-quantity">
      <input
        class=" w-100 border-0 p-0 text-secondary"
        type="text"
        ref="qty"
        @input="$emit('update:qty', $refs.qty.value)"
        :value="qty"
      ><span>{{ unit }}</span>
    </div>
    <button
      class="counter-btn btn-square btn-outline-secondary"
      @click="$emit('update:qty', parseInt($refs.qty.value, 10) - 1)"
      :disabled="qty > 1 ? false : true"
    >
      <span class="material-icons fz-4 counter-btn-icon">remove</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: ['qty', 'unit'],
};
</script>

<style lang="scss">
.counter {
  @include media-breakpoint-up(xs) {
    .counter-quantity {
      width: 60px;
    }
    font-size: 16px;
    order: 0;
  }
  @include media-breakpoint-up(md) {
    order: 0;
  }
  display: flex;
}
.counter-quantity {
    align-items: center;
    display: flex;
    font-weight: bold;
    justify-content: center;
    overflow: hidden;
    padding: 0 12px 0 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
.counter-btn {
  &.btn-outline-secondary:disabled {
    border-color: $dark;
    color: $dark;
  }
  &[disabled] {
    &:hover {
      background-color: #fff;
    }
    background-color: $gray-300;
  }
}
</style>
