<template>
  <div class="counter">
    <button class="counter-btn btn-square btn-outline-secondary">
      <span class="material-icons fz-4 counter-btn-icon">add</span>
    </button>
    <p class="counter-quantity">
      <span class="mr-4">0</span>個
    </p>
    <button class="counter-btn btn-square btn-outline-secondary">
      <span class="material-icons fz-4 counter-btn-icon">remove</span>
    </button>
  </div>
</template>

<style lang="scss">
.counter {
  @include media-breakpoint-up(xs) {
    font-size: 16px;
    order: 0;
  }
  @include media-breakpoint-up(sm) {
    .counter-quantity {
      width: 60px;
    }
  }
  @include media-breakpoint-up(md) {
    order: 0;
  }
  .counter-quantity {
    align-items: center;
    display: flex;
    font-weight: bold;
    justify-content: center;
    overflow: hidden;
    padding: 0 6px 0 6px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  display: flex;
}
</style>
