<template>
  <div class="container">
    <Breadcrumb />
    <div class="row">
      <div class="search-result-title col-5  col-sm-4 col-md-6">
        <h1 class="f-20 f-sm-24 f-md-30 mr-20 mr-md-32 mb-0 font-weight-bold">全部商品</h1>
        <h2 class="f-14 f-sm-16 f-md-20 mb-0">共29件商品</h2>
      </div>
      <div class="product-filter col-7 col-sm-8 col-md-6">
        <button class="btn btn-outline-secondary mr-8 mr-sm-8 mr-md-20 mb-0
        px-8 px-sm-32">新上市</button>
        <div class="dropdown">
          <button
            class="btn btn-outline-secondary dropdown-toggle px-8 px-sm-32"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >價格</button>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <button class="dropdown-item" type="button">高到低</button>
            <button class="dropdown-item" type="button">低到高</button>
          </div>
        </div>
      </div>
    </div>
    <hr class="mb-8 mb-sm-16" />
    <div class="product-category">
      <button class="btn text-hover-primary product-category-btn acitve">全部商品</button>
      <button class="btn text-hover-primary product-category-btn">特色推薦</button>
      <button class="btn text-hover-primary product-category-btn">經典設計</button>
      <button class="btn text-hover-primary product-category-btn">木椅</button>
      <button class="btn text-hover-primary product-category-btn">塑膠椅</button>
      <button class="btn text-hover-primary product-category-btn">金屬椅</button>
      <button class="btn text-hover-primary product-category-btn">沙發/沙發床</button>
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
    <nav aria-label="Page navigation example" class="mt-32 mb-60">
      <ul class="pagination justify-content-center">
        <li class="page-item disabled">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item active">
          <a class="page-link" href="#">1</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">2</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">3</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Catalog/Breadcrumb.vue';
import Card from '@/components/Catalog/Card.vue';

export default {
  name: 'Product',
  components: {
    Breadcrumb,
    Card,
  },
  data() {
    return {
      products: [],
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
  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="scss">
.search-result-title {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.product-filter {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.product-category {
  @include media-breakpoint-up(xs) {
    justify-content: flex-start;
    margin-bottom: 16px;
  }
  @include media-breakpoint-up(md) {
    justify-content: flex-start;
    margin-bottom: 24px;
  }
  display: flex;
  flex-wrap: wrap;
}
.product-category-btn {
  @include media-breakpoint-up(xs) {
    padding: 6px 12px 6px 12px;
  }
  @include media-breakpoint-up(md) {
    padding: 10px 16px 10px 16px;
  }
  @include media-breakpoint-up(lg) {
    padding: 10px 32px 10px 32px;
  }
  flex-shrink: 0;
}
</style>
