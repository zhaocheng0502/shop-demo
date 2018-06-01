import Vue from 'vue'
import Router from 'vue-router'

// 加载路径中可以使用 @ 绝对路径
// @ 是 src 目录的绝对路径
// @ 后面的 / 别忘了
const Login = () => import('@/components/login/login')
const Home = () => import('@/components/home/home')

const UserList = () => import('@/components/user-list/user-list')

// 权限列表
const Rights = () => import('@/components/rights')

// 角色列表
const Roles = () => import('@/components/roles')

// 商品分类
const Categories = () => import('@/components/categories')

// 商品列表
const Goods = () => import('@/components/goods')

// 添加商品
const GoodsAdd = () => import('@/components/goods-add')

// 订单列表
const Orders = () => import('@/components/orders')

// 百度地图测试组件
const BdMapTest = () => import('@/components/bdmap-test')

// echarts 测试组件
const EchartsDemo = () => import('@/components/echarts-demo')

const VuexDemo = () => import('@/components/vuex-demo')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Home,
      // 当渲染 children 组件的时候会先把 Home 组件渲染出来
      // Home 组件找到根组件中的 router-view 出口替换渲染
      // Home 组件的 children 子路由会渲染到 Home 组件内部的 router-view 出口
      // 参考文档：https://router.vuejs.org/zh-cn/essentials/nested-routes.html
      children: [
        {
          path: '/users',
          component: UserList
        },
        {
          path: '/rights',
          component: Rights
        },
        {
          path: '/roles',
          component: Roles
        },
        {
          path: '/categories',
          component: Categories
        },
        {
          path: '/goods',
          component: Goods
        },
        {
          path: '/goods-add',
          component: GoodsAdd
        },
        {
          path: '/orders',
          component: Orders
        },
        {
          path: '/bdmap-test',
          component: BdMapTest
        },
        {
          path: '/echarts-demo',
          component: EchartsDemo
        },
        {
          path: '/vuex-demo',
          component: VuexDemo
        }
      ]
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
