<template>
  <div class="adminNavbar">
    <div class="MenuContainer">
      <router-link
        v-for="(item,index) in navbarTab"
        :to="item.path"
        class="menuRouterLink"
        :key="index"
      >
        <div class="MenuItem">{{item.title}}</div>
      </router-link>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "",
  data() {
    return {
      navbarTab: [
        { title: "写博客", path: "/WriteBlog" },
        { title: "文章管理", path: "/ArticleManage" },
      ],
    };
  },
};
</script>

<style scoped>
.adminNavbar {
  position: fixed;
  top: 10px;
  right: 10px;
  left: 10px;
  height: 65px;
  padding: 0 100px;
  border-radius: 20px;
  font-family: ios7;
  font-size: 14px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.4);
}

.MenuContainer {
  display: flex;
}

.MenuContainer a {
  margin: 0 30px;
}

.menuRouterLink {
  clip-path: polygon(0% 0%, 100% 0, 100% 80%, 50% 100%, 0 80%);
  transition: all 0.3s;
}

.menuRouterLink:not(.router-link-active):hover {
  background-color: #fffafa;
}

.menuRouterLink.router-link-active {
  background: url("~assets/img/bg/adminTabActiveBg.png") 100% 100%
    repeat;
}

.MenuItem {
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 55px;
  cursor: pointer;
}
</style>