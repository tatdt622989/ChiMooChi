<template>
  <div class="container">
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active main-banner-01">
        </div>
        <div class="carousel-item main-banner-02">
        </div>
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
      <a href="" class="link-to-discount"></a>
      <a href="#" class="thin-banner-btn btn text-white btn-primary">立即領取</a>
    </div>
    <div class="featured-list t2 row">
      <h2 class="col-12">
        <span>
          <span class="material-icons t2 mr-2">thumb_up</span>特色推薦商品
        </span>
        <a href="#">
          查看更多
          <span class="material-icons t2 mr-2">play_arrow</span>
        </a>
      </h2>
      <div class="col-lg-3 col-md-4 col-6 d-lg-block mb-3 mb-lg-0">
        <div class="card">
          <div class="product-img">
            <a href="#" title>
              <!-- <img src="..." class="card-img-top" alt="..."> -->
            </a>
          </div>
          <div class="card-body">
            <h3 class="card-title">Card title</h3>
            <div class="product-price">
              <p class="original-price">
                $
                <del>9999</del>
              </p>
              <p class="on-sale-price">
                $
                <span>1000</span>
              </p>
            </div>
            <div class="card-btn-group">
              <button class="favorite-btn">
                <span class="material-icons">favorite_border</span>
              </button>
              <button class="add-to-cart">
                <span class="material-icons">shopping_cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-6 d-lg-block mb-3 mb-lg-0">
        <div class="card">
          <div class="product-img">
            <a href="#" title>
              <!-- <img src="..." class="card-img-top" alt="..."> -->
            </a>
          </div>
          <div class="card-body">
            <h3 class="card-title">Card title</h3>
            <div class="product-price">
              <p class="original-price">
                $
                <del>9999</del>
              </p>
              <p class="on-sale-price">
                $
                <span>1000</span>
              </p>
            </div>
            <div class="card-btn-group">
              <button class="favorite-btn">
                <span class="material-icons">favorite_border</span>
              </button>
              <button class="add-to-cart">
                <span class="material-icons">shopping_cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-6 d-lg-block">
        <div class="card">
          <div class="product-img">
            <a href="#" title>
              <!-- <img src="..." class="card-img-top" alt="..."> -->
            </a>
          </div>
          <div class="card-body">
            <h3 class="card-title">Card title</h3>
            <div class="product-price">
              <p class="original-price">
                $
                <del>9999</del>
              </p>
              <p class="on-sale-price">
                $
                <span>1000</span>
              </p>
            </div>
            <div class="card-btn-group">
              <button class="favorite-btn">
                <span class="material-icons">favorite_border</span>
              </button>
              <button class="add-to-cart">
                <span class="material-icons">shopping_cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 d-md-none col-6 d-lg-block">
        <div class="card">
          <div class="product-img">
            <a href="#" title>
              <!-- <img src="..." class="card-img-top" alt="..."> -->
            </a>
          </div>
          <div class="card-body">
            <h3 class="card-title">超強鋁合金渦輪動力按摩椅</h3>
            <div class="product-price">
              <p class="original-price">
                $
                <del>9999</del>
              </p>
              <p class="on-sale-price">
                $
                <span>1000</span>
              </p>
            </div>
            <div class="card-btn-group">
              <button class="favorite-btn">
                <span class="material-icons">favorite_border</span>
              </button>
              <button class="add-to-cart">
                <span class="material-icons">shopping_cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="featured-banner-1 row">
      <div class="banner-content-left col-md-4 col-12">
        <h2>
          在家渡假好輕鬆
          <br />躺椅享七折優惠
        </h2>
        <h3>即刻入手進口高品質躺椅讓度假不再需要出遠門！</h3>
        <a href="#" class="btn">去逛逛</a>
      </div>
    </div>
    <div class="featured-banner-2 row">
      <div class="banner-content-right col-md-4 col-12">
        <h2>
          好看與舒適兼具
          <br />不再只當視覺系
        </h2>
        <h3>嚴選舒適美學沙發以及精緻抱枕直接一次擁有！</h3>
        <a href="#" class="btn">去逛逛</a>
      </div>
    </div>
    <div class="newsletter">
      <h2>訂閱電子報</h2>
      <h3>立即訂閱「奇木奇奇」，一手掌握所有好康優惠！</h3>
      <input type="text" placeholder="請輸入您的電子郵件" />
      <button value="訂閱" class="btn btn-primary">訂閱</button>
    </div>
    <div class="favorite modal fade" id="exampleModal">
      <div class="modal-dialog" role="document">
    <div class="modal-content" tabindex="-1" role="dialog">
      <div class="modal-header">
          <h5 class="modal-title">我的最愛</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Modal body text goes here.</p>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script></script>

