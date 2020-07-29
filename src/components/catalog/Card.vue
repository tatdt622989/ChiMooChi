<template>
  <div class="card">
    <router-link to="product-info" class="card-img-link">
      <img :src="item.imageUrl" class="card-img" />
    </router-link>
    <div class="card-body">
      <a class="card-title" href="#">
        <h3>{{ item.title }}</h3>
      </a>
      <div class="product-price">
        <del class="original-price">{{ item.origin_price | currency }}</del>
        <p class="on-sale-price">{{ item.price | currency }}</p>
      </div>
      <div class="card-btn-group">
        <button class="btn-square btn-light mr-12">
          <span class="material-icons">favorite_border</span>
        </button>
        <button class="btn-square btn-primary">
          <span class="material-icons">shopping_cart</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['item'],
};
</script>

<style lang="scss">
.card {
  height: auto;
  display: flex;
  align-content: space-between;
}

.card-img-link {
  @include media-breakpoint-up(xs) {
    height: 132px;
    margin: 12px 12px 6px 12px;
  }
  @include media-breakpoint-up(sm) {
    height: 214px;
    margin: 12px 12px 11px 12px;
  }
  @include media-breakpoint-up(md) {
    height: 184px;
    margin: 12px 12px 7px 12px;
  }
  @include media-breakpoint-up(lg) {
  }
  @include media-breakpoint-up(xl) {
    height: 229px;
    margin: 12px 12px 14px 12px;
  }
  background-color: $img-link-bg-color;
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: auto;
}

.card-img {
  &:hover {
    transform: scale(1.2);
  }
  transition: $transition-base;
  width: 100%;
  object-fit: cover;
}

.card-btn-group {
  @include media-breakpoint-up(xs) {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  @include media-breakpoint-up(sm) {
    width: auto;
  }
  display: flex;
  height: 44px;
}

.card-body {
  @include media-breakpoint-up(xs) {
    .card-title {
      margin-bottom: 7px;
    }
    .product-price {
      .original-price {
        font-size: 16px;
        margin-right: 10px;
      }
      .on-sale-price {
        font-size: 20px;
      }
      align-items: center;
      display: flex;
      justify-content: space-between;
      line-height: 1;
      margin-bottom: 16px;
      width: 100%;
    }
    padding-top: 0px;
  }
  @include media-breakpoint-up(sm) {
    .card-title {
      margin-bottom: 12px;
    }
    .product-price {
      .on-sale-price {
        margin-top: 8px;
      }
      display: block;
      margin-bottom: 0;
      width: auto;
    }
  }
  @include media-breakpoint-up(md) {
    .card-title {
      h3 {
        font-size: 18px;
      }
      margin-bottom: 7px;
    }
  }
  @include media-breakpoint-up(xl) {
    .card-title {
      h3 {
        font-size: 20px;
      }
      margin-bottom: 15px;
    }
  }
  .card-title {
    h3 {
      margin-bottom: 0;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    text-align: left;
    width: 100%;
  }
  .product-price {
    .original-price {
      color: $gray-500;
    }
    .on-sale-price {
      color: $danger;
      font-weight: bold;
    }
    text-align: left;
  }
  align-content: space-between;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
