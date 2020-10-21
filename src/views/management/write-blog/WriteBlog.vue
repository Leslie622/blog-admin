<template>
  <div class="writeBlog">
    <transition
      appear
      enter-active-class="animate__animated animate__zoomInDown"
    >
      <mavon-editor
        v-model="blogData.blogContent"
        class="mavonEditor articleContent"
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
          <div class="hintText">标题</div>
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
            标签
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
            分类
          </div>
        </div>
        <div class="blogAbstractContent">
          <textarea
            type="text"
            class="blogAbstractInput"
            v-model="blogData.blogAbstract"
          />
          <div class="hintText">描述</div>
        </div>
        <div class="blogUploadContent">
          <!-- <el-upload
            class="upload-cover"
            drag
            action="https://4xiaer.com:8001/land/file/uploads"
            :on-success="uploadCover"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png/gif/jpeg文件，且不超过10MB
            </div>
          </el-upload> -->
          <input
            type="file"
            accept=".png, .jpg, .gif, .jpeg"
            @change="uploadCover"
          />
          <div class="hintText">封面图片</div>
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
        blogTags: [],
        blogID: "",
        blogCategoryID: "",
        blogAbstract: "",
        blogCover: "",
      },
      category: null,
      tags: [
        { value: "HTML" },
        { value: "CSS" },
        { value: "JavaScript" },
        { value: "Vue" },
        { value: "Webpack" },
      ],
      isTaghintTextAnimation: false,
      isCategoryhintTextAnimation: false,
    };
  },
  created() {
    //请求分类数据并获取待编辑数据
    this.requestCategoryData();
  },
  // 销毁时清空待编辑的数据
  beforeDestroy() {
    this.$store.state.articleEdit_data = null;
  },
  methods: {
    // 发布文章
    issue() {
      request({
        method: "post",
        url: "/blog/create",
        data: {
          user_id: +window.localStorage.getItem("userID"),
          cate_id: this.blogData.blogCategoryID,
          title: this.blogData.blogTitle,
          content: this.blogData.blogContent,
          abs: this.blogData.blogAbstract,
          tag: this.blogData.blogTags,
          cover: this.blogData.blogCover,
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
    // 编辑文章
    modify() {
      request({
        method: "post",
        url: "/blog/update",
        data: {
          id: this.blogData.blogID,
          cate_id: this.blogData.blogCategoryID,
          title: this.blogData.blogTitle,
          content: this.blogData.blogContent,
          abs: this.blogData.blogAbstract,
          tag: this.blogData.blogTags,
          cover: this.blogData.blogCover,
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
    // 请求分类数据并获取待编辑数据
    requestCategoryData() {
      request({
        url: `/blog/category/query?user_id=${+window.localStorage.getItem(
          "userID"
        )}`,
      }).then((res) => {
        this.category = res.data.data;
      });
      if (this.$store.state.articleEdit_data) {
        this.blogData.blogContent = this.$store.state.articleEdit_data.content;
        this.blogData.blogTitle = this.$store.state.articleEdit_data.title;
        this.blogData.blogID = this.$store.state.articleEdit_data.id;
        this.blogData.blogCategoryID = this.$store.state.articleEdit_data.cate_id;
        this.blogData.blogTags = this.$store.state.articleEdit_data.tag;
        this.blogData.blogAbstract = this.$store.state.articleEdit_data.abs;
      }
    },
    // 上传图片-接口
    MultiFileUpload(oData) {
      console.log(oData);
      request({
        method: "post",
        url: "https://4xiaer.com:8001/land/file/uploads",
        data: oData,
      })
        .then((res) => {
          this.blogData.blogCover = res.data.data[0];
        })
        .catch((err) => {
          Message({
            message: "上传失败",
            type: "error",
          });
        });
    },
    // 上传图片
    uploadCover(event) {
      let e = window.event || event;
      const oFile = e.target.files[0];
      const imgMaxSize = 1024 * 1024 * 10;
      const fileType = oFile.name.substr(oFile.name.lastIndexOf(".") + 1);
      if (["jpeg", "jpg", "gif", "png"].indexOf(fileType) < 0) {
        Message({
          message: "只支持.jpeg .jpg  .gif .png格式文件",
          type: "error",
        });
        return;
      }
      if (oFile.size > imgMaxSize) {
        Message({
          message: "文件最大为10MB",
          type: "error",
        });
        return;
      }
      let oData = new FormData();
      oData.append("files[]", oFile);
      //调用上传接口
      this.MultiFileUpload(oData);
    },
  },
};
</script>

<style scoped>
/* 编辑器样式 */
@import "~assets/css/mavon-editor-style/mavon-editor.css";
@import "~assets/css/ele-style/writeBlog-select.css";
@import "~assets/css/ele-style/writeBlog-upload.css";
@import "../../../assets/css/write-blog/write-blog.css";
</style>
