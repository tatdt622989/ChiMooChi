<template>
  <div class="container">
    <div class="row">
      <div class="products-header col-12">
        <div class="products-title mt-8 mt-lg-0">
          <h1 class="f-24 f-md-30 mr-12 mr-md-20 mb-0 font-weight-bold">全部商品</h1>
          <h2 class="f-16 mb-0">共29件商品</h2>
        </div>
        <div class="products-filter mt-16 mt-lg-0 mb-24 mb-md-0">
          <Search class="search-form mb-8 mb-md-0"/>
          <select
          class="form-control flex-shrink-0
          mr-8 mr-md-16 mr-lg-20 mb-0"
          v-model="sortMethod.time"
          @change="getProducts(currentCategory, pagination.current_page)"
          required
          >
          <option value="" disabled>時間</option>
          <option value="新到舊">新到舊</option>
          <option value="舊到新">舊到新</option>
          </select>
          <select
            class="price form-control mr-8 mr-md-0"
            v-model="sortMethod.price"
            @change="getProducts(currentCategory, pagination.current_page)"
            required
          >
            <option value="" disabled>價格</option>
            <option value="低到高">低到高</option>
            <option value="高到低">高到低</option>
          </select>
          <select
            class="category form-control"
            v-model="currentCategory"
            @change="getProducts(currentCategory, pagination.current_page)"
            required
          >
            <option>類別</option>
            <option
              v-for="(item, index) in category"
              :key="index"
              :value="item"
            >{{ item }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="product-category">
      <button
        class="product-category-btn btn text-hover-light pl-8"
        v-for="(item, index) in category"
        :key="index"
        :class="{ active : currentCategory === item }"
        @click="getProducts(item, pagination.current_page)"
      >{{ item }}</button>
    </div>
    <div class="row product-list">
      <div
        class="col-lg-3 col-md-4 col-6 d-lg-block mb-30 mb-sm-45"
        v-for="item in renderProducts"
        :key="item.id"
      >
      <Card :item="item"></Card>
      </div>
    </div>
    <Pagination :pagination="pagination" @change-page="changePage"/>
  </div>
</template>

<script>
import Card from '@/components/Catalog/Card.vue';
import Pagination from '@/components/Pagination.vue';
import Search from '@/components/Search.vue';

export default {
  name: 'Product',
  components: {
    Card,
    Pagination,
    Search,
  },
  data() {
    return {
      products: [],
      categorizedProducts: [],
      renderProducts: [],
      pagination: {},
      category: ['全部商品', '特色推薦', '經典設計', '木椅', '塑膠椅', '金屬椅', '沙發/沙發床'],
      currentCategory: '全部商品',
      sortMethod: {
        time: '新到舊',
        price: '',
      },
    };
  },
  methods: {
    getProducts(category = '全部商品', page = 1) {
      console.log(page);
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      const loader = vm.$loading.show({}, {
        default: this.$createElement('LogoLoadingAnimation'),
      });
      console.log(api);
      this.$http.get(api).then((response) => {
        console.log(response.data);
        // 取得所有商品
        vm.products = response.data.products;
        // 將商品分類
        vm.currentCategory = category;
        vm.categorizeProducts(category);
        // 將分類後的商品排序
        vm.sortProducts();
        // 將排序後的商品分頁
        vm.getPagination(page);
        vm.paginateProducts();
        loader.hide();
      });
    },
    categorizeProducts(category) {
      const vm = this;
      console.log(category);
      vm.currentCategory = category;
      let result;
      if (vm.currentCategory !== '全部商品') {
        result = vm.products.filter((obj) => {
          if (vm.currentCategory === obj.category) {
            return obj;
          }
          return false;
        });
        vm.categorizedProducts = result;
      } else {
        vm.categorizedProducts = vm.products;
      }
    },
    sortProducts() {
      const vm = this;
      console.log(vm.sortMethod);

      if (vm.sortMethod.time) {
        vm.sortMethod.price = '';
      } else if (vm.sortMethod.price) {
        vm.sortMethod.time = '';
      }
      if (vm.sortMethod.time === '舊到新') {
        vm.categorizedProducts = vm.categorizedProducts.reverse();
      }
      vm.categorizedProducts.sort((a, b) => {
        if (vm.sortMethod.price === '低到高') {
          return a.price - b.price;
        }
        if (vm.sortMethod.price === '高到低') {
          return b.price - a.price;
        }
        return false;
      });
    },
    getPagination(page) {
      const vm = this;
      const categorizedProductsLen = vm.categorizedProducts.length;
      console.log(page);
      vm.$set(vm.pagination, 'current_page', page);
      console.log(Math.floor(categorizedProductsLen / 12));
      if (categorizedProductsLen % 12 !== 0) {
        vm.$set(vm.pagination, 'total_pages', Math.floor(categorizedProductsLen / 12) + 1);
      } else {
        vm.$set(vm.pagination, 'total_pages', Math.floor(categorizedProductsLen / 12));
      }
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
    paginateProducts() {
      const vm = this;
      const startIndex = (vm.pagination.current_page - 1) * 12;
      const result = vm.categorizedProducts.filter((obj, index) => {
        if (startIndex <= index && startIndex + 11 >= index) {
          return obj;
        }
        return false;
      });
      vm.renderProducts = result;
    },
    changePage(page) {
      /*
      換頁是由子元件觸發，並且需要經過getProducts來處理，
      而getProducts有一些參數並不存在子元件，
      所以改由子元件觸發此函式，再來觸發getproducts，實現換頁。
      */
      const vm = this;
      vm.getProducts(vm.currentCategory, page);
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="scss">
.products-header {
  @include media-breakpoint-up(xs) {
    justify-content: flex-start;
  }
  @include media-breakpoint-up(md) {
    padding-bottom: 24px;
  }
  @include media-breakpoint-up(lg) {
    padding-bottom: 28px;
    justify-content: space-between;
  }
  align-items: center;
  display: flex;
  flex-wrap: wrap;
}
.products-filter {
  @include media-breakpoint-up(xs) {
    justify-content: center;
    width: 100%;
  }
  @include media-breakpoint-up(md) {
    justify-content: flex-start;
  }
  @include media-breakpoint-up(lg) {
    margin-top: 0;
    width: auto;
  }
  .category {
    @include media-breakpoint-up(xs) {
      display: block;
    }
    @include media-breakpoint-up(md) {
      display: none;
    }
  }
  select {
    @include media-breakpoint-up(xs) {
      padding-left: 0;
      width: auto;
    }
    @include media-breakpoint-up(md) {
      padding-left: 20px;
      width: 114px;
    }
    flex-grow: 1;
    text-align: center;
    cursor: pointer;
  }
  .search-form {
    @include media-breakpoint-up(xs) {
      flex-grow: 1;
      width: 100%;
    }
    @include media-breakpoint-up(md) {
      margin-right: 16px;
      order: 0;
      width: auto;
    }
    @include media-breakpoint-up(lg) {
      flex-grow: 0;
      margin-right: 20px;
    }
  }
  align-items: center;
  display: flex;
  flex-wrap: wrap;
}
.products-title {
  align-items: center;
  display: flex;
  flex-direction: row;
}
.product-category {
  @include media-breakpoint-up(xs) {
    display: none;
  }
  @include media-breakpoint-up(md) {
    display: flex;
    justify-content: flex-start;
    padding-top: 12px;
    margin-bottom: 16px;
  }
  @include media-breakpoint-up(lg) {
    margin-bottom: 20px;
    padding-top: 16px;
  }
  border-top: 1px solid $light;
  flex-wrap: wrap;
  width: 100%;
}
.product-category-btn {
  @include media-breakpoint-up(xs) {
    padding: 6px 12px
  }
  @include media-breakpoint-up(md) {
    padding: 10px 16px;
  }
  @include media-breakpoint-up(lg) {
    padding: 10px 20px;
  }
  &.active {
    color: $primary;
  }
  flex-shrink: 0;
}
</style>
