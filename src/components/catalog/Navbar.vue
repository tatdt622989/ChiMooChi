<template>
  <nav class="navbar navbar-expand-lg p-0">
    <div class="container navbar-container">
      <div class="d-flex align-items-center">
        <button
          class="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          @click="toggleNav"
        >
          <span class="material-icons">menu</span>
        </button>
        <router-link class="navbar-brand" to="/" title="ChiMooChi">
          <img src="@/assets/images/logo.svg" alt />
        </router-link>
      </div>
      <div class="navbar-primary" :class="{active : navBarIsActive}">
        <button class="close-navbar-btn" @click="toggleNav">
          <span class="material-icons">close</span>
        </button>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              to="/home"
              class="nav-link"
              href="#"
              tabindex="-1"
              active-class="active"
              @click.native="navBarIsActive = false"
            >
              首頁
              <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
            to="/product"
            class="nav-link"
            href="#"
            active-class="active"
            @click.native="navBarIsActive = false"
            >本店商品</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">折扣優惠</a>
          </li>
        </ul>
        <form class="search-form form-inline collapse">
          <button class="search-btn">
            <span class="material-icons lh-1">search</span>
          </button>
          <input class="search-input" type="search" placeholder="搜尋" />
        </form>
      </div>
      <ul class="navbar-member navbar-nav">
        <li class="nav-item">
          <a href="#" class="nav-link">
            <span class="material-icons lh-1">account_circle</span>
          </a>
        </li>
        <li class="nav-item">
          <button class="nav-link" data-toggle="modal" data-target="#exampleModal">
            <span class="badge badge-danger">1</span>
            <span class="material-icons lh-1">favorite</span>
          </button>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">
            <span class="badge badge-danger">1</span>
            <span class="material-icons lh-1">shopping_cart</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="black-bg" :class="{active : navBarIsActive}" @click="toggleNav"></div>
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
    height: 60px;
  }
  @include media-breakpoint-up(md) {
    height: 76px;
  }
  @include media-breakpoint-up(lg) {
    height: 100px;
  }
  .navbar-container {
    @include media-breakpoint-up(xs) {
      > .active {
        left: 0;
      }
    }
    align-items: center;
    display: flex;
    padding: 0 15px 0 15px;
  }
}
.navbar-brand {
  @include media-breakpoint-up(xs) {
    img {
      height: 40px;
    }
    margin-right: 0px;
  }
  @include media-breakpoint-up(md) {
    img {
      height: 44px;
    }
    margin-right: 23px;
  }
}
.navbar-toggler {
  @include media-breakpoint-up(xs) {
    span {
      &:hover {
        color: $navbar-toggler-hover-color;
      }
    }
    transition: $transition-base;
  }
  span {
    color: $gray-600;
  }
  border: 0;
  margin-right: 6px;
}
.navbar-primary {
  @include media-breakpoint-up(xs) {
    .close-navbar-btn {
      span {
        &:hover {
          color: $nav-close-btn-hover-color;
        }
      }
      align-self: flex-end;
      background-color: #fff;
      border: 0;
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
  @include media-breakpoint-up(md) {
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
  @include media-breakpoint-up(lg) {
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
          padding-bottom: 2px;
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
.navbar-member {
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
  .nav-item {
    a, button {
      .badge {
        height: 17px;
        padding-top: 2px;
        position: absolute;
        right: 0;
        top: 4px;
        width: 17px;
      }
      &:hover {
        color: $navbar-member-btn-hover;
      }
      display: flex;
      padding: 10px;
      position: relative;
      transition: $transition-base;
    }
    button {
      border: 0;
      background-color: #fff;
      color: $navbar-member-color;
    }
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
.black-bg.active {
  @include media-breakpoint-up(xs) {
    opacity: 1;
    pointer-events: auto;
  }
  @include media-breakpoint-up(lg) {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
