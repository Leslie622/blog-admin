<template>
  <div class="ManagementPG">
    <transition
      enter-active-class="animate__animated animate__zoomInDown"
      appear
    >
      <category-management></category-management>
    </transition>
    <transition
      enter-active-class="animate__animated animate__zoomInDown"
      appear
    >
      <article-management></article-management>
    </transition>
  </div>
</template>
 
<script>
import ArticleManagement from "./ingredient/ArticleManagement";
import CategoryManagement from "./ingredient/CategoryManagement";

export default {
  name: "ManagementPG",
  components: {
    ArticleManagement,
    CategoryManagement,
  },
};
</script>

<style scoped>
.ManagementPG {
  position: absolute;
  display: flex;
  top: 85px;
  right: 10px;
  left: 10px;
  bottom: 10px;
}
</style>