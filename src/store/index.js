import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user_id: "",
    articleEdit_data: ""
  },
  mutations: {
    saveUserId(state, foo) {
      state.user_id = foo
    },
    saveArticleEditData(state, foo) {
      state.articleEdit_data = foo
    }
  }
})

export default store