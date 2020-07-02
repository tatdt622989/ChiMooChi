<template>
  <div class="row w-100-pct">
    <div class="col-8 d-flex flex-wrap justify-content-center offset-2 order-form-wrap">
      <h1 class="f-lg-30 f-24 mt-16 mb-24 w-100-pct">訂單資料</h1>
      <button
        class="order-form-cart-list-btn btn btn-outline-secondary
        d-flex justify-content-center f-16 mb-16"
      >
        購物車清單
        <span class="material-icons">arrow_drop_down</span>
      </button>
      <div class="order-form-cart-list">
        <div class="order-form-cart-item d-flex flex-wrap justify-content-between w-100-pct">
          <p class="order-cart-item-title pl-16 text-overflow">尊爵日式雙人沙發沙發沙發沙發沙發</p>
          <p class="order-cart-item-quantity">
            <span>99</span>/個
          </p>
          <p class>小計</p>
          <p class="order-cart-item-price pr-16">$99999999</p>
          <hr class="w-100-pct" />
        </div>
        <div class="order-form-total pr-16">
          <p class="w-50-pct text-left mb-16">宅配-運費</p>
          <p class="w-50-pct mb-16">$60</p>
          <p class="w-50-pct text-left mb-16">優惠券折抵</p>
          <p class="w-50-pct mb-16">-$60</p>
          <p class="w-50-pct text-left mb-45">合計</p>
          <p class="w-50-pct mb-32 text-danger font-weight-bold">$2000</p>
        </div>
      </div>
      <form class="order-form">
        <div class="form-group">
          <label for="user-name">姓名</label>
          <input type="text" id="user-name" placeholder="請輸入姓名" autocomplete="name"/>
        </div>
        <div class="form-group">
          <label for="address">地址</label>
          <div class="dropdown">
            <button
              class="btn btn-outline-secondary dropdown-toggle px-8 px-sm-32"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >請選擇城市</button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
              <button class="dropdown-item" type="button">高到低</button>
              <button class="dropdown-item" type="button">低到高</button>
            </div>
          </div>
          <div class="dropdown">
            <button
              class="btn btn-outline-secondary dropdown-toggle px-8 px-sm-32"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >請選擇地區</button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
              <button class="dropdown-item" type="button">高到低</button>
              <button class="dropdown-item" type="button">低到高</button>
            </div>
          </div>
          <input type="text" id="address" placeholder="請輸入地址" autocomplete="street-address"/>
        </div>
        <div class="form-group">
          <label for="cellphone">手機</label>
          <input type="text" id="cellphone" placeholder="請輸入手機號碼" autocomplete="tel"/>
        </div>
        <div class="form-group">
          <label for="telephone">市話</label>
          <input type="text" id="telephone" placeholder="請輸入市話號碼" autocomplete="tel-local"/>
        </div>
        <div class="form-group">
          <label for="telephone">電子信箱</label>
          <input type="email" id="telephone" placeholder="請輸入電子信箱" autocomplete="email"/>
        </div>
        <div class="form-group">
          <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
.order-form-wrap {
  background-color: $gray-300;
}
.order-form-cart-list-btn {
  padding-right: 20px;
}
.order-form-cart-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  width: 100%;
}
.order-cart-item-title {
  text-align: left;
  width: 220px;
}
.order-cart-item-quantity {
  width: 48px;
}
.order-cart-item-price {
  display: flex;
  flex-wrap: wrap;
  text-align: right;
  width: 100px;
}
.order-form-total {
  @include media-breakpoint-up(lg) {
    width: 196px;
  }
  @include media-breakpoint-up(xl) {
    width: 236px;
  }
  display: flex;
  flex-wrap: wrap;
  text-align: right;
}
.order-form {
  display: flex;
  flex-wrap: wrap;
}
</style>