<style lang="scss">
.carousel {
  @include media-breakpoint-up(xs) {
    .main-banner-01 {
      background-image: url("~@/assets/images/main-banner-xs-01.png");
    }
    .main-banner-02 {
      background-image: url("~@/assets/images/main-banner-xs-02.png");
    }
    .main-banner-01, .main-banner-02 {
      background-position: center;
      background-size: cover;
      height: 146px;
    }
    margin-bottom: 35px;
  }
  @include media-breakpoint-up(sm) {
    .main-banner-01 {
      background-image: url("~@/assets/images/main-banner-sm-01.png");
    }
    .main-banner-02 {
      background-image: url("~@/assets/images/main-banner-sm-02.png");
    }
    .main-banner-01, .main-banner-02 {
      height: 216px;
    }
    margin-bottom: 35px;
  }
  @include media-breakpoint-up(md) {
    .main-banner-01 {
      background-image: url("~@/assets/images/main-banner-xl-01.png");
    }
    .main-banner-02 {
      background-image: url("~@/assets/images/main-banner-xl-02.png");
    }
    .main-banner-01, .main-banner-02 {
      height: 246px;
    }
    margin-bottom: 45px;
  }
  @include media-breakpoint-up(lg) {
    .main-banner-01, .main-banner-02 {
      height: 332px;
    }
    margin-bottom: 45px;
  }
  @include media-breakpoint-up(xl) {
    .main-banner-01, .main-banner-02 {
      height: 396px;
    }
    margin-bottom: 60px;
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
}

.thin-banner {
  @include media-breakpoint-up(xs) {
    a {
      display: block;
      height: 100%;
    }
    .thin-banner-btn {
      display: none;
    }
    background: no-repeat url("~@/assets/images/thin-banner-xs.png");
    height: 76px;
    margin-bottom: 28px;
  }
  @include media-breakpoint-up(sm) {
    a {
      height: auto;
    }
    .thin-banner-btn {
      display: block;
      right: 16px;
    }
    background: no-repeat url("~@/assets/images/thin-banner-sm.png");
  }
  @include media-breakpoint-up(md) {
    .thin-banner-btn {
      right: 20px;
    }
    background: no-repeat url("~@/assets/images/thin-banner-md.png");
    margin-bottom: 35px;
  }
  @include media-breakpoint-up(lg) {
    .thin-banner-btn {
      right: 28px;
    }
    background: no-repeat url("~@/assets/images/thin-banner-xl.png");
    height: 100px;
    margin-bottom: 45px;
  }
  .thin-banner-btn {
    &:hover,
    &:active {
      background-color: $tertiary;
    }
    &:focus {
      box-shadow: 0 0 0 0.2rem rgba(170, 134, 111, 0.5);
    }
    background-color: $quaternary;
    position: absolute;
    transition: $transition-base;
    top: 50%;
    margin-top: -22px;
  }
  img {
    width: 100%;
  }
  position: relative;
}

.featured-list {
  @include media-breakpoint-up(xs) {
    h2 {
      margin-bottom: 16px;
    }
    margin-bottom: 35px;
  }
  @include media-breakpoint-up(md) {
    h2 {
      margin-bottom: 20px;
    }
    margin-bottom: 45px;
  }
  @include media-breakpoint-up(xl) {
    margin-bottom: 60px;
  }
  h2 {
    a {
      &:hover {
        color: $link-hover-primary-color;
      }
      color: $featured-list-title-link-color;
      transition: $transition-base;
    }
    .material-icons {
      line-height: 1.5;
    }
    display: flex;
    justify-content: space-between;
  }
  text-align: left;
}

.featured-banner-1,
.featured-banner-2 {
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

.banner-content-right,
.banner-content-left {
  @include media-breakpoint-up(xs) {
    h3 {
      display: none;
    }
    h2 {
      font-size: 24px;
      margin-right: 23px;
    }
    align-items: center;
    flex-direction: row;
    margin-top: 157px;
    padding: 16px 0px 15px 0px ;
  }
  @include media-breakpoint-up(md) {
    h2 {
      margin-right: 0px;
    }
    h3 {
      display: block;
      font-size: 14px;
      margin-bottom: 16px;
    }
    align-items: flex-start;
    flex-direction: column;
    margin-top: 0px;
    padding: 0px 31px 0 31px ;
  }
  @include media-breakpoint-up(lg) {
    h2 {
      font-size: 30px;
      margin-bottom: 16px;
    }
    h3 {
      font-size: 18px;
      margin-bottom: 24px;
    }
    padding: 0px 49px 0px 49px;
  }
  @include media-breakpoint-up(xl) {
    h2 {
      font-size: 36px;
      margin-bottom: 24px;
    }
    h3 {
      margin-bottom: 32px;
    }
  }
  h2 {
    font-weight: normal;
  }
  a {
    &:hover {
      background-color: $white;
      color: $featured-banner-link-hover;
    }
    border: 1px solid $white;
    color: $featured-banner-color;
    height: 44px;
    transition: $transition-base;
    width: 114px;
  }
  background-color: $featured-list-1-bg-color;
  color: $featured-banner-color;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  text-align: left;
  width: 350px;
}

.featured-banner-1 {
  background: center 60%/100% auto no-repeat $featured-list-1-bg-img padding-box;
}

.featured-banner-2 {
  .banner-content-right {
    a {
      &:hover {
        color: $gray-500;
      }
    }
    background-color: $featured-list-2-bg-color;
    left: auto;
    right: 0;
  }
  background: center 60%/100% auto no-repeat $featured-list-2-bg-img content-box;
}

.newsletter {
  @include media-breakpoint-up(xs) {
    h2 {
      font-size: 24px;
    }
    h3 {
      font-size: 16px;
    }
    input {
      text-indent: 10px;
      width: 178px;
    }
    margin-bottom: 45px;
    padding: 0 16px 0 16px;
  }
  @include media-breakpoint-up(sm) {
  }
  @include media-breakpoint-up(md) {
    input {
      text-indent: 20px;
      width: 445px;
    }
    margin-bottom: 60px;
  }
  @include media-breakpoint-up(lg) {
    h2 {
      font-size: 30px;
    }
    h3 {
      font-size: 18px;
    }
  }
  @include media-breakpoint-up(xl) {
    h2 {
      font-size: 36px;
    }
    h3 {
      font-size: 20px;
    }
    margin-bottom: 90px;
  }
  h2 {
    margin-bottom: 12px;
    width: 100%;
  }
  h3 {
    margin-bottom: 20px;
    width: 100%;
  }
  input {
    border: 0;
    height: 44px;
    margin-bottom: 1px;
    margin-bottom: 13px;
  }
  button {
    border: 0;
    color: $newsletter-btn-color;
    margin-bottom: 13px;
    padding-top: 10px;
    padding-bottom: 10px;
    transition: $transition-base;
  }
  align-content: center;
  align-items: center;
  background-attachment: fixed, fixed;
  background-image: $newsletter-bg-img;
  background-position: 0 0, 0 0;
  background-repeat: no-repeat, no-repeat;
  background-size: auto, cover;
  color: $newsletter-color;
  display: flex;
  flex-wrap: wrap;
  height: 278px;
  justify-content: center;
}

.favorite {
  @include media-breakpoint-up(xs) {

  }
  @include media-breakpoint-up(md) {

  }
  @include media-breakpoint-up(lg) {
    .modal-dialog {
      .modal-content {
        height: 670px;
        margin-right: auto;
        margin-left: auto;
        width: 730px;
      }
      margin-top: 98px;
      max-width: none;
    }
  }
  @include media-breakpoint-up(xl) {
  }
  .modal-dialog {
    .modal-content {
      box-shadow: 2px 0px 6px rgba(0, 0, 0, 0.4);
    }
  }
  position: fixed;
}
</style>
