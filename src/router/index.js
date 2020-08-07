import Vue from 'vue';
import VueRouter from 'vue-router';
// Views
import Catalog from '@/views/Catalog.vue';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
// Pages
// Catalog
import Home from '@/pages/Catalog/Home.vue';
import Products from '@/pages/Catalog/Products.vue';
import Promotion from '@/pages/Catalog/Promotion.vue';
import ProductInfo from '@/pages/Catalog/ProductInfo.vue';
import ShoppingCart from '@/pages/Catalog/ShoppingCart.vue';
import Checkout from '@/pages/Catalog/Checkout.vue';
import OrderForm from '@/pages/Catalog/OrderForm.vue';
import Payment from '@/pages/Catalog/Payment.vue';
import PaymentStatus from '@/pages/Catalog/PaymentStatus.vue';
// Dashboard
import DashboardProducts from '@/pages/Dashboard/Products.vue';
import DashboardOrders from '@/pages/Dashboard/Orders.vue';
import DashboardCoupons from '@/pages/Dashboard/Coupons.vue';

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
        path: 'products',
        name: 'Products',
        component: Products,
      },
      {
        path: 'products/:id',
        name: 'ProductsCategory',
        component: Products,
      },
      {
        path: 'product-info/:id',
        name: 'ProductInfo',
        component: ProductInfo,
      },
      {
        path: 'shopping-cart',
        name: 'ShoppingCart',
        component: ShoppingCart,
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
          {
            path: 'payment-status',
            name: 'PaymentStatus',
            component: PaymentStatus,
          },
        ],
      },
      {
        path: 'promotion',
        name: 'Promotion',
        component: Promotion,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    redirect: '/dashboard/products',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'products',
        name: 'DashboardProducts',
        component: DashboardProducts,
        meta: { requiresAuth: true },
      },
      {
        path: 'orders',
        name: 'Orders',
        component: DashboardOrders,
        meta: { requiresAuth: true },
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: DashboardCoupons,
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
