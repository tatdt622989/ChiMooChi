import Vue from 'vue';
import VueRouter from 'vue-router';
import Catalog from '../views/Catalog.vue';
import Home from '../pages/Home.vue';
import Product from '../pages/Product.vue';
import ProductInfo from '../pages/ProductInfo.vue';
import Cart from '../pages/Cart.vue';
import Checkout from '../pages/Checkout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'Catalog',
    component: Catalog,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
      },
      {
        path: 'product',
        name: 'Product',
        component: Product,
      },
      {
        path: 'product-info',
        name: 'ProductInfo',
        component: ProductInfo,
      },
      {
        path: 'cart',
        name: 'Cart',
        component: Cart,
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: Checkout,
      },
    ],
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
