<template>
  <nav class="navbar navbar-expand-lg p-0 w-100">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img src="../../assets/images/logo.svg" alt="logo" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="primary-nav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" href="#" tabindex="-1" aria-disabled="true">
                首頁
                <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">本店商品</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">折扣優惠</a>
            </li>
          </ul>
        </div>
      </div>
      <form class="search-form form-inline">
        <button class="search-btn">
          <span class="material-icons">search</span>
        </button>
        <input class="search-input" type="search" placeholder="搜尋" />
      </form>
      <div class="dividing-line"></div>
      <div class="member-nav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a href="#" class="nav-link">
              <span class="material-icons">account_circle</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <span class="badge badge-danger">1</span>
              <span class="material-icons">favorite</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <span class="badge badge-danger">1</span>
              <span class="material-icons">shopping_cart</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
</script>
