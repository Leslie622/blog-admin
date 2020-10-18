<template>
  <div class="articleList">
    <el-table
      :data="articleList"
      style="width: 100%"
      class="CategorTable"
      @row-dblclick="viewDetails"
    >
      <el-table-column label="文章标题" width="570">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.title }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" width="300">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.create_time }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="文章ID" width="300">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.id }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="editArticle(scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="deleteArticle(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="Pagination" v-if="isPagination">
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :total="30"
        class="articlePagination"
        @current-change="currentChange"
        @next-click="currentChange"
        @prev-click="currentChange"
      ></el-pagination>
    </div>
  </div>
</template>
 
<script>
import { openRemovePG_article } from "common/utils";
import { request } from "network/request";

export default {
  name: "",
  data() {
    return {
      articleList: null,
      cate_ID: "",
      isPagination: true,
    };
  },
  created() {
    // 基础渲染
    this.basedRendering();
  },
  mounted() {
    //监听查看分类文章事件
    this.viewTheCategory();
  },
  methods: {
    openRemovePG_article,
    basedRendering() {
      request({
        method: "get",
        url: `/blog/category/query?user_id=${+window.localStorage.getItem("userID")}`,
      }).then((res) => {
        this.cate_ID = res.data.data[0].id;
        //获取第一个分类的数据
        request({
          method: "get",
          url: `/blog/query/withcategory?cate_id=${this.cate_ID}&pageNum=1&pageSize=10`,
        }).then((res) => {
          this.articleList = res.data.data;
        });
      });
    },
    viewTheCategory() {
      this.$bus.$on("viewTheCategory", (cateID) => {
        this.cate_ID = cateID;
        request({
          method: "get",
          url: `/blog/query/withcategory?cate_id=${this.cate_ID}&pageNum=1&pageSize=10`,
        }).then((res) => {
          this.articleList = res.data.data;
          //刷新分页器
          this.isPagination = false;
          this.$nextTick(() => {
            this.isPagination = true;
          });
        });
      });
    },
    //分页器操作
    currentChange(num) {
      request({
        method: "get",
        url: `/blog/query/withcategory?cate_id=${this.cate_ID}&pageNum=${num}&pageSize=10`,
      }).then((res) => {
        this.articleList = res.data.data;
      });
    },
    // 查看详情
    viewDetails(row) {
      let Detail = this.$router.resolve({
        path: "/Detail",
        query: { id: row.id },
      });
      window.open(Detail.href, "_blank");
    },
    //删除文章
    deleteArticle(row) {
      this.openRemovePG_article(row);
    },
    editArticle(data) {
      //跳转编辑页
      this.$store.commit("saveArticleEditData", data);
      this.$bus.$emit("editArticle");
      this.$router.push({
        path: "/WriteBlog",
      });
    },
  },
};
</script>

<style scoped>
@import "~assets/css/ele-style/articles-pagination.css";

.articleList {
  flex: 1;
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.Pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100% - 798px);
}
</style>