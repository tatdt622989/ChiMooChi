<template>
  <div class="catalog">
    <Navbar/>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/catalog/Navbar.vue';

export default {
  name: 'Catalog',
  components: {
    Navbar,
  },
  created() {
    // eslint-disable-next-line no-console
    console.log(process.env.VUE_APP_API);
  },
};
</script>
