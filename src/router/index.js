import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载
const Login = () => import("../views/login/Login.vue")
const Management = () => import("../views/management/Management.vue")
const WriteBlog = () => import("../views/management/write-blog/WriteBlog.vue")
const ArticleManage = () => import("../views/management/article-manage/ArticleManage.vue")
const Detail = () => import("../views/detail/Detail.vue")

Vue.use(VueRouter)

const routes = [
  {
    path: "",
    redirect: "/login"
  },
  {
    path: "/login",
    component: Login,
    meta: { title: "登陆" }
  },
  {
    path: "/Management",
    component: Management,
    redirect: '/WriteBlog',
    meta: { title: "管理" },
    children: [
      {
        path: "/WriteBlog",
        component: WriteBlog,
        meta: { title: "写博客" }
      },
      {
        path: "/ArticleManage",
        component: ArticleManage,
        meta: { title: "文章管理" }
      }
    ],
  },
  {
    path: "/Detail",
    component: Detail,
    meta: { title: "文章详情" }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title || '首页'
  }
  next()
})


export default router