import Vue from 'vue'
import Admin from './Admin.vue'
import router from "./router/index"

Vue.config.productionTip = false;

//代码高亮
import 'highlight.js/styles/googlecode.css'

// 引入elementUI
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/* 引入animate.css库 */
import 'animate.css';

//引入markdowm编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

// 事件总线
Vue.prototype.$bus = new Vue()

//图片地址
Vue.prototype.$imgPrefix = 'https://mdw.oss-cn-hangzhou.aliyuncs.com/';

//vuex
import store from "./store/index"

new Vue({
  render: h => h(Admin),
  router,
  store,
}).$mount('#admin')
