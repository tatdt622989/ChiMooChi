<template>
  <nav class="navbar navbar-expand-lg p-0">
    <div class="container">
      <div class="d-flex align-items-center">
        <button
          class="navbar-toggler border-0"
          type="button"
          aria-label="Toggle navigation"
          @click="navbarToggler"
        >
          <span class="material-icons">menu</span>
        </button>
        <router-link class="navbar-brand" to="/" title="ChiMooChi">
          <img src="@/assets/images/logo.svg" alt="ChiMooChi" class="navbar-brand-img"/>
        </router-link>
      </div>
      <div class="navbar-primary"
          :class="{show : isShow}">
        <button class="close-navbar-btn" @click="navbarToggler">
          <span class="material-icons">close</span>
        </button>
        <ul class="navbar-nav">
          <li class="nav-item ml-0">
            <router-link
              to="/home"
              class="nav-link p-0"
              href="#"
              tabindex="-1"
              active-class="active"
              @click.native="closeNavbar"
            >
              首頁
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
            to="/products"
            class="nav-link p-0"
            href="#"
            active-class="active"
            @click.native="closeNavbar"
            >本店商品</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/promotion" class="nav-link p-0"
            active-class="active" @click.native="closeNavbar"
            >超值優惠</router-link>
          </li>
        </ul>
      </div>
      <ul class="navbar-member">
        <li class="navbar-member-item">
          <router-link to="/dashboard/products" class="navbar-member-link btn-square">
            <span class="material-icons lh-1">account_circle</span>
          </router-link>
        </li>
        <li class="navbar-member-item">
          <button class="navbar-member-link btn-square"
                  data-toggle="modal"
                  data-target="#exampleModal">
            <transition name="base">
              <span
                class="navbar-member-badge badge badge-danger"
                v-if="notification.favorite"
              >{{ notification.favorite }}</span>
            </transition>
            <span class="material-icons lh-1">favorite</span>
          </button>
        </li>
        <li class="navbar-member-item">
          <router-link to="/shopping-cart" class="navbar-member-link btn-square">
            <transition name="base">
              <span
                class="navbar-member-badge badge badge-danger"
                v-if="notification.shoppingCart"
              >{{ notification.shoppingCart }}</span>
            </transition>
            <span class="material-icons lh-1">shopping_cart</span>
          </router-link>
        </li>
      </ul>
    </div>
    <transition name="bg-fade">
      <div v-if="isShow === true" class="fullscreen-bg"  @click="closeNavbar">
      </div>
    </transition>
  </nav>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'Navbar',
  props: ['favoriteProducts'],
  data() {
    return {
      isShow: false,
      notification: {
        shoppingCart: 0,
        favorite: 0,
      },
    };
  },
  methods: {
    navbarToggler() {
      const vm = this;
      vm.isShow = !vm.isShow;
      if (vm.isShow) {
        $('body').css('overflow', 'hidden');
      } else {
        $('body').css('overflow', '');
      }
    },
    closeNavbar() {
      const vm = this;
      vm.isShow = false;
      $('body').css('overflow', '');
    },
    getShoppingCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const loader = vm.$loading.show({}, {
        default: vm.$createElement('LogoLoadingAnimation'),
      });
      vm.$http.get(api).then((response) => {
        vm.notification.shoppingCart = response.data.data.carts.length;
        vm.$emit('shopping-cart', response.data.data);
        loader.hide();
      });
    },
  },
  watch: {
    favoriteProducts() {
      this.notification.favorite = this.favoriteProducts.length;
    },
  },
  created() {
    const vm = this;
    $(window).resize(() => {
      vm.isShow = false;
      $('body').css('overflow', '');
    });
    vm.notification.favorite = vm.favoriteProducts.length;
    vm.getShoppingCart();
    vm.$bus.$on('shopping-cart:update', () => {
      vm.getShoppingCart();
    });
  },
  destroyed() {
    $(window).off('resize');
  },
};
</script>

