<template>
  <div class="sidebar">
      <img class="my-32 ml-24" src="@/assets/images/white-logo.svg">
      <ul class="sidebar-list">
        <li class="sidebar-item">
          <router-link to="" class="sidebar-link btn btn-secondary">
            <span class="material-icons mr-8">local_mall</span>
            商品管理</router-link></li>
        <li class="sidebar-item">
          <router-link to="" class="sidebar-link btn btn-secondary">
            <span class="material-icons mr-8">receipt</span>
            訂單管理</router-link></li>
        <li class="sidebar-item">
          <router-link to="" class="sidebar-link btn btn-secondary">
            <img class="sidebar-icon mr-8" src="@/assets/images/coupon.svg">
            優惠券管理</router-link></li>
      </ul>
    <button class="logout-btn align-self-end btn btn-secondary w-100" @click="signout">
      <span class="material-icons mr-8">keyboard_backspace</span>
      登出</button>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  methods: {
    signout() {
      const vm = this;
      vm.$router.push('/');
    },
  },
};
</script>

<style lang="scss">
.sidebar {
  align-content: flex-start;
  background-color: $sidebar-bg-color;
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  height: 100vh;
  justify-content: flex-start;
  position: relative;
  width: 180px;
}
.sidebar-link {
  align-items: center;
  color: $sidebar-link-color;
  display: flex;
  padding-left: 24px;
  padding-right: 0;
  text-align: left;
  width: 100%;
}
.sidebar-list {
  .material-icons {
    color: white;
  }
  list-style: none;
  padding: 0;
  width: 100%;
}
.sidebar-item {
  display: flex;
}
.logout-btn {
  bottom: 0;
  display: flex;
  justify-content: flex-start;
  left: 0;
  padding-left: 24px;
  position: absolute;
}
</style>
