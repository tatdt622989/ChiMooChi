<template>
  <div class="dashboard-products w-100">
    <table class="table mt-24">
      <thead>
        <tr>
          <th class="responsive">類別</th>
          <th>名稱</th>
          <th class="responsive">原價</th>
          <th>售價</th>
          <th class="nowrap">啟用狀態</th>
          <th class="nowrap">詳情編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for=" item in products" :key="item.id">
          <td class="responsive">{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="responsive">{{ item.origin_price | currency}}</td>
          <td class="font-weight-bold text-danger">{{ item.price | currency }}</td>
          <td
            class="font-weight-bold"
            :class="[item.is_enabled ? 'text-primary' : 'text-light']"
          >{{ item.is_enabled ? '啟用中' : '未啟用' }}
          </td>
          <td>
            <button class="btn-square btn-outline-secondary" @click="openEditModal(item)">
              <span class="material-icons">edit</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="dashboard-poducts-modal modal fade"
      id="dashboardProductsModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="dashboardProductsModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="dashboardProductsModalLabel">
              {{ isNewModal?'商品建立':'商品編輯' }}
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="col-12 col-md-6 pl-0 pr-0 pr-md-12 d-flex flex-column
            justify-content-between">
              <div class="img-frame">
                <img :src="tempProduct.imageUrl">
              </div>
              <div>
                <p class="mb-12 w-100 mt-16 mt-md-0">圖片來源</p>
                <div>
                  <button
                  class="btn btn-outline-secondary mr-16"
                  @click="imgLoadMethod = 'upload';"
                  :class='{active : imgLoadMethod === "upload"}'>上傳
                  </button>
                  <button
                    class="btn btn-outline-secondary"
                    @click="imgLoadMethod='URL'"
                    :class='{active : imgLoadMethod === "URL"}'
                  >網址</button>
                </div>
                <div class="custom-file mt-16" v-if="imgLoadMethod === 'upload'">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="customFile"
                    ref="files"
                    @change="uploadImg"
                  >
                  <label
                    class="custom-file-label text-overflow"
                    for="customFile"
                  >{{ tempProduct.image || '未選擇圖片檔案' }}</label>
                </div>
                <div class="URL-input-group mt-12" v-if="imgLoadMethod === 'URL'">
                  <input class="form-control w-100" type="text"
                  placeholder="請輸入圖片網址" v-model="tempProduct.imageUrl">
                  <button class="check-btn btn btn-secondary flex-shrink-0">確認</button>
                </div>
              </div>
              <div>
                <p class="mb-12 w-100 mt-16 mt-md-0">啟用狀態</p>
                <div class="switch-group">
                  <input
                    class="switch-checkbox"
                    type="checkbox"
                    id="productSwitch"
                    v-model="tempProduct.is_enabled"
                  />
                  <label class="switch-label" for="productSwitch"></label>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 pr-0 pl-0 pl-md-12 pt-20 pt-md-0">
              <div class="form-group">
                <label for="name">名稱</label>
                <input class="form-control w-100" type="text" id="name" v-model="tempProduct.title">
              </div>
              <div class="modal-input-sm w-50 pr-8">
                <div class="form-group">
                  <label for="category">類別</label>
                  <input class="form-control" type="text" id="category"
                    v-model="tempProduct.category">
                </div>
                <div class="form-group">
                  <label for="originPrice">原價</label>
                  <input class="form-control" type="text" id="originPrice"
                    v-model="tempProduct.origin_price">
                </div>
              </div>
              <div class="modal-input-sm w-50 pl-8">
                <div class="form-group">
                  <label for="product" id="unit">單位</label>
                  <input class="form-control" type="text" id="unit" v-model="tempProduct.unit">
                </div>
                <div class="form-group">
                  <label for="price">售價</label>
                  <input class="form-control" type="text" id="price" v-model="tempProduct.price">
                </div>
              </div>
              <div class="form-group">
                <label class="mt-8" for="description">描述</label>
                <textarea class="form-control" id="description" cols="30" rows="10"
                  v-model="tempProduct.description"></textarea>
              </div>
              <div class="form-group">
                <label class="mt-8" for="note">備註</label>
                <textarea class="form-control" id="note" cols="30" rows="10"
                  v-model="tempProduct.content"></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn my-0 mr-16"
              :class="[isNewModal? 'btn-dark': 'btn-danger']"
              data-dismiss="modal"
            >{{ isNewModal?'取消':'刪除' }}</button>
            <button type="button" class="btn btn-primary m-0" @click="updateProducts">
              {{ isNewModal?'建立':'修改' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <Toast />
  </div>
</template>

<script>
import $ from 'jquery';
import Toast from '@/components/Toast.vue';

export default {
  name: 'Products',
  components: {
    Toast,
  },
  // 從Header傳過來的資料，用來判斷開啟的modal是否為建立內容的狀態
  props: ['isNewModal'],
  data() {
    return {
      products: [],
      tempProduct: {},
      imgLoadMethod: 'upload',
    };
  },
  methods: {
    getProducts(page = 1, loadMethod) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=:${page}`;
      const loader = vm.$loading.show({}, {
        default: this.$createElement('LogoLoadingAnimation'),
      });
      this.$http.get(api).then((response) => {
        vm.products = response.data.products;
        loader.hide();
        if (loadMethod === 'update') {
          vm.$bus.$emit('message:push', '成功', '資料載入成功', 'success');
        }
      });
    },
    // 使用編輯商品的方式開啟modal
    openEditModal(item) {
      const vm = this;
      vm.$emit('update:isNewModal', false);
      // 複製不傳參考的物件
      vm.tempProduct = { ...item };
      $('#dashboardProductsModal').modal('show');
    },
    updateProducts() {
      const vm = this;
      const loader = vm.$loading.show({}, {
        default: this.$createElement('LogoLoadingAnimation'),
      });
      let api;
      let httpMethod;
      let msg;
      if (vm.isNewModal) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
        httpMethod = 'post';
        msg = '建立';
      } else {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'put';
        msg = '修改';
      }
      vm.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        loader.hide();
        if (response.data.success) {
          vm.$bus.$emit('message:push', '成功', `資料${msg}成功`, 'success');
        } else {
          vm.$bus.$emit('message:push', '失敗', response.data.message, 'danger');
        }
        $('#dashboardProductsModal').modal('hide');
        vm.getProducts(1, 'update');
      });
    },
    uploadImg() {
      const vm = this;
      const uploadImg = vm.$refs.files.files[0];
      const formData = new FormData();
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      formData.append('file-to-upload', uploadImg);
      vm.tempProduct.image = uploadImg.name;
      vm.$http.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        if (response.data.success) {
          /*
          因為imageUrl這個屬性未事先定義，
          所以綁定v-model的表單必須要填入內容之後才會建立屬性和值並且雙向綁定，
          而這裡並沒有通過v-modal建立屬性並賦值，
          所以需要使用$set將imageUrl雙向綁定
          */
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
        }
      });
    },
  },
  watch: {
    isNewModal() {
      const vm = this;
      if (vm.isNewModal) {
        // 如果使用建立新商品的方式開啟modal，則清空modal內容
        vm.tempProduct = {};
      }
    },
  },
  created() {
    const vm = this;
    vm.getProducts();
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
    img {
      width: 100%;
    }
    @include media-breakpoint-up(xs) {
      width: 100%;
      height: 180px;
    }
    @include media-breakpoint-up(sm) {
      height: 269px;
      width: 478px;
    }
    @include media-breakpoint-up(md) {
      width: 322px;
      height: 182px;
    }
    background-color: $img-link-bg-color;
    overflow: hidden;
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
  padding: 16px;
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
.custom-file-label {
  padding-right: 57px;
}
</style>
