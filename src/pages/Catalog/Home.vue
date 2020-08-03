<template>
  <div class="container">
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          class="active">
        </li>
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="1"
        >
        </li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active carousel-banner-01"></div>
        <div class="carousel-item carousel-banner-02"></div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <div class="thin-banner">
      <router-link to="promotion"
      class="thin-banner-link d-block d-sm-none h-100 w-100"></router-link>
      <router-link to="promotion"
      class="btn btn-quaternary mr-lg-28 mr-md-20 mr-sm-16 d-none d-sm-block"
      >立即領取</router-link>
    </div>
    <div class="featured-list f-20 row">
      <h2 class="col-12 mb-16 mb-md-20 d-flex justify-content-between">
        <span>
          <span class="material-icons f-20 mr-8 lh-1-5">thumb_up</span>特色推薦商品
        </span>
        <router-link to="products" class="text-primary">
          查看更多
          <span class="material-icons f-20 mr-8 lh-1-5">play_arrow</span>
        </router-link>
      </h2>
      <div
        class="card-wrap col-lg-3 col-md-4 col-6 d-lg-block mb-30 mb-sm-45"
        :class="{ hide : index === 3  }"
        v-for="(obj, index) in recommendProducts"
        :key="obj.id"
      >
      <Card :obj="obj" @push-message="pushMessage"></Card>
      </div>
    </div>
    <div class="featured-banner-top row">
      <div class="banner-content-left col-md-4 col-12">
        <h2 class="mr-16 mr-md-0 mb-lg-16 mb-xl-24 f-24 f-lg-30 f-xl-36">
          在家渡假好輕鬆
          <br />躺椅享七折優惠
        </h2>
        <h3 class="d-none d-md-block mb-md-16 mb-lg-24 mb-xl-32 f-16 f-lg-20 f-xl-24">
          即刻入手進口高品質躺椅讓度假不再需要出遠門！
        </h3>
        <router-link to="/products" class="btn btn-outline-white-primary f-lg-20">
          去逛逛
        </router-link>
      </div>
    </div>
    <div class="featured-banner-bottom row">
      <div class="banner-content-right offset-md-8 col-md-4 col-12">
        <h2 class="mr-16 mr-md-0 mb-lg-16 mb-xl-24 f-24 f-lg-30 f-xl-36">
          好看與舒適兼具
          <br />不再只當視覺系
        </h2>
        <h3 class="d-none d-md-block mb-md-16 mb-lg-24 mb-xl-32 f-16 f-lg-20 f-xl-24">
          嚴選舒適美學沙發以及精緻抱枕直接一次擁有！
        </h3>
        <router-link to="/products" class="btn btn-outline-white-dark f-lg-20">
          去逛逛
        </router-link>
      </div>
    </div>
    <div class="newsletter">
      <h2 class="f-24 f-lg-30 f-xl-36 mb-12 w-100">訂閱電子報</h2>
      <h3 class="f-16 f-lg-20 f-xl-24 mb-20 w-100">立即訂閱「奇木奇奇」，一手掌握所有好康優惠！</h3>
      <input type="text" placeholder="請輸入您的電子郵件" class="newsletter-input"/>
      <button value="訂閱" class="btn btn-primary mb-12">訂閱</button>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Catalog/Card.vue';

