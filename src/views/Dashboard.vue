<template>
  <div class="container-fluid">
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
