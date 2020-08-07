<template>
  <div class="container">
    <div class="row">
      <div class="products-header col-12">
        <div class="products-title mt-8 mt-lg-0">
          <h1 class="f-24 f-md-30 mr-12 mr-md-20 mb-0 font-weight-bold">
            {{ search ? `搜尋關鍵詞：${search}` : currentCategory }}
          </h1>
          <h2 class="f-16 mb-0">
            共{{ search ? searchProducts.length : categorizedProducts.length }}件商品
          </h2>
        </div>
        <div class="products-filter mt-16 mt-lg-0 mb-24 mb-md-0">
          <Search class="search-form mb-8 mb-md-0" :search.sync="search" />
          <select
          class="form-control flex-shrink-0
          mr-8 mr-md-16 mr-lg-20 mb-0"
          v-model="sortMethods.time"
          @change="productsFilter(search ? '' : currentCategory,
          sortMethods.time)"
          required
          >
          <option value="" disabled>時間</option>
          <option value="新到舊">新到舊</option>
          <option value="舊到新">舊到新</option>
          </select>
          <select
            class="price form-control mr-8 mr-md-0"
            v-model="sortMethods.price"
            @change="productsFilter(search ? '' : currentCategory,
            sortMethods.price)"
            required
          >
            <option value="" disabled>價格</option>
            <option value="低到高">低到高</option>
            <option value="高到低">高到低</option>
          </select>
          <select
            class="category form-control"
            v-model="currentCategory"
            @change="productsFilter(currentCategory, currentSortMethod, pagination.current_page)"
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
        @click="productsFilter(item, currentSortMethod, pagination.current_page)"
      >{{ item }}</button>
    </div>
    <div class="row product-list">
      <div
        class="col-lg-3 col-md-4 col-6 d-lg-block mb-30 mb-sm-45"
        v-for="obj in paginatedProducts"
        :key="obj.id"
      >
      <Card :product="obj" @push-toast="pushMessage" v-bind="$attrs"></Card>
      </div>
    </div>
    <p
    v-if="search && searchProducts.length === 0 || !search && categorizedProducts.length === 0"
    class="f-30 font-weight-bold text-dark mt-20 mb-45"
    >查無有關"{{ search || currentCategory }}"的商品</p>
    <Pagination
      :pagination="pagination"
      @change-page="changePage"
      v-else
    />
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
      allProducts: [],
      categorizedProducts: [],
      searchProducts: [],
      paginatedProducts: [],
      pagination: {},
      category: ['全部商品', '特色推薦', '經典設計', '木椅', '塑膠椅', '金屬椅', '沙發/沙發床'],
      categoryId: '',
      isPathHasCategory: false,
      currentCategory: '全部商品',
      sortMethods: {
        time: '新到舊',
        price: '',
      },
      currentSortMethod: '',
      search: '',
    };
  },
  methods: {
    getProducts(category) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      const loader = vm.$loading.show({}, {
        default: this.$createElement('LogoLoadingAnimation'),
      });
      console.log(api);
      this.$http.get(api).then((response) => {
        console.log(response.data);
        // 取得所有商品
        vm.allProducts = response.data.products;
        vm.productsFilter(category);
        loader.hide();
      });
    },
    productsFilter(category = '全部商品', currentSortMethod = '新到舊', page = 1) {
      const vm = this;
      if (vm.categoryId !== '' && !vm.isPathHasCategory) {
        vm.$router.replace('/products').catch((err) => err);
      } else {
        vm.isPathHasCategory = false;
      }
      console.log(category);
      // category === '' 代表非更換類別狀態
      // category !== '' 代表觸發更換類別
      if (vm.search && category !== '') {
        vm.search = '';
        vm.currentCategory = category;
      } else if (!vm.search && category !== '') {
        vm.currentCategory = category;
      }
      vm.categorizeProducts(vm.currentCategory);
      const target = vm.search ? vm.searchProducts : vm.categorizedProducts;
      console.log(target);
      console.log(vm.search);
      // 將分類後的商品排序
      vm.currentSortMethod = currentSortMethod;
      vm.sortProducts(target);
      // 將排序後的商品分頁
      vm.getPagination(page, target);
      vm.paginateProducts(target);
    },
    categorizeProducts(category) {
      const vm = this;
      console.log(category);
      vm.currentCategory = category;
      let result;
      if (vm.currentCategory !== '全部商品') {
        result = vm.allProducts.filter((obj) => {
          if (vm.currentCategory === obj.category) {
            return obj;
          }
          return false;
        });
        vm.categorizedProducts = result;
      } else {
        vm.categorizedProducts = [...vm.allProducts];
      }
    },
    sortProducts(array) {
      const vm = this;
      let target = array;
      if (vm.currentSortMethod === vm.sortMethods.time) {
        vm.sortMethods.price = '';
      } else if (vm.currentSortMethod === vm.sortMethods.price) {
        vm.sortMethods.time = '';
      }
      if (vm.sortMethods.time === '新到舊') {
        target = target.reverse();
      }
      target.sort((a, b) => {
        if (vm.sortMethods.price === '低到高') {
          return a.price - b.price;
        }
        if (vm.sortMethods.price === '高到低') {
          return b.price - a.price;
        }
        return false;
      });
    },
    getPagination(page, array) {
      const vm = this;
      const target = array;
      const targetLen = target.length;
      console.log(page);
      vm.$set(vm.pagination, 'current_page', page);
      console.log(Math.floor(targetLen / 12));
      if (targetLen % 12 !== 0) {
        vm.$set(vm.pagination, 'total_pages', Math.floor(targetLen / 12) + 1);
      } else {
        vm.$set(vm.pagination, 'total_pages', Math.floor(targetLen / 12));
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
    paginateProducts(array) {
      const vm = this;
      const target = array;
      console.log(target);
      const startIndex = (vm.pagination.current_page - 1) * 12;
      const result = target.filter((obj, index) => {
        if (startIndex <= index && startIndex + 11 >= index) {
          return obj;
        }
        return false;
      });
      vm.paginatedProducts = result;
    },
    changePage(page) {
      /*
      換頁是由子元件觸發，並且需要經過productsFilter來處理，
      而productsFilter有一些參數並不存在子元件，
      所以改由子元件觸發此函式，再來觸發getproducts，實現換頁。
      */
      const vm = this;
      const target = vm.search ? vm.searchProducts : vm.categorizedProducts;
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
      vm.paginateProducts(target);
    },
    pushMessage() {
      this.$bus.$emit('message:push', '成功', '商品已成功加入購物車', 'success');
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
      vm.productsFilter('');
    },
  },
  created() {
    const vm = this;
    vm.categoryId = vm.$route.params.id;
    const isExist = vm.category.indexOf(vm.categoryId);
    console.log(vm.categoryId);
    if (isExist !== -1) {
      vm.isPathHasCategory = true;
      vm.getProducts(vm.categoryId);
    } else if (vm.categoryId === undefined) {
      vm.getProducts();
    } else {
      vm.$router.replace('/products').catch((err) => err);
    }
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
  &:focus {
    box-shadow: none;
  }
  flex-shrink: 0;
}
</style>
