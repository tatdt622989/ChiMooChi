<template>
  <div class="dashboard-products w-100">
    <table class="table mt-24">
      <thead class="thead-light">
        <tr>
          <th class="responsive">類別</th>
          <th>產品名稱</th>
          <th class="responsive">原價</th>
          <th>售價</th>
          <th>啟用狀態</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="responsive">經典設計</td>
          <td>折疊式雙人復古沙發</td>
          <td class="responsive">2000</td>
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
            <div class="col-12 col-md-6 pl-0">
              <div class="img-frame"></div>
              <p class="mb-12 mt-20 w-100">圖片來源</p>
              <button class="btn btn-outline-secondary mr-20"
              @click="method = 'upload';" :class='{active : method === "upload"}'>上傳</button>
              <button class="btn btn-outline-secondary"
              @click="method = 'URL'" :class='{active : method === "URL"}'>網址</button>
              <div class="custom-file mt-12" v-if="method === 'upload'">
                <input type="file" class="custom-file-input" id="customFile">
                <label class="custom-file-label" for="customFile">未選擇圖片</label>
              </div>
              <div class="URL-input-group mt-12" v-if="method === 'URL'">
                <input class="form-control w-100" type="text"
                placeholder="請輸入圖片網址">
                <button class="check-btn btn btn-secondary flex-shrink-0">確認</button>
              </div>
              <p class="mb-12 mt-20 w-100">啟用狀態</p>
              <div class="switch-group">
                <input class="switch-checkbox" type="checkbox" id="productSwitch">
                <label class="switch-label" for="productSwitch"></label>
              </div>
            </div>
            <div class="col-12 col-md-6 pr-0 pt-20 pt-md-0">
              <label for="name">名稱</label>
              <input class="form-control w-100" type="text" id="name">
              <div class="modal-input-sm w-50">
                <label for="category">類別</label>
                <input class="form-control" type="text" id="category">
                <label for="originPrice">原價</label>
                <input class="form-control" type="text" id="originPrice">
              </div>
              <div class="modal-input-sm w-50">
                <label for="product" id="unit">單位</label>
                <input class="form-control" type="text" id="unit">
                <label for="price">售價</label>
                <input class="form-control" type="text" id="price">
              </div>
              <label class="mt-8" for="description">描述</label>
              <textarea class="form-control" id="description" cols="30" rows="10"></textarea>
              <label class="mt-8" for="note">備註</label>
              <textarea class="form-control" id="note" cols="30" rows="10"></textarea>
            </div>
          </div>
          <div class="modal-footer p-20">
            <button type="button" class="btn btn-dark my-0 mr-20"
            data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary m-0">建立</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data() {
    return {
      isClick: false,
      method: 'upload',
    };
  },
  methods: {
  },
};
</script>

<style lang="scss">
.dashboard-products {
  .list-title {
    display: flex;
    justify-content: space-between;
    list-style: none;
  }
  .table {
    @include media-breakpoint-up(xs) {
      th {
        padding: 12px 6px;
      }
      td {
        padding: 12px 6px;
      }
      font-size: 14px;
    }
    @include media-breakpoint-up(md) {
      th {
        padding: 12px 24px;
      }
      td {
        padding: 24px;
      }
      font-size: 16px;
    }
    th {
      border-bottom: 0;
      white-space: normal;
    }
    td {
      vertical-align: middle;
      white-space: normal;
    }
    table-layout: fixed;
    min-width: 320px;
  }
}
.dashboard-poducts-modal {
  .modal-body {
    display: flex;
    flex-wrap: wrap;
  }
  .modal-dialog {
    @include media-breakpoint-up(xs) {
      width: auto;
    }
    @include media-breakpoint-up(sm) {
      max-width: 510px;
    }
    @include media-breakpoint-up(md) {
      max-width: 700px;
    }
  }
  .col-12.col-md-6 {
    .modal-input-sm {
      &:nth-of-type(1) {
        padding-right: 10px;
      }
      &:nth-of-type(2) {
        padding-left: 10px;
      }
      label {
        margin-top: 8px;
      }
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      width: 50%;
    }
    textarea {
      height: 60px;
      width: 100%;
    }
    &:nth-of-type(1) {
      @include media-breakpoint-up(xs) {
        padding-right: 0px;
      }
      @include media-breakpoint-up(md) {
        padding-right: 10px;
      }
    }
    &:nth-of-type(2) {
      @include media-breakpoint-up(xs) {
        padding-left: 0px;
      }
      @include media-breakpoint-up(md) {
        padding-left: 10px;
      }
    }
    .custom-file-input {
      cursor: pointer;
    }
    align-content: flex-start;
    display: flex;
    flex-wrap: wrap;
    text-align: left;
    width: 100%;
  }
  .img-frame {
    @include media-breakpoint-up(xs) {
      width: 100%;
      height: 180px;
    }
    @include media-breakpoint-up(sm) {
      height: 264px;
      width: 470px;
    }
    @include media-breakpoint-up(md) {
      width: 320px;
      height: 180px;
    }
    background-color: $img-link-bg-color;
  }
}
.modal-footer {
  @include media-breakpoint-up(xs) {
    justify-content: space-between;
  }
  @include media-breakpoint-up(md) {
    justify-content: flex-end;
  }
  display: flex;
}
.URL-input-group {
  .check-btn {
    padding: 9px 11px 9px 12px;
  }
  display: flex;
  align-items: center;
  width: 100%;
}
.sidebar-toggler {
  @include media-breakpoint-up(xs) {
    display: block;
  }
  @include media-breakpoint-up(lg) {
    display: none;
  }
}
.responsive {
  @include media-breakpoint-up(xs) {
    display: none;
  }
  @include media-breakpoint-up(md) {
    display: table-cell;
  }
}
</style>
