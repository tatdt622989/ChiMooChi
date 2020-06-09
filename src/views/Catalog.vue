<template>
  <div class="catalog">
    <Navbar />
    <div class="container">
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="../assets/images/banner_lg_01.png" class="d-block w-100" alt="banner_01" />
            </div>
            <div class="carousel-item">
              <img src="../assets/images/banner_lg_02.png" class="d-block w-100" alt="banner_02" />
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
        <img src="../assets/images/banner_sm_01.png" alt="">
        <button class="banner-sm-btn btn text-white btn-primary">立即領取</button>
      </div>
      <div class="recommend-list-wrap">
        <p class="t2"><span class="material-icons t2 mr-2">thumb_up</span>精選特價商品</p>
        <div class="row">
          <div class="col-3"></div>
          <div class="col-3"></div>
          <div class="col-3"></div>
          <div class="col-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/catalog/Navbar.vue';

export default {
  name: 'Index',
  components: {
    Navbar,
  },
  created() {
    // eslint-disable-next-line no-console
    console.log(process.env.VUE_APP_API);
  },
};
</script>
