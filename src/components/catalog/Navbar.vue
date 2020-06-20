<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <div class="d-flex align-items-center">
        <button
          class="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          @click="toggleNav"
        >
          <span class="material-icons">menu</span>
        </button>
        <a class="navbar-brand" href="#" title="ChiMooChi">
          <img src="@/assets/images/logo.svg" alt />
        </a>
      </div>
      <div class="primary-nav" :class="{active : navBarIsActive}">
        <button class="close-navbar-btn" @click="toggleNav">
          <span class="material-icons">close</span>
        </button>
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
          <a href="#" class="nav-link" data-toggle="modal" data-target="#exampleModal">
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
    <div class="black-bg" :class="{active : navBarIsActive}"></div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      navBarIsActive: false,
    };
  },
  methods: {
    toggleNav() {
      const vm = this;
      if (vm.navBarIsActive) {
        vm.navBarIsActive = false;
      } else {
        vm.navBarIsActive = true;
      }
    },
  },
};
</script>

<style lang="scss">
.navbar {
  @include media-breakpoint-up(xs) {
    .navbar-brand {
      img {
        height: 40px;
      }
      margin-right: 0px;
    }
    .primary-nav {
      .close-navbar-btn {
        span {
          &:hover {
            color: $nav-close-btn-hover-color;
          }
        }
        align-self: flex-end;
        background-color: #fff;
        display: block;
        height: 44px;
        margin: 10px 10px 22px 0;
        padding: 0 10px 0 10px;
        transition: $transition-base;
        width: 44px;
      }
      .navbar-nav {
        .nav-item {
          .nav-link {
            &:hover {
              background-color: $nav-hover-xs-bg;
              color: $nav-hover-xs-color;
            }
            height: 44px;
            line-height: 44px;
            padding: 0;
          }
          padding: 0;
        }
        .active {
          background-color: $nav-active-xs-bg;
          color: $nav-active-xs-color;
        }
        order: 1;
        width: 100%;
      }
      .search-form {
        .search-btn {
          span {
            font-size: 24px;
            line-height: 42px;
          }
          height: 42px;
          padding: 0 10px 0 10px;
        }
        .search-input {
          font-size: 14px;
          height: 44px;
          text-indent: 44px;
          width: 132px;
        }
        border: 0;
        margin-bottom: 33px;
        order: 0;
        padding: 0;
      }
      background-color: #fff;
      box-shadow: 2px 0px 6px rgba(0, 0, 0, 0.4);
      flex-direction: column;
      height: 100vh;
      width: 172px;
      left: -100%;
      position: fixed;
      top: 0;
    }
    .container {
      .navbar-toggler {
        span {
          &:hover {
            color: $navbar-toggler-hover-color;
          }
        }
        transition: $transition-base;
      }
      > .active {
        left: 0;
      }
    }
    .member-nav {
      .nav-item:nth-of-type(1) {
        margin: 0;
      }
      .nav-item {
        margin-left: 6px;
      }
      flex-direction: row;
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
    .primary-nav {
      .search-form {
        .search-input {
          font-size: 16px;
          text-indent: 50px;
          width: 209px;
        }
        margin-bottom: 44px;
      }
      width: 249px;
    }
    .member-nav {
      .nav-item:nth-of-type(1) {
        margin-left: 20px;
      }
      .nav-item {
        margin-left: 20px;
      }
    }
    height: 76px;
  }
  @include media-breakpoint-up(lg) {
    .primary-nav {
      .close-navbar-btn {
        display: none;
      }
      .navbar-nav {
        .nav-item {
          .nav-link {
            &:hover {
              background-color: $nav-hover-lg-bg;
              color: $nav-color;
            }
            height: auto;
            line-height: 1.5;
            padding-bottom: 4px;
          }
          .active {
            color: $nav-active-lg-color;
            background-color: $nav-active-lg-bg;
            border-bottom: 2px solid $primary;
          }
          a {
            &:not(.active):hover {
              color: $nav-hover-lg-color;
            }
          }
          height: auto;
          padding-right: 15px;
          padding-left: 14px;
        }
        order: 0;
      }
      .search-form {
        .search-btn {
          span {
            font-size: 20px;
            line-height: 26px;
          }
          height: 26px;
          padding: 0 4px 0 4px;
          width: 28px;
        }
        .search-input {
          font-size: 14px;
          height: 28px;
          text-indent: 34px;
          width: 140px;
        }
        border-right: 1px solid $gray-500;
        margin-bottom: 0;
        order: 1;
        padding-right: 30px;
      }
      align-items: center;
      box-shadow: none;
      flex-direction: row;
      height: auto;
      justify-content: space-between;
      flex-basis: 100%;
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
    .primary-nav {
      .search-form {
        .search-btn {
          &:focus {
            outline: 0;
          }
          background-color: #fff;
          border: 0;
          left: 1px;
          position: absolute;
          text-align: center;
          top: 1px;
        }
        .search-input {
          &:focus {
            border: 1px solid $primary;
            outline: 0px;
          }
          border: 1px solid $secondary;
          transition: $transition-base;
        }
        display: flex;
        font-size: 14px;
        flex-wrap: nowrap;
        position: relative;
      }
      .nav-item {
        .nav-link {
          text-align: center;
          transition: $transition-base;
        }
      }
      align-items: center;
      background-color: #fff;
      display: flex;
      transition: $transition-collapse;
      z-index: $zindex-navbar;
    }
    .member-nav {
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
          color: $member-nav-btn-hover;
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
  padding: 0;
  >.active {
    opacity: 1;
    pointer-events: auto;
  }
}
.black-bg {
  background-color: rgba(0, 0, 0, 0.6);
  height: 100vh;
  left: 0;
  opacity: 0;
  position: fixed;
  pointer-events: none;
  transition: $transition-fade;
  top: 0;
  width: 100%;
  z-index: $zindex-navbar-bg;
}
</style>
