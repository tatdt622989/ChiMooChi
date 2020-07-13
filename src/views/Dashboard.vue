<template>
  <div class="container-fluid d-flex p-0">
    <Sidebar />
    <router-view />
  </div>
</template>

<script>
import Sidebar from '@/components/Dashboard/Sidebar.vue';

export default {
  name: 'Dashboard',
  components: {
    Sidebar,
  },
};
</script>

<style lang="scss">
</style>
