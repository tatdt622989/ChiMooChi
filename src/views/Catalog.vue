<template>
  <div class="catalog">
    <Navbar/>
    <Home/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/catalog/Navbar.vue';
import Home from '@/components/catalog/Home.vue';

export default {
  name: 'Catalog',
  components: {
    Navbar,
    Home,
  },
  created() {
    // eslint-disable-next-line no-console
    console.log(process.env.VUE_APP_API);
  },
};
</script>
