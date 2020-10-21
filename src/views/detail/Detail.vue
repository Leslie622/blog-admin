<template>
  <transition
    enter-active-class="animate__animated animate__zoomIn animate__faster"
    appear
  >
    <div class="container">
      <div class="toc"></div>
      <div class="content">
        <mavon-editor
          :value="blogContent"
          :toolbarsFlag="false"
          :subfield="false"
          :boxShadow="false"
          :editable="false"
          defaultOpen="preview"
          codeStyle="paraiso-light"
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
      blogContent: "",
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
      this.blogContent = res.data.data.content;
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
  margin-left: 20px;
  padding: 10px;
  width: 400px;
  height: 100vh;
  border-right: 1px solid rgb(204, 204, 204);
  overflow: hidden;
  overflow-y: scroll;
}

.content {
  margin-left: 550px;
  width: 60%;
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