<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb pt-8 pb-0 f-14 f-md-16">
      <li class="breadcrumb-item">
        <a href="#" class="d-flex align-items-center">
          <span class="material-icons f-20 f-md-24">location_on</span>
          首頁
        </a>
      </li>
      <li class="breadcrumb-item">
        <a href="#">Library</a>
      </li>
      <li class="breadcrumb-item active" aria-current="page">Data</li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'Breadcrumb',
};
</script>

<style lang="scss">
.breadcrumb {
  @include media-breakpoint-up(xs) {
  }
}
</style>
