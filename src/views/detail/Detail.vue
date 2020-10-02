<template>
  <transition
    enter-active-class="animate__animated animate__zoomIn animate__faster"
    appear
  >
    <div class="container">
      <div class="toc"></div>
      <div class="content">
        <mavon-editor
          v-html="blogContentHTML"
          codeStyle="tomorrow"
          :boxShadow="false"
          class="articleContent"
        />
      </div>
    </div>
  </transition>
</template>
 
<script>
import { request } from "network/request";

export default {
  name: "",
  data() {
    return {
      blogContentHTML: null,
    };
  },
  beforeCreate() {
    //创建之前完成时关闭导航
    this.$bus.$emit("switchMenu", false);
    //获取数据
    request({
      method: "get",
      url: `/blog/detail?id=${this.$route.query.id}`,
    }).then((res) => {
      this.blogContentHTML = res.data.data.content;
    });
  },
  updated() {
    let ul = document.querySelectorAll("ul")[0];
    let h3 = document.querySelectorAll("h3")[0];
    let mulu = document.querySelector(".toc");
    mulu.appendChild(h3);
    mulu.appendChild(ul);
  },
};
</script>

<style scoped>
@import "~assets/css/mavon-editor-style/mavon-editor.css";

.container {
  height: 100vh;
  overflow-y: scroll;
}

.toc {
  position: fixed;
  width: 400px;
  height: 100vh;
  margin-left: 20px;
  padding: 10px;
  border-right: 1px solid rgb(204, 204, 204);
  overflow: hidden;
  overflow-y: scroll;
}

.content {
  width: 60%;
  margin-left: 550px;
  font-family: 幼圆;
}

.articleContent {
  z-index: 0;
  margin-top: 30px;
  padding: 0 20px 80px;
  font-family: 幼圆;
  font-size: 18px;
}
</style>