<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <div class="d-flex align-items-center">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="material-icons">menu</span>
        </button>
        <a class="navbar-brand" href="#" title="ChiMooChi">
          <img src="@/assets/images/logo.svg" alt="">
        </a>
      </div>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="primary-nav navbar-nav">
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
        <form class="search-form form-inline collapse">
          <button class="search-btn">
            <span class="material-icons">search</span>
          </button>
          <input class="search-input" type="search" placeholder="搜尋" />
        </form>
      </div>
      <ul class="member-nav navbar-nav">
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
  </nav>
</template>

<script>
</script>

<style lang="scss">
.navbar {
  @include media-breakpoint-up(xs) {
    .navbar-collapse {
      height: 100vh;
      top: 0;
      left: 0;
      position: fixed;
    }
    .navbar-brand {
      img {
        height: 40px;
      }
      margin-right: 0px;
    }
    height: 60px;
  }
  @include media-breakpoint-up(md) {
    .navbar-brand {
      img {
        height: 44px;
      }
      margin-right: 23px;
    }
    height: 76px;
  }
  @include media-breakpoint-up(lg) {
    .navbar-collapse {
      height: auto;
      position: static;
    }
    height: 100px;
  }
  @include media-breakpoint-up(xl) {
  }
  .container {
    button {
      span {
        color: $gray-600;
      }
      border: 0;
      margin-right: 6px;
    }
    .navbar-collapse {
      background-color: #fff;
      justify-content: space-between;
      z-index: $zindex-fixed;
    }
    .primary-nav {
      .nav-item {
        .nav-link {
          &:hover {
            color: $primary;
          }
          transition: $transition-base;
          padding-bottom: 4px;
        }
        .active {
          color: $secondary;
          border-bottom: 2px solid $primary;
        }
        .active:hover {
          color: inherit;
        }
        padding-right: 15px;
        padding-left: 14px;
      }
    }
    .search-form {
      .search-btn {
        &:focus {
          outline: 0;
        }
        span {
          font-size: 20px;
          line-height: 26px;
        }
        background-color: #fff;
        border: 0;
        height: 26px;
        padding: 0 4px 0 4px;
        position: absolute;
        top: 1px;
        left: 3px;
        text-align: center;
        width: 28px;
      }
      .search-input {
        &:focus {
          border: 1px solid $primary;
          outline: 0px;
        }
        border: 1px solid $secondary;
        font-size: 14px;
        height: 28px;
        padding: 6px 4px 6px 32px;
        transition: $transition-base;
        width: 140px;
      }
      border-right: 1px solid $gray-500;
      display: flex;
      font-size: 14px;
      flex-wrap: nowrap;
      height: 28px;
      padding-right: 30px;
      position: relative;
      width: 170px;
    }
    .member-nav {
      @include media-breakpoint-up(xs) {
        .nav-item:nth-of-type(1) {
          margin: 0;
        }
        .nav-item {
          margin-left: 6px;
        }
        flex-direction: row;
      }
      @include media-breakpoint-up(md) {
        .nav-item:nth-of-type(1) {
          margin-left: 20px;
        }
        .nav-item {
          margin-left: 20px;
        }
      }
      a {
        .badge {
          height: 17px;
          padding-top: 2px;
          position: absolute;
          right: 0;
          top: 4px;
          width: 17px;
        }
        &:hover {
          color: $primary;
        }
        span {
          line-height: 1;
        }
        display: flex;
        padding: 10px;
        position: relative;
        transition: $transition-base;
      }
    }
    align-items: center;
    display: flex;
    padding: 0 15px 0 15px;
  }
  background-color: #fff;
  padding: 0;
}
</style>
