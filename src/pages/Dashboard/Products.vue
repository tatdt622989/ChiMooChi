<template>
  <div class="dashboard-products w-100">
    <table class="table">
      <thead>
        <tr>
          <th class="responsive">
            <button
              class="btn font-weight-bold p-0"
              @click="productsFilter('category')"
            >
              類別
              <span
                class="material-icons"
                :class="{ active : sortAttr === 'category',
                reverse : isReverse }"
              >keyboard_arrow_down</span>
            </button>
          </th>
          <th>
            <button
              class="btn p-0 font-weight-bold"
              @click="productsFilter('title')"
            >
              名稱
              <span
                class="material-icons"
                :class="{ active : sortAttr === 'title',
                reverse : isReverse }"
              >keyboard_arrow_down</span>
            </button>
          </th>
          <th class="responsive">
            <button
              class="btn font-weight-bold p-0"
              @click="productsFilter('origin_price')"
            >
              原價
              <span
                class="material-icons"
                :class="{ active : sortAttr === 'origin_price',
                reverse : isReverse }"
              >keyboard_arrow_down</span>
            </button>
          </th>
          <th class="pl-12">
            <button
              class="btn p-0 font-weight-bold"
              @click="productsFilter('price')"
            >
              售價
              <span
                class="material-icons"
                :class="{ active : sortAttr === 'price',
                reverse : isReverse }"
              >keyboard_arrow_down</span>
            </button>
          </th>
          <th class="nowrap">
            <button
              class="btn p-0 font-weight-bold"
              @click="productsFilter('is_enabled')"
            >
              啟用狀態
              <span
                class="material-icons"
                :class="{ active : sortAttr === 'is_enabled',
                reverse : isReverse}"
              >keyboard_arrow_down</span>
            </button>
          </th>
          <th class="nowrap text-right info-edit"><p>詳情編輯</p></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for=" item in paginatedProducts" :key="item.id">
          <td class="responsive">{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="responsive">{{ item.origin_price | currency}}</td>
          <td class="font-weight-bold text-danger pl-12">{{ item.price | currency }}</td>
          <td
            class="font-weight-bold nowrap status"
            :class="[item.is_enabled ? 'text-primary' : 'text-light']"
          >{{ item.is_enabled ? '啟用中' : '未啟用' }}
          </td>
          <td class="text-right nowrap info-edit">
            <button class="btn-square btn-outline-secondary" @click="openEditModal(item)">
              <span class="material-icons">edit</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :pagination="pagination"
      @change-page="changePage"
    />
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
            <ValidationObserver
              ref="form"
              tag="form"
              @submit.prevent="updateProducts(isNewModal ? '建立' : '修改')"
            >
              <div class="modal-body">
                <div class="col-12 col-md-6 pl-0 pr-0 pr-md-12 d-flex flex-column
                justify-content-between">
                  <div class="img-frame">
                    <img :src="tempProduct.imageUrl">
                  </div>
                  <div>
                    <div class="d-flex align-items-center mb-12 mt-16 mt-md-0">
                      <p class="mr-8">圖片來源</p>
                      <div class="spinner-border" :class="{ 'show' : isLoading }" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>
                    <div>
                      <button
                      class="btn btn-outline-secondary mr-16"
                      type="button"
                      @click="imgLoadMethod = 'upload';"
                      :class='{active : imgLoadMethod === "upload"}'>上傳
                      </button>
                      <button
                        class="btn btn-outline-secondary"
                        type="button"
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
                    <div class="URL-input-group mt-16" v-if="imgLoadMethod === 'URL'">
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
                  <ValidationProvider
                    class="form-group"
                    tag="div"
                    rules="required"
                    v-slot="{ errors, failed }"
                  >
                    <label for="name">名稱</label>
                    <input
                      class="form-control w-100"
                      :class="{ 'is-invalid' : failed }"
                      type="text"
                      id="name"
                      v-model="tempProduct.title"
                    >
                    <div class="invalid-feedback">{{ errors[0] }}</div>
                  </ValidationProvider>
                  <div class="modal-forms-group">
                    <ValidationProvider
                      class="form-group mr-8"
                      tag="div"
                      rules="required"
                      v-slot="{ errors, failed }"
                    >
                      <label for="category">類別</label>
                      <select
                      class="form-control"
                      :class="{ 'is-invalid' : failed }"
                      v-model="tempProduct.category"
                      >
                        <option value="" disabled></option>
                        <option
                          v-for="item in category"
                          :key="item"
                          :value="item"
                        >{{ item }}</option>
                      </select>
                      <div class="invalid-feedback">{{ errors[0] }}</div>
                    </ValidationProvider>
                    <ValidationProvider
                      class="form-group ml-8"
                      tag="div"
                      rules="required"
                      v-slot="{ errors, failed }"
                    >
                      <label for="product" id="unit">單位</label>
                      <input
                        class="form-control"
                        type="text"
                        id="unit"
                        v-model="tempProduct.unit"
                        :class="{ 'is-invalid' : failed }"
                      >
                      <div class="invalid-feedback">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                  <div class="modal-forms-group">
                    <ValidationProvider
                      class="form-group mr-8"
                      tag="div"
                      rules="numeric"
                      v-slot="{ errors, failed }"
                    >
                      <label for="originPrice">原價</label>
                      <input
                        class="form-control"
                        type="text"
                        id="originPrice"
                        v-model="tempProduct.origin_price"
                        :class="{ 'is-invalid' : failed }"
                      >
                      <div class="invalid-feedback">{{ errors[0] }}</div>
                    </ValidationProvider>
                    <ValidationProvider
                      class="form-group ml-8"
                      tag="div"
                      rules="required|numeric"
                      v-slot="{ errors, failed }"
                    >
                      <label for="price">售價</label>
                      <input
                        class="form-control"
                        type="text"
                        id="price"
                        v-model="tempProduct.price"
                        :class="{ 'is-invalid' : failed }"
                      >
                      <div class="invalid-feedback">{{ errors[0] }}</div>
                    </ValidationProvider>
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
                  @click="openDeleteModal"
                >{{ isNewModal ? '取消' : '刪除' }}</button>
                <button
                  type="submit"
                  class="btn btn-tertiary m-0"
                >
                  {{ isNewModal ? '建立' : '修改' }}
                </button>
                <Delete
                  :isOpenDeleteModal.sync="isOpenDeleteModal"
                  @delete-data="updateProducts('刪除')"
                >商品</Delete>
              </div>
            </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Delete from '@/components/Delete.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Products',
  components: {
    Delete,
    Pagination,
  },
  props: ['isNewModal', 'search'],
  data() {
    return {
      allProducts: [],
      tempProduct: {
        category: '',
        is_enabled: false,
      },
      paginatedProducts: [],
      pagination: {},
      searchProducts: [],
      imgLoadMethod: 'upload',
      sortAttr: '',
      isLoading: false,
      isOpenDeleteModal: false,
      isReverse: false,
      category: ['特色推薦', '經典設計', '木椅', '塑膠椅', '金屬椅', '沙發'],
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products/all`;
      const loader = vm.$loading.show({}, {
        default: vm.$createElement('LogoLoadingAnimation'),
      });
      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.allProducts = Object.values(response.data.products).map((item) => item);
        } else {
          vm.$bus.$emit('message:push', '錯誤', response.data.message, 'danger');
        }
        loader.hide();
        vm.sortAttr = '';
        vm.productsFilter();
      });
    },
    openEditModal(item) {
      const vm = this;
      vm.$emit('update:isNewModal', false);
      vm.tempProduct = { ...item };
      $('#dashboardProductsModal').modal('show');
    },
    updateProducts(prdouctHandlingMethod) {
      const vm = this;
      let api;
      let httpMethod;
      if (!vm.tempProduct.origin_price) { vm.tempProduct.origin_price = vm.tempProduct.price; }
      if (prdouctHandlingMethod === '建立') {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
        httpMethod = 'post';
      } else if (prdouctHandlingMethod === '修改') {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'put';
      } else if (prdouctHandlingMethod === '刪除') {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'delete';
        vm.isOpenDeleteModal = false;
        vm.updateProductsMethods(httpMethod, api, prdouctHandlingMethod);
        return;
      }
      vm.$refs.form.validate().then((success) => {
        if (success) {
          vm.$refs.form.reset();
          vm.updateProductsMethods(httpMethod, api, prdouctHandlingMethod);
        }
      });
    },
    updateProductsMethods(httpMethod, api, msg) {
      const vm = this;
      const loader = vm.$loading.show({}, {
        default: this.$createElement('LogoLoadingAnimation'),
      });
      vm.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        loader.hide();
        if (response.data.success) {
          vm.$bus.$emit('message:push', '成功', `資料${msg}成功`, 'success');
        } else {
          vm.$bus.$emit('message:push', '失敗', response.data.message, 'danger');
        }
        $('#dashboardProductsModal').modal('hide');
        vm.getProducts();
      });
    },
    uploadImg() {
      const vm = this;
      const uploadImg = vm.$refs.files.files[0];
      const formData = new FormData();
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      formData.append('file-to-upload', uploadImg);
      vm.tempProduct.image = uploadImg.name;
      vm.isLoading = true;
      vm.$http.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        if (response.data.success) {
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
          vm.$bus.$emit('message:push', '成功', '圖片上傳成功', 'success');
        } else if (typeof response.data.message !== 'string') {
          vm.tempProduct.image = '';
          vm.$bus.$emit('message:push', '失敗', '檔案過大，需小於1MB', 'danger');
        } else {
          vm.tempProduct.image = '';
          vm.$bus.$emit('message:push', '失敗', response.data.message, 'danger');
        }
        vm.isLoading = false;
      });
    },
    openDeleteModal() {
      const vm = this;
      if (vm.isNewModal) {
        $('#dashboardProductsModal').modal('hide');
      } else {
        vm.isOpenDeleteModal = true;
      }
    },
    productsFilter(sortAttr = 'title', trigger = 'table-header') {
      const vm = this;
      const target = vm.search ? vm.searchProducts : vm.allProducts;
      vm.sortProducts(sortAttr, trigger, target);
      vm.getPagination(target);
      vm.paginateProducts(target);
    },
    sortProducts(attr = 'title', trigger = 'table-header', target) {
      const vm = this;
      if (vm.sortAttr === attr && trigger === 'table-header') {
        vm.isReverse = !vm.isReverse;
      } else {
        vm.isReverse = false;
      }
      target.sort((a, b) => {
        if (attr === 'origin_price' || attr === 'price') {
          return vm.isReverse ? a[attr] - b[attr] : b[attr] - a[attr];
        }
        if (attr === 'is_enabled') {
          return vm.isReverse ? +a[attr] - +b[attr] : +b[attr] - +a[attr];
        }
        return vm.isReverse ? b[attr].localeCompare(a[attr], 'zh-hant') : a[attr].localeCompare(b[attr], 'zh-hant');
      });
      vm.sortAttr = attr;
    },
    getPagination(array) {
      const vm = this;
      const target = array;
      const targetLen = target.length;
      vm.$set(vm.pagination, 'current_page', 1);
      if (targetLen % 10 !== 0) {
        vm.$set(vm.pagination, 'total_pages', Math.floor(targetLen / 10) + 1);
      } else {
        vm.$set(vm.pagination, 'total_pages', Math.floor(targetLen / 10));
      }
      vm.$set(vm.pagination, 'has_pre', false);
      if (vm.pagination.total_pages > 1) {
        vm.$set(vm.pagination, 'has_next', true);
      } else {
        vm.$set(vm.pagination, 'has_next', false);
      }
    },
    updatePagination(page) {
      const vm = this;
      vm.pagination.current_page = page;
      if (page === 1) {
        vm.$set(vm.pagination, 'has_pre', false);
      } else {
        vm.$set(vm.pagination, 'has_pre', true);
      }
      if (page < vm.pagination.total_pages) {
        vm.$set(vm.pagination, 'has_next', true);
      } else {
        vm.$set(vm.pagination, 'has_next', false);
      }
    },
    paginateProducts(array) {
      const vm = this;
      const target = array;
      const startIndex = (vm.pagination.current_page - 1) * 10;
      const result = target.filter((obj, index) => {
        if (startIndex <= index && startIndex + 9 >= index) {
          return obj;
        }
        return false;
      });
      vm.paginatedProducts = result;
    },
    changePage(page) {
      const vm = this;
      const target = vm.search ? vm.searchProducts : vm.allProducts;
      vm.updatePagination(page);
      vm.paginateProducts(target);
    },
  },
  watch: {
    search() {
      const vm = this;
      if (vm.search) {
        const result = vm.allProducts.filter((obj) => {
          const str = obj.category
          + obj.title
          + obj.origin_price
          + obj.price;
          if (str.indexOf(vm.search) > -1) {
            return obj;
          }
          return false;
        });
        if (result.length) {
          vm.searchProducts = result;
        } else {
          vm.searchProducts = [];
        }
      }
      vm.productsFilter('title', 'search');
    },
  },
  created() {
    this.getProducts();
  },
  mounted() {
    const vm = this;
    $('#dashboardProductsModal').on('hide.bs.modal', () => {
      vm.tempProduct = {};
      vm.isOpenDeleteModal = false;
      vm.$refs.form.reset();
      if (vm.imgLoadMethod === 'upload') {
        vm.$refs.files.value = '';
      }
    });
  },
  destroyed() {
    $('#dashboardProductsModal').off('hide.bs.modal');
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
    .modal-forms-group {
      label {
        margin-top: 8px;
      }
      display: flex;
      flex-wrap: nowrap;
      width: 100%;
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
      object-fit: cover;
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
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  .spinner-border {
    &.show {
      opacity: 1;
    }
    opacity: 0;
    transition: $transition-fade;
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
