<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb pt-8 pb-0 f-14 f-md-16">
      <li class="breadcrumb-item">
        <router-link to="/" class="d-flex align-items-center">
          <span class="material-icons f-20 f-md-24">location_on</span>
          首頁
        </router-link>
      </li>
      <li class="breadcrumb-item">
        <router-link to="/products">本店商品</router-link>
      </li>
      <li class="breadcrumb-item">
        <router-link :to="`/products/${product.category}`">{{ product.category }}</router-link>
      </li>
      <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: ['product'],
};
</script>

<style lang="scss">
.breadcrumb {
  @include media-breakpoint-up(xs) {
  }
}
</style>
