import Vue from 'vue'
import Vuex from 'vuex'
import * as User from '@/api/user'
import axios from 'axios'

Vue.use(Vuex)

// new 出 Vuex 容器实例
// 导出

export default new Vuex.Store({
  state: {
    count: 250
  },
  mutations: {
    changeCount (state, data) {
      state.count = data
    }
  },
  actions: {
    async getUsers (context) {
      const res = await axios({
        url: '/users',
        method: 'get',
        params: {
          pagenum: 1,
          pagesize: 5
        }
      })
      context.commit('changeCount', res.data.data.total)
    }
  }
})
