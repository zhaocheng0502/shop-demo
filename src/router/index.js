import Vue from 'vue'
import Router from 'vue-router'

// 加载路径中可以使用 @ 绝对路径
// @ 是 src 目录的绝对路径
// @ 后面的 / 别忘了
import Login from '@/components/login/login'
import Home from '@/components/home/home'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  const {path} = to
  if (path !== '/login') { // 如果请求的不是 /login 则校验登陆状态
    const token = window.localStorage.getItem('token')
    if (!token) { // 如果没有 token 则让其跳转到 /login
      next('/login')
    } else { // 有 token，让其通过
      next()
    }
  } else {
    // 如果用户请求的就是 /login 则直接调用 next() 放行
    next()
  }
})

export default router
