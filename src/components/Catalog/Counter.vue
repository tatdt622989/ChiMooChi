<template>
  <div class="counter">
    <button
      class="counter-btn btn-square btn-outline-secondary"
      @click="$emit('update:qty', parseInt($refs.qty.value, 10) - 1)"
      :disabled="qty > 1 ? false : true"
    >
      <span class="material-icons fz-4 counter-btn-icon">remove</span>
    </button>
    <div class="counter-quantity">
      <input
        class=" w-100 border-0 p-0 text-secondary text-center"
        type="text"
        ref="qty"
        @input="$emit('update:qty', $refs.qty.value)"
        :value="qty"
      ><span class="unit">{{ unit }}</span>
    </div>
    <button
      class="counter-btn btn-square btn-outline-secondary"
      @click="$emit('update:qty', parseInt($refs.qty.value, 10) + 1) "
    >
      <span class="material-icons fz-4 counter-btn-icon">add</span>
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
    font-size: 16px;
    order: 0;
  }
  @include media-breakpoint-up(md) {
    order: 0;
  }
  .unit {
    @include media-breakpoint-up(xs) {
      display: none;
    }
    @include media-breakpoint-up(sm) {
      display: block;
    }
  }
  display: flex;
}
.counter-quantity {
  @include media-breakpoint-up(xs) {
    padding: 0 4px;
    width: 40px;
  }
  @include media-breakpoint-up(sm) {
    padding: 0 12px;
    width: 60px;
  }
    align-items: center;
    display: flex;
    justify-content: center;
    overflow: hidden;
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
      background-color: $gray-300;
    }
    background-color: $gray-300;
  }
}
</style>
