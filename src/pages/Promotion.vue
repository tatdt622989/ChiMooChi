<template>
  <div class="container">
    <div class="row">
      <div class="col-12 d-flex justify-content-center flex-column">
        <img src="@/assets/images/promotion-title.svg" />
        <div class="instruction">
          <p>
            點擊旋轉90度
            <span class="material-icons">refresh</span>
          </p>
          <p>
            拖移交換位置
            <span class="material-icons">swap_horiz</span>
          </p>
        </div>
      </div>
      <div class="col-12">
        <div class="puzzle">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.instruction {
  display: flex;
  justify-content: center;
}
</style>
