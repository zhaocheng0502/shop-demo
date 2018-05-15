import Vue from 'vue'
import Router from 'vue-router'

// 加载路径中可以使用 @ 绝对路径
// @ 是 src 目录的绝对路径
// @ 后面的 / 别忘了
import Login from '@/components/login/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    }
  ]
})
