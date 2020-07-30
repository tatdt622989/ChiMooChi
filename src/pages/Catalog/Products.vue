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
          <button class="btn btn-outline-secondary flex-shrink-0
          mr-8 mr-md-16 mr-lg-20 mb-0 px-20 px-md-32">新上市</button>
          <select class="price form-control mr-8 mr-md-0">
            <option>價格</option>
            <option value="">低到高</option>
            <option value="">高到低</option>
          </select>
          <select class="category form-control">
            <option>類別</option>
            <option v-for="(item, index) in category" :key="index">{{ item }}</option>
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
      >{{ item }}</button>
    </div>
    <div class="row product-list">
      <div
        class="col-lg-3 col-md-4 col-6 d-lg-block mb-30 mb-sm-45"
        v-for="item in products"
        :key="item.id"
      >
      <Card :item="item"></Card>
      </div>
    </div>
    <Pagination :pagination="pagination" @change-page="getProducts"/>
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
      pagination: {},
      category: ['全部商品', '特色推薦', '經典設計', '木椅', '塑膠椅', '金屬椅', '沙發/沙發床'],
      currentCategory: '全部商品',
    };
  },
  methods: {
    getProducts(page = 1) {
      console.log(page);
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      const loader = vm.$loading.show({}, {
        default: this.$createElement('LogoLoadingAnimation'),
      });
      console.log(api);
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
        loader.hide();
      });
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
    width: 100%;
  }
  @include media-breakpoint-up(md) {
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
  .price, .category {
    @include media-breakpoint-up(xs) {
      width: 90px;
    }
    @include media-breakpoint-up(md) {
      width: 114px;
    }
  }
  select {
    @include media-breakpoint-up(xs) {
      padding-left: 16px;
    }
    @include media-breakpoint-up(md) {
      padding-left: 20px;
    }
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
  justify-content: flex-start;
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
