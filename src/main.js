// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

import './assets/css/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

// Vue 是构造函数
// 所有组件都是 Vue 的实例
// 任何构造函数都有原型对象
// Vue.prototype 中的任何成员都可以在组件中通过 this.xxx 来访问
// 为了避免和组件本身的数据产生冲突，我们建议给原型增加的成员都叫 $xxx
// 接下来你就可以在任何组件中不需要 import axios 直接 this.$http 来访问 axios 了

// 配置 axios 请求的基准路径
// 所有的 axios 请求都会把这个路径作为基准路径去请求
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

Vue.prototype.$http = axios

// 该规则用以 eslint 代码规范校验的临时规避
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
