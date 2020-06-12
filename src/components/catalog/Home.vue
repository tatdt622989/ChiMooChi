<template>
  <div class="container">
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="../../assets/images/main_banner_01.png"
            class="d-block w-100"
            alt="main_banner_01"
          />
        </div>
        <div class="carousel-item">
          <img
            src="../../assets/images/main_banner_02.png"
            class="d-block w-100"
            alt="main_banner_02"
          />
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
    <div class="banner-sm-wrap">
      <img src="../../assets/images/banner_sm_01.png" alt />
      <a href="#" class="banner-sm-btn btn text-white btn-primary">立即領取</a>
    </div>
    <div class="featured-list-wrap t2 row">
      <h2 class="col-12">
        <span>
          <span class="material-icons t2 mr-2">thumb_up</span>特色推薦商品
        </span>
        <a href="#">
          查看更多
          <span class="material-icons t2 mr-2">play_arrow</span>
        </a>
      </h2>
      <div class="col-lg-3 col-md-4 col-sm-6 col-12">
        <div class="card">
          <div class="img-wrap">
            <a href="#" title>
              <!-- <img src="..." class="card-img-top" alt="..."> -->
            </a>
          </div>
          <div class="card-body">
            <h3 class="card-title">Card title</h3>
            <div class="price-wrap">
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
              <button class="favorite">
                <span class="material-icons">favorite_border</span>
              </button>
              <button class="add-to-cart">
                <span class="material-icons">shopping_cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 col-12">
        <div class="card">
          <div class="img-wrap">
            <a href="#" title>
              <!-- <img src="..." class="card-img-top" alt="..."> -->
            </a>
          </div>
          <div class="card-body">
            <h3 class="card-title">Card title</h3>
            <div class="price-wrap">
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
              <button class="favorite">
                <span class="material-icons">favorite_border</span>
              </button>
              <button class="add-to-cart">
                <span class="material-icons">shopping_cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 col-12">
        <div class="card">
          <div class="img-wrap">
            <a href="#" title>
              <!-- <img src="..." class="card-img-top" alt="..."> -->
            </a>
          </div>
          <div class="card-body">
            <h3 class="card-title">Card title</h3>
            <div class="price-wrap">
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
              <button class="favorite">
                <span class="material-icons">favorite_border</span>
              </button>
              <button class="add-to-cart">
                <span class="material-icons">shopping_cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 d-md-none col-sm-6 col-12 d-lg-block">
        <div class="card">
          <div class="img-wrap">
            <a href="#" title>
              <!-- <img src="..." class="card-img-top" alt="..."> -->
            </a>
          </div>
          <div class="card-body">
            <h3 class="card-title">Card title</h3>
            <div class="price-wrap">
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
              <button class="favorite">
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
    <div class="featured-banner row no-gutters">
        <div class="col-8"></div>
        <div class="col-4"></div>
    </div>
  </div>
</template>