export default {
  name: 'Home',
  components: {
    Card,
  },
  data() {
    return {
      products: [],
      recommendProducts: [],
    };
  },
  methods: {
    getProducts() {
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
        vm.productsFilter();
        loader.hide();
      });
    },
    productsFilter() {
      const vm = this;
      let result = vm.products.filter((obj) => {
        if (obj.category === '特色推薦') {
          return obj;
        }
        return false;
      });
      result = result.reverse().slice(0, 4);
      vm.recommendProducts = result;
    },
    pushMessage() {
      this.$bus.$emit('message:push', '成功', '商品已成功加入購物車', 'success');
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="scss">
.carousel {
  @include media-breakpoint-up(xs) {
    margin-bottom: 35px;
  }
  @include media-breakpoint-up(md) {
    margin-bottom: 45px;
  }
  @include media-breakpoint-up(xl) {
    margin-bottom: 60px;
  }
}
.carousel-banner-01 {
  @include media-breakpoint-up(xs) {
    background-image: url("~@/assets/images/carousel-banner-xs-01.png");
  }
  @include media-breakpoint-up(sm) {
    background-image: url("~@/assets/images/carousel-banner-sm-01.png");
  }
  @include media-breakpoint-up(md) {
    background-image: url("~@/assets/images/carousel-banner-xl-01.png");
  }
}
.carousel-banner-02 {
  @include media-breakpoint-up(xs) {
    background-image: url("~@/assets/images/carousel-banner-xs-02.png");
  }
  @include media-breakpoint-up(sm) {
    background-image: url("~@/assets/images/carousel-banner-sm-02.png");
  }
  @include media-breakpoint-up(md) {
    background-image: url("~@/assets/images/carousel-banner-xl-02.png");
  }
}
.carousel-banner-01, .carousel-banner-02 {
  @include media-breakpoint-up(xs) {
    background-position: center;
    background-size: cover;
    height: 146px;
  }
  @include media-breakpoint-up(sm) {
    height: 216px;
  }
  @include media-breakpoint-up(md) {
    height: 246px;
  }
  @include media-breakpoint-up(lg) {
    height: 332px;
  }
  @include media-breakpoint-up(xl) {
    height: 396px;
  }

}
.carousel-indicators {
  li {
    border-radius: 999em;
    border: 1px solid #fff;
  }
  li:not(.active) {
    background-color: $carousel-indicator-bg;
  }
}
.thin-banner {
  @include media-breakpoint-up(xs) {
    background:
      no-repeat center url("~@/assets/images/thin-banner-content-xs.svg"),
      no-repeat center url("~@/assets/images/thin-banner-bg-xs.svg"),
      ;
    height: 76px;
    margin-bottom: 28px;
  }
  @include media-breakpoint-up(sm) {
    background: no-repeat url("~@/assets/images/thin-banner-sm.svg");
  }
  @include media-breakpoint-up(md) {
    background: no-repeat url("~@/assets/images/thin-banner-md.svg");
    margin-bottom: 35px;
  }
  @include media-breakpoint-up(lg) {
    background: no-repeat url("~@/assets/images/thin-banner-xl.svg");
    height: 100px;
    margin-bottom: 45px;
  }
  align-items: center;
  display: flex;
  justify-content: flex-end;
}

.featured-list {
  @include media-breakpoint-up(xs) {
    margin-bottom: 0;
  }
  @include media-breakpoint-up(md) {
  }
  @include media-breakpoint-up(xl) {
    margin-bottom: 15px;
  }
}

.featured-banner-top, .featured-banner-bottom {
  @include media-breakpoint-up(xs) {
    height: auto;
    margin-bottom: 35px;
  }
  @include media-breakpoint-up(md) {
    height: 265px;
    margin-bottom: 45px;
  }
  @include media-breakpoint-up(lg) {
    height: 341px;
    margin-bottom: 45px;
  }
  @include media-breakpoint-up(xl) {
    height: 427px;
    margin-bottom: 60px;
  }
  margin-left: 0;
  margin-right: 0;
  position: relative;
}
.featured-banner-top {
  background: center 60%/100% auto no-repeat $featured-list-1-bg-img padding-box;
}
.featured-banner-bottom {
  background: center 60%/100% auto no-repeat $featured-list-2-bg-img content-box;
}
.banner-content-right {
  background-color: $featured-list-2-bg-color;
  }
.banner-content-left {
  background-color: $featured-list-1-bg-color;
}
.banner-content-right, .banner-content-left {
  @include media-breakpoint-up(xs) {
    align-items: center;
    flex-direction: row;
    margin-top: 157px;
    padding: 16px 0px 15px 0px;
  }
  @include media-breakpoint-up(md) {
    align-items: flex-start;
    flex-direction: column;
    margin-top: 0px;
    padding: 0px 24px 0 24px;
  }
  @include media-breakpoint-up(lg) {
    padding: 0px 36px 0px 36px;
  }
  @include media-breakpoint-up(xl) {
    padding: 0px 45px 0px 45px;
  }
  color: $featured-banner-color;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  text-align: left;
  width: 350px;
}

.newsletter {
  @include media-breakpoint-up(xs) {
    margin-bottom: 45px;
    padding: 0 16px 0 16px;
  }
  @include media-breakpoint-up(md) {
    margin-bottom: 60px;
  }
  @include media-breakpoint-up(xl) {
    margin-bottom: 90px;
  }
  align-content: center;
  align-items: center;
  background:
    linear-gradient(transparentize($gray-600, 0.4),
    transparentize($gray-600, 0.4)) no-repeat top/cover fixed,
    $newsletter-bg-img no-repeat center/150% fixed;
  color: $newsletter-color;
  display: flex;
  flex-wrap: wrap;
  height: 278px;
  justify-content: center;
}
.newsletter-input {
  @include media-breakpoint-up(xs) {
    text-indent: 10px;
    width: 178px;
  }
  @include media-breakpoint-up(md) {
    text-indent: 20px;
    width: 445px;
  }
  border: 0;
  height: 44px;
  margin-bottom: 12px;
}
.card-wrap.hide {
  @include media-breakpoint-up(md) {
    display: none;
  }
  @include media-breakpoint-up(lg) {
    display: block;
  }
}
</style>
