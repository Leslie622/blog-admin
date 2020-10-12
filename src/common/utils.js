import { Notification, Message } from "element-ui";
import { request } from "network/request";

// 时间格式
export function formatDateTime(value) {
  let date = new Date(value);
  let y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? "0" + MM : MM;
  let d = date.getDate();
  d = d < 10 ? "0" + d : d;
  return y + "-" + MM + "-" + d;
}

// 对象深度克隆
export function deepClone(obj) {
  let newObj = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === "object") {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = (obj && typeof obj[key] === 'object') ? deepClone(obj[key]) : obj[key];
      }
    }
  }
  return newObj
}


export function LoginRequest() {
  request({
    method: "post",
    url: "/login",
    data: {
      account: this.account,
      password: this.password,
    },
  }).then((res) => {
    if (res.data.code === 200) {
      //保存用户id到vuex
      this.$store.commit("saveUserId", res.data.data.id);
      this.$router.push({ path: '/Management' });
    } else {
      Notification({
        type: "error",
        title: "输入有误",
        message: "您输入的账号或密码有错误",
        duration: 3000,
      });
    }
  });
}

//文章标签动态背景
export function DynamicBG(blogTag) {
  switch (blogTag) {
    case "HTML":
      return {
        backgroundColor: "rgb(228, 79, 38)",
      };
    case "CSS":
      return {
        backgroundColor: " rgb(21, 114, 182)",
      };
    case "JavaScript":
      return {
        backgroundColor: "rgb(255, 192, 34)",
      };
    case "Vue":
      return {
        backgroundColor: "rgb(65, 184, 131)",
      };
    case "Webpack":
      return {
        backgroundColor: "rgb(85,167,221)",
      };
  }
}

//弹框
export function openRemovePG(index, rows) {
  this.$confirm("此操作将删除该分类, 是否删除?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    beforeClose: (action, instance, done) => {
      if (action === "confirm") {
        //确定后，删除数据
        request({
          method: "post",
          url: "/blog/category/remove",
          data: {
            id: rows[index].id
          }
        }).then((res) => {
          //删除成功后更新数据
          if (res.data.code === 200) {
            request({
              method: "get",
              url: "/blog/category/query",
            }).then((res) => {
              this.tableData = res.data.data;
              Message({
                message: "删除成功",
                type: "success"
              })
            });
          }
        });
        done();
      } else {
        done();
      }
    },
  }).catch(() => {
  });;
}

export function openRemovePG_article(row) {
  this.$confirm("此操作将删除该文章, 是否删除?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    beforeClose: (action, instance, done) => {
      if (action === "confirm") {
        //确定后，删除数据
        request({
          method: "post",
          url: "/blog/delete",
          data: {
            id: row.id,
          },
        }).then(() => {
          console.log(row);
          request({
            method: "get",
            url: `/blog/query/withcategory?cate_id=${row.cate_id}&pageNum=1&pageSize=10`,
          }).then((res) => {
            this.articleList = res.data.data;
            //刷新分页器
            this.isPagination = false;
            this.$nextTick(() => {
              this.isPagination = true;
            });
            Message({
              message: "删除成功",
              type: "success"
            })
          });
        });
        done();
      } else {
        done();
      }
    },
  }).catch(() => {
  });;
}

export function openRedactPG(index, row) {
  const h = this.$createElement;
  this.$msgbox({
    title: "分类编辑",
    message: h("div", null, [
      h("p", { class: "categoryName" }, "请输入分类名称:"),
      h("input", {
        class: "categoryNameInput", attrs: {
          maxlength: 10,
        }, key: '1'
      }),
      h("p", { class: "categoryDescription" }, "请输入分类描述:"),
      h("textarea", { class: "categoryDescriptionInput" }),
    ]),
    showCancelButton: true,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    beforeClose: (action, instance, done) => {
      if (action === "confirm") {
        //确定后，编辑内容
        request({
          method: "post",
          url: "/blog/category/update",
          data: {
            id: row.id,
            user_id: this.$store.state.user_id,
            name: document.querySelector(".categoryNameInput").value,
            description: document.querySelector(".categoryDescriptionInput").value,
          }
        }).then((res) => {
          //添加成功后更新数据
          if (res.data.code === 200) {
            request({
              method: "get",
              url: "/blog/category/query",
            }).then((res) => {
              this.tableData = res.data.data;
              Message({
                message: "编辑成功",
                type: "success"
              })
            });
          }
        });
        done();
      } else {
        done();
      }
    },
  }).catch(() => {
  });
}

export function openAddPG() {
  const h = this.$createElement;
  this.$msgbox({
    title: "增加分类",
    message: h("div", null, [
      h("p", { class: "categoryName" }, "请输入分类名称:"),
      h("input", {
        class: "categoryNameInput", attrs: {
          maxlength: 10,
        }, key: '2'
      }),
      h("p", { class: "categoryDescription" }, "请输入分类描述:"),
      h("textarea", { class: "categoryDescriptionInput" }),
    ]),
    showCancelButton: true,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    beforeClose: (action, instance, done) => {
      //点击确定后添加数据
      if (action === "confirm") {
        request({
          method: "post",
          url: "/blog/category/create",
          data: {
            user_id: this.$store.state.user_id,
            name: document.querySelector(".categoryNameInput").value,
            description: document.querySelector(".categoryDescriptionInput").value,
          },
        }).then((res) => {
          //添加成功后更新数据
          if (res.data.code === 200) {
            request({
              method: "get",
              url: "/blog/category/query",
            }).then((res) => {
              this.tableData = res.data.data;
              Message({
                message: "添加成功",
                type: "success"
              })
            });
          }
        });
        done();
      } else {
        done();
      }
    },
  }).catch(() => {
  });;
}
