<template>
  <div class="counter">
    <button class="counter-btn btn-square btn-outline-secondary">
      <span class="material-icons fz-4 counter-btn-icon">add</span>
    </button>
    <div class="counter-quantity">
      <input class=" w-100 border-0 p-0 text-secondary" type="text" value="0">個
    </div>
    <button class="counter-btn btn-square btn-outline-secondary">
      <span class="material-icons fz-4 counter-btn-icon">remove</span>
    </button>
  </div>
</template>

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
  display: flex;
}
</style>
