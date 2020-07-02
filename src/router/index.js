import Vue from 'vue';
import VueRouter from 'vue-router';
// Views
import Catalog from '@/views/Catalog.vue';
// Pages
import Home from '@/pages/Home.vue';
import Product from '@/pages/Product.vue';
import ProductInfo from '@/pages/ProductInfo.vue';
import Cart from '@/pages/Cart.vue';
import Checkout from '@/pages/Checkout.vue';
// Components
import OrderForm from '@/components/catalog/OrderForm.vue';
import Payment from '@/components/catalog/Payment.vue';

Vue.use(VueRouter);

const routes = [
  {
    // 沒有被定義的path
    path: '*',
    // 導向home頁面，因為如果直接輸入沒有被定義的path會帶出空白頁
    redirect: '/home',
  },
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
        redirect: '/checkout/order-form',
        name: 'Checkout',
        component: Checkout,
        children: [
          {
            path: 'order-form',
            name: 'OrderForm',
            component: OrderForm,
          },
          {
            path: 'payment',
            name: 'Payment',
            component: Payment,
          },
        ],
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
