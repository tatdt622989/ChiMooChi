<template>
  <div class="container">
    <Breadcrumb />
    <div class="row product-info">
      <div class="col-sm-6 col-12 product-info-img-link">
        <img src alt />
      </div>
      <div class="col-12 col-sm-6 text-left d-flex flex-column">
        <h1 class="f-lg-30 f-24 mb-lg-32 mb-md-24 mb-16">簡約造型單人沙發</h1>
        <div class="product-info-price">
          <p class="text-danger f-lg-28 f-20 font-weight-bold mr-lg-24
          mr-12">$<span>2000</span></p>
          <p class="f-lg-20 f-16 text-dark">$<del>2500</del></p>
        </div>
        <h2 class="f-14 f-sm-16 mb-lg-20 mb-md-12">
          尺寸:  長1.2m x 寬0.6m x 高1.0m<br>材質:  皮革、泡棉、木材
        </h2>
        <h3 class="f-14 f-md-16 mb-lg-45 mb-md-24 mb-16">
          皮製經典復古沙發，是由多位大師級的工匠和設計師，
          經過不容妥協的選材和設計，再經由專家嚴格的多項耐用性和安全性的測試，
          聯手打造出兼具尊爵的視覺饗宴以及最高等級的使用體驗的產品。
        </h3>
        <div class="d-flex align-items-center">
          <span class="f-lg-20 mr-lg-32 mr-16">數量：</span>
          <Counter />
        </div>
        <div class="product-info-btn-group">
          <button class="btn btn-secondary product-info-favorite">加入我的最愛</button>
          <button class="btn btn-primary product-info-cart">加入購物車</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Catalog/Breadcrumb.vue';
import Counter from '@/components/Catalog/Counter.vue';

export default {
  name: 'ProductInfo',
  components: {
    Breadcrumb,
    Counter,
  },
};
</script>

<style lang="scss">
.product-info {
  @include media-breakpoint-up(xs) {
    margin-bottom: 45px;
  }
  @include media-breakpoint-up(sm) {
    min-height: 360px;
    margin-bottom: 45px;
  }
  @include media-breakpoint-up(md) {
    min-height: 480px;
    margin-bottom: 60px;
  }
  @include media-breakpoint-up(lg) {
    min-height: 570px;
    margin-bottom: 90px;
  }
}
.product-info-img-link{
  @include media-breakpoint-up(xs) {
    margin-bottom: 16px;
    min-height: 211px;
  }
  @include media-breakpoint-up(sm) {
    margin-bottom: 0;
    min-height: auto;
  }
  background-color: $img-link-bg-color;
  background-clip: content-box;
}
.product-info-price {
  @include media-breakpoint-up(xs) {
    height: 45px;
    margin-bottom: 16px;
    padding: 6px 16px 6px 16px;
  }
  @include media-breakpoint-up(md) {
    height: 45px;
    margin-bottom: 24px;
  }
  @include media-breakpoint-up(lg) {
    height: 60px;
    margin-bottom: 45px;
    padding: 8px 24px 8px 24px;
  }
  align-items: center;
  border: 1px solid $light;
  display: flex;
}
.product-info-btn-group {
  @include media-breakpoint-up(xs) {
    flex-basis: 84px;
  }
  @include media-breakpoint-up(sm) {
    flex-basis: 90px;
  }
  @include media-breakpoint-up(md) {
    flex-basis: auto;
    flex-grow: 1;
  }
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
}
.product-info-favorite, .product-info-cart {
  flex-grow: 1;
  height: 60px;
  padding: 0;
}
.product-info-favorite {
  margin-right: 30px;
}
</style>
