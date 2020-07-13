<template>
  <div class="favorite-modal modal fade" id="exampleModal">
    <div class="modal-dialog modal-sm modal-lg" role="document">
      <div class="modal-content" tabindex="-1" role="dialog">
        <div class="modal-header">
          <h5 class="modal-title">我的最愛</h5>
          <button type="button" class="close p-16" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <ul class=" border-bottom border-light m-0 p-0">
            <li class="favorite-modal-item flex-wrap">
              <a href="#" class="favorite-modal-img-link">
                <img src alt />
              </a>
              <p class="product-title text-overflow mb-8 mb-sm-0">雙噴多功能氣墊椅雙噴多功能氣墊椅</p>
              <Counter class="ml-0 ml-sm-96 ml-md-0 mt-0 mt-sm-16 mt-md-0" />
              <p class="price font-weight-bold">
                $
                <span>2000</span>
              </p>
              <div class="btn-group mt-0 mt-sm-16 mt-md-0">
                <button class="btn-square btn-outline-secondary mr-12">
                  <span class="material-icons">shopping_cart</span>
                </button>
                <button class="btn-square btn-outline-danger">
                  <span class="material-icons">delete</span>
                </button>
              </div>
            </li>
          </ul>
          <div class="favorite-modal-empty">
            <p class="mb-3 fz-3">還沒有最愛的商品喔！</p>
            <a href class="btn btn-primary text-white">去逛逛</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Counter from '@/components/Catalog/Counter.vue';

export default {
  name: 'Favorite',
  components: {
    Counter,
  },
};
</script>

<style lang="scss" scoped>
.favorite-modal {
  .modal-dialog {
    @include media-breakpoint-up(xs) {
      margin-top: 76px;
    }
    @include media-breakpoint-up(sm) {
      margin-top: 76px;
    }
    @include media-breakpoint-up(md) {
      margin-top: 76px;
      max-width: 630px;
    }
    @include media-breakpoint-up(lg) {
      margin-top: 100px;
      max-width: 730px;
    }
  }
  .modal-content {
    @include media-breakpoint-up(xs) {
      min-height: 510px;
    }
    @include media-breakpoint-up(sm) {
      min-height: 570px;
    }
    @include media-breakpoint-up(lg) {
      min-height: 730px;
    }
    box-shadow: 2px 0px 6px rgba(0, 0, 0, 0.4);
  }
  .modal-header {
    @include media-breakpoint-up(xs) {
      padding: 12px;
    }
    @include media-breakpoint-up(sm) {
      padding: 16px;
    }
  }
  .modal-body {
    @include media-breakpoint-up(xs) {
      padding: 0 12px 0 12px;
    }
    @include media-breakpoint-up(sm) {
      padding: 16px 16px 0 16px;
    }
  }
}
.favorite-modal-item {
  @include media-breakpoint-up(xs) {
    align-items: center;
    margin-bottom: 12px;
  }
  @include media-breakpoint-up(sm) {
    align-items: flex-start;
  }
  @include media-breakpoint-up(md) {
    align-items: center;
    margin-bottom: 16px;
  }
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  position: relative;
}
.product-title,
.price {
  @include media-breakpoint-up(xs) {
    margin-left: 82px;
  }
  @include media-breakpoint-up(sm) {
    margin-left: 0;
  }
  @include media-breakpoint-up(md) {
    margin-bottom: 0;
  }
}
.product-title {
  @include media-breakpoint-up(xs) {
    font-size: 16px;
    order: -2;
    text-align: left;
    width: 100%;
  }
  @include media-breakpoint-up(sm) {
    font-size: 16px;
    margin-left: 96px;
    width: 282px;
  }
  @include media-breakpoint-up(md) {
    margin-left: 0px;
    order: 0;
    width: 136px;
  }
  @include media-breakpoint-up(lg) {
    width: 186px;
  }
}
.price {
  @include media-breakpoint-up(xs) {
    flex-grow: 0;
    font-size: 16px;
    margin-bottom: 26px;
    order: -1;
    text-align: left;
    width: 100%;
  }
  @include media-breakpoint-up(sm) {
    font-size: 16px;
    margin-bottom: 0px;
    text-align: right;
    width: 100px;
  }
  @include media-breakpoint-up(md) {
    order: 0;
    width: 70px;
    text-align: center;
  }
  @include media-breakpoint-up(lg) {
    width: 100px;
  }
}
.favorite-modal-img-link {
  @include media-breakpoint-up(xs) {
    flex-shrink: 0;
    height: 70px;
    left: 0;
    position: absolute;
    top: 0;
    width: 70px;
  }
  @include media-breakpoint-up(sm) {
    height: 60px;
    width: 80px;
  }
  @include media-breakpoint-up(md) {
    height: 60px;
    position: static;
    width: 80px;
  }
  @include media-breakpoint-up(lg) {
    height: 75px;
    width: 100px;
  }
  background-color: $img-link-bg-color;
}
.btn-group {
  @include media-breakpoint-up(xs) {
    display: flex;
    flex-basis: 10%;
    flex-grow: 0;
    justify-content: flex-end;
  }
}
.favorite-modal-empty {
  height: 100px;
  left: 50%;
  margin-left: -150px;
  margin-top: -50px;
  position: absolute;
  top: 50%;
  width: 300px;
}
</style>
