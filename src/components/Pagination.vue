<template>
  <nav aria-label="Page navigation" class="mt-32 mb-60">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled : !pagination.has_pre }">
        <a
          class="page-link previous-link"
          href="#"
          aria-label="Previous"
          @click.prevent="changePage(pagination.current_page - 1)"
        >
          <span class="material-icons">keyboard_arrow_left</span>
        </a>
      </li>
      <li
        class="page-item"
        :class="{ active : pagination.current_page === n }"
        v-for="n in pagination.total_pages"
        :key="n"
      >
        <a class="page-link num-link" href="#" @click.prevent="changePage(n)">{{ n }}</a>
      </li>
      <li class="page-item" :class="{ disabled : !pagination.has_next }">
        <a
          class="page-link next-link"
          href="#"
          aria-label="Next"
          @click.prevent="changePage(pagination.current_page + 1)"
        >
          <span class="material-icons">keyboard_arrow_right</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pagination'],
  methods: {
    changePage(page) {
      this.$emit('change-page', page);
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss">
.pagination {
  .material-icons {
    font-size: 20px;
  }
}
.page-item {
  &.disabled {
    .previous-link, .next-link {
      background-color: $gray-300;
      color: $dark;
    }
  }
}
.previous-link, .next-link {
  padding: 11px;
}
.num-link {
  font-size: 16px;
  font-weight: bold;
  line-height: 1;
  padding: 13px 13px;
}
</style>