<style lang="scss">
.navbar {
  @include media-breakpoint-up(xs) {
    height: 64px;
  }
  @include media-breakpoint-up(md) {
    height: 76px;
  }
  @include media-breakpoint-up(lg) {
    height: 100px;
  }
}

// 覆蓋bootstrap的樣式，讓container的padding不會消失
.navbar-expand-lg > .container {
  padding: 0 15px 0 15px;
}

.navbar-primary.show {
  left: 0;
}
.navbar-brand {
  @include media-breakpoint-up(xs) {
    margin-right: 0px;
  }
  @include media-breakpoint-up(lg) {
    margin-right: 23px;
  }
}
.navbar-brand-img {
  @include media-breakpoint-up(xs) {
    height: 40px;
  }
  @include media-breakpoint-up(md) {
    height: 44px;
  }
}
.navbar-toggler {
  @include media-breakpoint-up(xs) {
    &:hover {
      color: $navbar-toggler-hover-color;
    }
    transition: $transition-base;
  }
  color: $gray-600;
  margin-left: -10px;
}
.navbar-primary {
  @include media-breakpoint-up(xs) {
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
    width: 249px;
  }
  @include media-breakpoint-up(lg) {
    box-shadow: none;
    flex-direction: row;
    height: auto;
    justify-content: space-between;
    flex-basis: 100%;
    position: static;
  }
  align-items: center;
  background-color: #fff;
  display: flex;
  transition: $transition-collapse;
  z-index: $zindex-navbar;
}
.navbar-nav {
  @include media-breakpoint-up(xs) {
    order: 1;
    width: 100%;
  }
  @include media-breakpoint-up(lg) {
    order: 0;
  }
}
.nav-link {
  @include media-breakpoint-up(xs) {
    &:hover {
      background-color: $nav-hover-xs-bg;
      color: $nav-hover-xs-color;
    }
    font-weight: bold;
    height: 44px;
    line-height: 44px;
    padding: 0;
  }
  @include media-breakpoint-up(lg) {
    &:hover {
      background-color: $nav-hover-lg-bg;
      color: $nav-color;
    }
    &:not(.active):hover {
      color: $nav-hover-lg-color;
    }
    border-bottom: 2px solid #fff;
    font-weight: normal;
    height: auto;
    line-height: 1.5;
    padding: 0;
    padding-bottom: 4px;
  }
  text-align: center;
  transition: $transition-base;
}
.nav-link.active {
  @include media-breakpoint-up(xs) {
    background-color: $nav-active-xs-bg;
    color: $nav-active-xs-color;
  }
  @include media-breakpoint-up(lg) {
    color: $nav-active-lg-color;
    background-color: $nav-active-lg-bg;
    border-color: $primary;
    padding-bottom: 2px;
  }
}
.close-navbar-btn{
  @include media-breakpoint-up(xs) {
    &:hover {
      color: $nav-close-btn-hover-color;
    }
    background-color: #fff;
    border: 0;
    display: block;
    height: 44px;
    margin: 10px 10px 22px 0;
    padding: 0 10px 0 10px;
    transition: $transition-base;
    width: 44px;
  }
  @include media-breakpoint-up(lg) {
    display: none;
  }
  align-self: flex-end;
}
.nav-item {
  @include media-breakpoint-up(xs) {
    padding: 0;
  }
  @include media-breakpoint-up(lg) {
    height: auto;
    margin-left: 0;
    padding-left: 16px;
    padding-right: 16px;
  }
}
.navbar-member {
  align-items: center;
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  padding: 0;
  width: auto;
}
.navbar-member-item {
  @include media-breakpoint-up(xs) {
    margin-left: 0px;
  }
  @include media-breakpoint-up(md) {
    margin-left: 12px;
  }
}
.navbar-member-link {
  &:hover {
    color: $navbar-member-btn-hover;
  }
  border: 0;
  background-color: #fff;
  color: $navbar-member-color;
  display: flex;
  padding: 10px;
  position: relative;
}
.navbar-member-badge {
  height: 17px;
  padding-top: 2px;
  position: absolute;
  right: 0;
  top: 4px;
  width: 17px;
}
</style>
