<template>
  <div class="row w-100 mb-lg-90 mb-md-60 mb-45">
    <div class="order-form-wrap col-12 col-md-10 col-lg-8 d-flex flex-wrap justify-content-center
    offset-lg-2 offset-md-1 p-md-24 p-16">
      <h1 class="f-lg-30 f-24 mt-8 mb-32 w-100">訂單資料</h1>
      <button
        class="order-form-cart-list-btn btn btn-outline-secondary
        d-flex justify-content-center f-16 mb-20"
        data-toggle="collapse"
        data-target="#order-form-table"
      >
        購物車清單
        <span class="material-icons">arrow_drop_down</span>
      </button>
      <div class="collapse w-100" id="order-form-table">
        <ShoppingCartListTable />
      </div>
      <form class="order-form">
        <div class="order-form-group form-group">
          <label for="user-name" class="w-100 text-left">姓名</label>
          <input
            type="text"
            class="order-form-input"
            id="user-name"
            placeholder="請輸入姓名"
            autocomplete="name"
          />
        </div>
        <div class="order-form-group form-group">
          <div class="col text-left pl-0 pr-12">
            <label for="county">縣市</label>
            <select class="form-control border-0 px-md-24 px-16" id="county">
              <option selected disabled>請選擇縣市</option>
              <option></option>
            </select>
          </div>
          <div class="col text-left pr-0 pl-12">
            <label for="region">鄉鎮區</label>
            <select class="form-control border-0 px-md-24 px-16" id="region">
              <option selected disabled>請選擇鄉鎮區</option>
              <option></option>
            </select>
          </div>
        </div>
        <div class="order-form-group form-group">
          <label for="address">地址</label>
          <input
            type="text"
            class="order-form-input"
            id="address"
            placeholder="請輸入地址"
            autocomplete="street-address"
          />
        </div>
        <div class="order-form-group form-group">
          <label for="cellphone">手機</label>
          <input
            type="text"
            class="order-form-input"
            id="cellphone"
            placeholder="請輸入手機號碼"
            autocomplete="tel"
          />
        </div>
        <div class="order-form-group form-group">
          <label for="email">電子信箱</label>
          <input
            type="email"
            class="order-form-input"
            id="email"
            placeholder="請輸入電子信箱"
            autocomplete="email"
          />
        </div>
        <div class="order-form-group form-group">
          <label for="notes" class="textarea-form-label">備註</label>
          <textarea class="form-control border-0 form-textarea" id="notes" rows="3"></textarea>
        </div>
      </form>
    </div>
    <div class="col-12 col-md-10 col-lg-8 d-flex offset-lg-2 mt-md-32 mt-24 offset-md-1
    justify-content-between p-0">
      <router-link class="btn btn-dark" to="/shopping-cart">回購物車</router-link>
      <router-link class="btn btn-primary" to="payment">下一步</router-link>
    </div>
  </div>
</template>

<script>
import ShoppingCartListTable from '@/components/Catalog/ShoppingCartListTable.vue';

export default {
  name: 'OrderForm',
  components: {
    ShoppingCartListTable,
  },
};
</script>

<style lang="scss">
.order-form-wrap {
  background-color: $order-form-bg-color;
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
.order-form {
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.order-form-group {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;
  width: 100%;
}
.order-form-input {
  @include media-breakpoint-up(xs) {
    text-indent: 16px;
  }
  @include media-breakpoint-up(md) {
    text-indent: 24px;
  }
  border: 0;
  height: 44px;
  width: 100%;
}
.form-control {
  resize: none;
}
.form-row {
  margin: 0;
}
.form-textarea {
  @include media-breakpoint-up(xs) {
    text-indent: 16px;
  }
  @include media-breakpoint-up(md) {
    text-indent: 24px;
  }
  height: 88px;
  padding: 8px 0;
}
</style>
