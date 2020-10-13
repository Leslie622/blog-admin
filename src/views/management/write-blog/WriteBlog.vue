<template>
  <div class="writeBlog">
    <transition
      appear
      enter-active-class="animate__animated animate__zoomInDown"
    >
      <mavon-editor
        v-model="blogData.blogContent"
        class="mavonEditor articleContent markdown-body"
        previewBackground="fff"
        codeStyle="atelier-cave-dark"
        ref="md"
      />
    </transition>
    <transition
      appear
      enter-active-class="animate__animated animate__zoomInDown"
    >
      <div class="sidebar">
        <div class="operation">
          <div class="save btn" @click="modify">确认更改</div>
          <div class="issue btn" @click="issue">发布博客</div>
        </div>
        <div class="blogTitleContent">
          <input
            type="text"
            class="blogTitleInput"
            v-model="blogData.blogTitle"
          />
          <div class="hintText">博客标题</div>
        </div>
        <div class="blogTags">
          <el-select
            class="selectTag"
            v-model="blogData.blogTags"
            multiple
            filterable
            allow-create
            placeholder="请选择或输入"
            default-first-option
            @visible-change="isTaghintTextAnimation = !isTaghintTextAnimation"
          >
            <el-option
              v-for="item in tags"
              :key="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
          <div
            class="hintText"
            :class="isTaghintTextAnimation ? 'isTaghintTextAnimation' : ''"
          >
            博客标签
          </div>
        </div>
        <div class="blogCategory">
          <el-select
            placeholder="请选择"
            v-model="blogData.blogCategoryID"
            class="selectTag"
            @visible-change="
              isCategoryhintTextAnimation = !isCategoryhintTextAnimation
            "
          >
            <el-option
              v-for="item in category"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <div
            class="hintText"
            :class="
              isCategoryhintTextAnimation ? 'isCategoryhintTextAnimation' : ''
            "
          >
            博客分类
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
 
<script>
import { formatDateTime, deepClone } from "common/utils";
import { request } from "network/request";
import { Message } from "element-ui";

export default {
  name: "",
  data() {
    return {
      blogData: {
        blogTitle: "",
        blogContent: "",
        blogContentHTML: "",
        blogTags: "",
        blogPutoutDate: "",
        blogID: "",
        blogCategoryID: "",
      },
      category: null,
      tags: [
        {
          value: "HTML",
        },
        {
          value: "CSS",
        },
        {
          value: "JavaScript",
        },
        {
          value: "Vue",
        },
        {
          value: "Webpack",
        },
      ],
      isTaghintTextAnimation: false,
      isCategoryhintTextAnimation: false,
    };
  },
  created() {
    //请求分类数据
    request({
      url: `/blog/category/query?user_id=${this.$store.state.user_id}`,
    }).then((res) => {
      this.category = res.data.data;
    });
    if (this.$store.state.articleEdit_data) {
      this.blogData.blogContent = this.$store.state.articleEdit_data.content;
      this.blogData.blogTitle = this.$store.state.articleEdit_data.title;
      this.blogData.blogID = this.$store.state.articleEdit_data.id;
      this.blogData.blogCategoryID = this.$store.state.articleEdit_data.cate_id;
    }
  },
  beforeDestroy() {
    this.$store.state.articleEdit_data = null;
  },
  methods: {
    issue() {
      //发送文章数据到后端
      request({
        method: "post",
        url: "/blog/create",
        data: {
          user_id: this.$store.state.user_id,
          cate_id: this.blogData.blogCategoryID,
          title: this.blogData.blogTitle,
          content: this.blogData.blogContent,
        },
      }).then((res) => {
        if (res.data.code === 200) {
          Message({
            message: "发布成功",
            type: "success",
          });
        }
      });
    },
    modify() {
      request({
        method: "post",
        url: "/blog/update",
        data: {
          id: this.blogData.blogID,
          cate_id: this.blogData.blogCategoryID,
          title: this.blogData.blogTitle,
          content: this.blogData.blogContent,
        },
      }).then((res) => {
        if (res.data.code === 200) {
          Message({
            message: "更改成功",
            type: "success",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
/* 编辑器样式 */
@import "~assets/css/mavon-editor-style/mavon-editor.css";
@import "~assets/css/ele-style/writeBlog-select.css";

.writeBlog {
  position: absolute;
  display: flex;
  top: 85px;
  right: 10px;
  left: 10px;
  bottom: 10px;
  min-width: 1800px;
}

.mavonEditor {
  flex: 8;
  border-radius: 20px;
  overflow: hidden;
}

.sidebar {
  flex: 2;
  margin-left: 10px;
  border-radius: 20px;
  font-family: 幼圆;
  text-align: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.4);
}

.operation {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 30px 0;
  padding: 0 20px;
}

.operation .btn {
  width: 40%;
  height: 50px;
  border-radius: 10px;
  font-size: 16px;
  line-height: 50px;
  box-shadow: 3px 3px rgb(161, 160, 160);
  cursor: pointer;
}

.operation .btn:active {
  box-shadow: none;
  transform: translate(3px, 3px);
}

.save {
  background-color: rgba(220, 220, 220, 0.712);
}

.issue {
  background-image: url("~assets/img/bg/adminTabActiveBg.png");
  transition: background 0.2s;
}

.issue:hover {
  background: url("~assets/img/bg/adminTabActiveBg.png") 100% 100% repeat;
}

.blogTitleContent,
.blogTags,
.blogCategory {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  flex-direction: column-reverse;
  padding: 10px 0;
}

.hintText {
  display: block;
  padding: 20px 20px;
  font-size: 22px;
  text-align: start;
  transition: all ease-out 0.4s;
}

.blogTitleInput {
  padding: 0 10px;
  width: 85%;
  height: 40px;
  border: none;
  border-radius: 10px;
  outline: none;
}

.blogTitleInput:focus + .hintText {
  transform: translateX(105px);
}

.isTaghintTextAnimation,
.isCategoryhintTextAnimation {
  transform: translateX(105px);
}
</style>
