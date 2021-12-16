import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem("user") || null)
  },
  mutations: {
    setUser (state, payload) {
      state.user = JSON.parse(payload)
      // 添加到本地存储中，防止刷新消失
      window.localStorage.setItem("user", payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
