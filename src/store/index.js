import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user_id: ""
  },
  mutations: {
    saveUserId(state, foo) {
      state.user_id = foo
    }
  }
})

export default store