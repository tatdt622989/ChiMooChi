<template>
  <div class="dashboard-products w-100">
    <div class="align-items-center d-flex justify-content-between">
      <h1 class="f-lg-30 f-24 my-24 text-left">商品管理</h1>
      <div class="align-items-center d-flex">
        <form class="search-form form-inline">
          <button class="search-btn">
            <span class="material-icons lh-1">search</span>
          </button>
          <input class="search-input" type="search" placeholder="搜尋" />
        </form>
        <button class="btn btn-primary order-2" data-toggle="modal"
        data-target="#dashboardProductsModal">建立商品</button>
      </div>
    </div>
    <table class="table mt-24">
      <thead class="thead-light">
        <tr>
          <th>類別</th>
          <th>產品名稱</th>
          <th>原價</th>
          <th>售價</th>
          <th>啟用狀態</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>經典設計</td>
          <td>折疊式雙人復古沙發</td>
          <td>2000</td>
          <td class="font-weight-bold text-danger">1799</td>
          <td class="font-weight-bold text-primary">啟用中</td>
          <td>
            <button class="btn-square btn-outline-secondary">
              <span class="material-icons">edit</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="dashboard-poducts-modal modal fade" id="dashboardProductsModal"
    tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">商品建立</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="modal-col">
              <div class="img-frame"></div>
              <p class="w-100">圖片來源</p>
              <button class="btn btn-outline-secondary active">上傳</button>
              <button class="btn btn-outline-secondary">網址</button>
              <input class="w-100" type="file" name="" id="">
              <input class="w-100" type="text">
              <p class="w-100">啟用狀態</p>
              <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="customSwitch1">
                <label class="custom-control-label" for="customSwitch1"></label>
              </div>
            </div>
            <div class="modal-col">
              <label for="name">名稱</label>
              <input class="w-100" type="text" id="name">
              <label for="category">類別</label>
              <label for="product" id="unit">單位</label>
              <input type="text" id="category">
              <input type="text" id="unit">
              <label for="origin-price">原價</label>
              <label for="price">售價</label>
              <input type="text" id="origin-price">
              <input type="text" id="prdice">
              <label for="description">描述</label>
              <textarea name="" id="description" cols="30" rows="10"></textarea>
              <label for="note">備註</label>
              <textarea name="" id="note" cols="30" rows="10"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
};
</script>

<style lang="scss">
  .dashboard-products {
    .search-form {
      border: 0;
      height: 44px;
      margin-bottom: 0;
      margin-right: 24px;
      padding: 0;
    }
    .search-input {
      height: 44px;
      width: 180px;
    }
    .search-btn {
      height: 42px;
      padding: 0 10px;
    }
    .list-title {
      display: flex;
      justify-content: space-between;
      list-style: none;
    }
    .table {
      th {
        border-bottom: 0;
        padding: 12px 24px;
      }
      td {
        padding: 24px;
        vertical-align: middle;
      }
    }
    display: flex;
    flex-direction: column;
    padding: 0 30px;
  }
  .dashboard-poducts-modal {
    .modal-body {
      display: flex;
    }
    .modal-dialog {
      max-width: 700px;
    }
    .modal-col {
      input {
        width: 50%;
      }
      label {
        width: 50%;
      }
      &:nth-of-type(1) {
        padding-right: 10px;
      }
      &:nth-of-type(2) {
        padding-left: 10px;
      }
      align-content: flex-start;
      display: flex;
      flex-wrap: wrap;
      text-align: left;
      width: 100%;
    }
    .img-frame {
      background-color: $img-link-bg-color;
      height: 180px;
      width: 320px;
    }
  }
</style>
