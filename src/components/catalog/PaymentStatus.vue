<template>
  <div class="row justify-content-center flex-column w-100-pct mt-lg-36 mt-md-20 mt-0">
    <img src="@/assets/images/payment-successful.svg">
    <h1 class="font-weight-bold f-28 f-md-30 mt-20 mt-md-24">付款成功</h1>
    <h2 class="f-16 f-md-20">感謝您的購買！<br>商品將於2-7天內送達</h2>
    <h3 class="f-16 mt-12 mt-md-16">訂單編號</h3>
    <div class="d-flex justify-content-center">
      <div class="order-num-group">
        <input type="text" value="ABCD12345678" class="order-num-input border-0" disabled>
        <button class="order-num-btn btn-square border-0">
          <span class="material-icons">content_copy</span>
        </button>
      </div>
    </div>
    <div class="d-flex justify-content-center mb-lg-90 mb-md-60 mb-45">
      <router-link class="btn btn-primary" to="/product">繼續選購</router-link>
    </div>
  </div>
</template>

<style lang="scss">
.order-num-group {
  align-items: center;
  border: 1px solid $secondary;
  display: flex;
  height: 44px;
  margin-bottom: 32px;
  padding: 0 23px;
}
.order-num-input {
  background-color: #fff;
  height: 42px;
  width: 140px;
}
.order-num-btn {
  &:hover {
    color: $primary;
  }
  background-color: #fff;
  color: $secondary;
  transition: $transition-base;
}
</style>
