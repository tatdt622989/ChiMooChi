<template>
<form>
  <div class="form-group position-relative">
    <label for="search" id="searchLabel">
      <span class="material-icons">search</span>
    </label>
    <input
      class="form-control search"
      type="search"
      placeholder="搜尋"
      id="search"
      ref="search"
      :value="search"
      @input="$emit('update:search', $refs.search.value)"
    >
  </div>
</form>
</template>

<script>
export default {
  name: 'Search',
  props: ['search'],
};
</script>

<style lang="scss">
.search {
  @include media-breakpoint-up(xs) {
      width: 100%;
    }
  @include media-breakpoint-up(lg) {
    width: 180px;
  }
  text-indent: 34px;
}
#searchLabel {
  left: 1px;
  position: absolute;
  top: 1px;
  margin: 10px;
}
</style>
